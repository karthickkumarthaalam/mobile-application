import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    createAudioPlayer,
    setAudioModeAsync,
    useAudioPlayerStatus,
} from "expo-audio";


interface NowPlaying {
    id: number;
    url: string;

    title: string;
    subtitle?: string;
    artwork?: string;

    type: "radio" | "podcast";

    isLive?: boolean;
}

const DEFAULT_ARTWORK = "https://thaalam.ch/assets/img/logo/thalam-logo.png";

const getLockScreenMetadata = (media: NowPlaying) => ({
    // Supplying all fields prevents the OS from falling back to incomplete stream
    // metadata (which is commonly shown as "Unknown").
    title: media.title.trim() || "Thaalam",
    artist: media.subtitle?.trim() || (media.type === "radio" ? "Thaalam Live Radio" : "Thaalam Podcasts"),
    albumTitle: media.type === "radio" ? "Live Radio" : "Podcast",
    artworkUrl: media.artwork?.trim() || DEFAULT_ARTWORK,
});


export interface AudioContextType {
    isReady: boolean;
    isPlaying: boolean;
    isLoading: boolean;
    didJustFinish: boolean;
    position: number;
    duration: number;
    nowPlaying: NowPlaying | null;

    play: (media: NowPlaying) => Promise<void>;
    pause: () => Promise<void>;
    stop: () => Promise<void>;
    toggle: (media: NowPlaying) => Promise<void>;
    seek: (seconds: number) => Promise<void>;
    registerFinishListener: (cb: () => void) => () => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function AudioProvider({ children }: Props) {
    const [player] = useState(() => createAudioPlayer());

    const status = useAudioPlayerStatus(player);

    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
    const finishListenersRef = useRef<Set<() => void>>(new Set());
    const finishingRef = useRef(false);

    const isPlaying = status.playing ?? false;
    const isLoading = status.isBuffering ?? false;
    const didJustFinish = status.didJustFinish ?? false;
    const position = status.currentTime ?? 0;
    const duration = status.duration ?? 0;

    useEffect(() => {
        const configure = async () => {
            try {
                await setAudioModeAsync({
                    playsInSilentMode: true,
                    shouldPlayInBackground: true,
                    // Required by expo-audio for lock-screen controls on Android.
                    interruptionMode: "doNotMix",
                });
            } catch (e) {
                console.log(e);
            }
        };
        configure();

        const sub = player.addListener('playbackStatusUpdate', (s) => {
            if (s.didJustFinish && !finishingRef.current) {
                finishingRef.current = true;
                finishListenersRef.current.forEach(cb => cb());
            }
        });

        return () => {
            sub.remove();
            player.remove();
        };
    }, [player]);

    const registerFinishListener = useCallback((cb: () => void) => {
        finishListenersRef.current.add(cb);
        return () => { finishListenersRef.current.delete(cb); };
    }, []);

    const play = useCallback(
        async (media: NowPlaying) => {
            try {
                const metadata = {
                    title: media.title?.trim() || "Thaalam Podcast",
                    artist: media.subtitle?.trim() || "Thaalam",
                    albumTitle: "Thaalam Podcasts",
                    artworkUrl:
                        media.artwork?.trim() ||
                        DEFAULT_ARTWORK,
                };

                console.log("PODCAST METADATA:", metadata);

                // 1. Load the podcast
                player.replace({
                    uri: media.url,
                });

                // 2. Make this player the lock-screen/media player
                player.setActiveForLockScreen(
                    true,
                    metadata,
                    {
                        showSeekForward: true,
                        showSeekBackward: true,
                    }
                );

                // 3. Explicitly update metadata
                player.updateLockScreenMetadata(metadata);

                finishingRef.current = false;

                // 4. Start playback
                player.play();

                setNowPlaying(media);
            } catch (e) {
                console.log("Play error:", e);
            }
        },
        [player]
    );

    const pause = useCallback(async () => {
        try {
            await player.pause();
        } catch (e) {
            console.log(e);
        }
    }, [player]);

    const stop = useCallback(async () => {
        try {
            await player.pause();
            player.clearLockScreenControls();
            setNowPlaying(null);
        } catch (e) {
            console.log(e);
        }
    }, [player]);

    const toggle = useCallback(
        async (media: NowPlaying) => {
            if (nowPlaying?.url === media.url) {
                if (isPlaying) {
                    await pause();
                } else {
                    player.setActiveForLockScreen(
                        true,
                        getLockScreenMetadata(nowPlaying),
                        { showSeekForward: nowPlaying.type === "podcast", showSeekBackward: nowPlaying.type === "podcast" }
                    );
                    player.play();
                }
                return;
            }

            await play(media);
        },
        [isPlaying, nowPlaying, pause, play, player]
    );

    const seek = useCallback(async (seconds: number) => {
        try {
            await player.seekTo(seconds);
        } catch (e) {
            console.log(e);
        }
    }, [player]);

    const value = useMemo(
        () => ({
            isReady: true,
            isPlaying,
            isLoading,
            didJustFinish,
            position,
            duration,
            nowPlaying,
            play,
            pause,
            stop,
            toggle,
            seek,
            registerFinishListener,
        }),
        [
            isPlaying,
            isLoading,
            didJustFinish,
            position,
            duration,
            nowPlaying,
            play,
            pause,
            stop,
            toggle,
            seek,
            registerFinishListener,
        ]
    );

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
}

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useAudio must be used within an AudioProvider');
    return context;
};

export const useAudioFinish = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useAudioFinish must be used within an AudioProvider');
    return context.didJustFinish;
};

export const useOnAudioFinish = (cb: () => void) => {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useOnAudioFinish must be used within an AudioProvider');
    const cbRef = useRef(cb);
    cbRef.current = cb;
    useEffect(() => {
        return context.registerFinishListener(() => cbRef.current());
    }, [context.registerFinishListener]);
};
