import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    clearAuthSession,
    getAuthSession,
    saveAuthSession,
} from "../utils/storage";

export interface AuthSession {
    token: string | null;
    username: string | null;
    memberId: string | null;
}

export type AuthScreen =
    | "login"
    | "register"
    | "forgot-password"
    | "verify-otp"
    | "reset-password";

interface AuthContextType {
    session: AuthSession;
    isAuthenticated: boolean;
    isLoading: boolean;

    login: (
        token: string,
        username: string,
        memberId: string
    ) => Promise<void>;

    logout: () => Promise<void>;

    isAuthSheetVisible: boolean;
    authScreen: AuthScreen;

    openAuthSheet: (screen: AuthScreen) => void;
    closeAuthSheet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [session, setSession] = useState<AuthSession>({
        token: null,
        username: null,
        memberId: null,
    });

    const [isLoading, setIsLoading] = useState(true);

    const [isAuthSheetVisible, setIsAuthSheetVisible] = useState(false);

    const [authScreen, setAuthScreen] =
        useState<AuthScreen>("login");

    const restoreSession = useCallback(async () => {
        try {
            const auth = await getAuthSession();

            if (auth.token) {
                setSession(auth);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        restoreSession();
    }, [restoreSession]);

    const login = useCallback(
        async (
            token: string,
            username: string,
            memberId: string
        ) => {
            await saveAuthSession(token, username, memberId);

            setSession({
                token,
                username,
                memberId,
            });
        },
        []
    );

    const logout = useCallback(async () => {
        await clearAuthSession();

        setSession({
            token: null,
            username: null,
            memberId: null,
        });
    }, []);

    const openAuthSheet = useCallback((screen: AuthScreen) => {
        setAuthScreen(screen);
        setIsAuthSheetVisible(true);
    }, []);

    const closeAuthSheet = useCallback(() => {
        setIsAuthSheetVisible(false);
    }, []);

    const value = useMemo(
        () => ({
            session,
            isAuthenticated: !!session.token,
            isLoading,

            login,
            logout,

            isAuthSheetVisible,
            authScreen,

            openAuthSheet,
            closeAuthSheet,
        }),
        [
            session,
            isLoading,
            login,
            logout,
            isAuthSheetVisible,
            authScreen,
            openAuthSheet,
            closeAuthSheet,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
};