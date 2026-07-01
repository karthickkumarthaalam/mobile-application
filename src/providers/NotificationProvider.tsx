import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
    duration?: number;
}


export interface NotificationContextType {
    showSuccess: (
        title: string,
        message?: string,
        duration?: number
    ) => void;

    showError: (
        title: string,
        message?: string,
        duration?: number
    ) => void;

    showWarning: (
        title: string,
        message?: string,
        duration?: number
    ) => void;

    showInfo: (
        title: string,
        message?: string,
        duration?: number
    ) => void;

    hideNotification: () => void;

    notification: Notification | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const timeoutRef = useRef<any>(null);

    const hideNotification = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setNotification(null);

    }, []);

    const showNotification = useCallback(
        (
            type: NotificationType,
            title: string,
            message?: string,
            duration = 3000
        ) => {

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            setNotification({
                id: Date.now().toString(),
                type,
                title,
                message,
                duration,
            });

            timeoutRef.current = setTimeout(() => {
                setNotification(null);
            }, duration);

        }, []);

    const showSuccess = useCallback(
        (
            title: string,
            message?: string,
            duration?: number
        ) => {
            showNotification(
                "success",
                title,
                message,
                duration
            );
        },
        [showNotification]
    );


    const showError = useCallback(
        (
            title: string,
            message?: string,
            duration?: number
        ) => {
            showNotification(
                "error",
                title,
                message,
                duration
            );
        },
        [showNotification]
    );

    const showWarning = useCallback(
        (
            title: string,
            message?: string,
            duration?: number
        ) => {
            showNotification(
                "warning",
                title,
                message,
                duration
            );
        },
        [showNotification]
    );

    const showInfo = useCallback(
        (
            title: string,
            message?: string,
            duration?: number
        ) => {
            showNotification(
                "info",
                title,
                message,
                duration
            );
        },
        [showNotification]
    );


    const value = useMemo(
        () => ({
            notification,
            showSuccess,
            showError,
            showWarning,
            showInfo,
            hideNotification,
        }),
        [
            notification,
            showSuccess,
            showError,
            showWarning,
            showInfo,
            hideNotification,
        ]
    );

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );

};

export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification must be used within NotificationProvider"
        );
    }

    return context;
};