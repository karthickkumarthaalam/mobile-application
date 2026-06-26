import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    createAudioPlayer,
    setAudioModeAsync,
    useAudioPlayerStatus,
} from "expo-audio";

import { NowPlaying } from "./audio.types";

export interface AudioContextType {
    isReady: boolean;
    isPlaying: boolean;
    isLoading: boolean;
    nowPlaying: NowPlaying | null;

    play: (media: NowPlaying) => Promise<void>;
    pause: () => Promise<void>;
    stop: () => Promise<void>;
    toggle: (media: NowPlaying) => Promise<void>;
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
                    title: media.title,
                    artist: media.subtitle,
                    albumTitle: "Thaalam Radio",
                    artworkUrl: media.artwork,
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
                            artworkUrl: nowPlaying.artwork,
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

    const value = useMemo(
        () => ({
            isReady: true,
            isPlaying,
            isLoading,
            nowPlaying,
            play,
            pause,
            stop,
            toggle,
        }),
        [
            isPlaying,
            isLoading,
            nowPlaying,
            play,
            pause,
            stop,
            toggle,
        ]
    );

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
}