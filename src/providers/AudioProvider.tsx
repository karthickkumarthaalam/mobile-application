import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
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


export interface AudioContextType {
    isReady: boolean;
    isPlaying: boolean;
    isLoading: boolean;
    position: number;
    duration: number;
    nowPlaying: NowPlaying | null;

    play: (media: NowPlaying) => Promise<void>;
    pause: () => Promise<void>;
    stop: () => Promise<void>;
    toggle: (media: NowPlaying) => Promise<void>;
    seek: (seconds: number) => Promise<void>;
}

export const AudioContext = createContext<AudioContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function AudioProvider({ children }: Props) {
    const [player] = useState(() => createAudioPlayer());

    const status = useAudioPlayerStatus(player);

    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

    const isPlaying = status.playing ?? false;

    const isLoading =
        status.isBuffering ||
        false;
    const position = status.currentTime ?? 0;
    const duration = status.duration ?? 0;

    useEffect(() => {
        const configure = async () => {
            try {
                await setAudioModeAsync({
                    playsInSilentMode: true,
                    shouldPlayInBackground: true,
                });
            } catch (e) {
                console.log(e);
            }
        };

        configure();

        return () => {
            player.remove();
        };
    }, [player]);

    const play = useCallback(
        async (media: NowPlaying) => {
            try {

                await player.replace({
                    uri: media.url,
                });

                await player.play();

                await player.setActiveForLockScreen(
                    true,
                    {
                        title: media.title ?? "Thaalam Radio",
                        artist: "Live Radio",
                        artworkUrl: media.artwork,
                    },
                    {
                        showSeekForward: false,
                        showSeekBackward: false,
                    }
                );

                setNowPlaying(media);
            } catch (e) {
                console.log("Play error", e);
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
                        {
                            title: nowPlaying.title,
                            artist: nowPlaying.subtitle,
                            artworkUrl: "https://thaalam.ch/assets/img/logo/thalam-logo.png",
                        },
                        { showSeekForward: false, showSeekBackward: false }
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
            position,
            duration,
            nowPlaying,
            play,
            pause,
            stop,
            toggle,
            seek,
        }),
        [
            isPlaying,
            isLoading,
            position,
            duration,
            nowPlaying,
            play,
            pause,
            stop,
            toggle,
            seek,
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
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
