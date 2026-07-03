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

export interface Member {
    memberId: string;
    name: string;

    email: string;
    phone: string;

    gender: string;

    country: string;
    state: string;
    city: string;

    address1: string;
    address2: string;

    emailVerified: boolean;
}

export interface AuthSession {
    token: string | null;
    member: Member | null;
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
        member: Member
    ) => Promise<void>;

    logout: () => Promise<void>;
    updateMember: (member: Member) => Promise<void>;

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
        member: null,
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
            member: Member
        ) => {
            await saveAuthSession(token, member);

            setSession({
                token,
                member,
            });
        },
        []
    );

    const logout = useCallback(async () => {
        await clearAuthSession();

        setSession({
            token: null,
            member: null
        });
    }, []);

    const updateMember = useCallback(
        async (member: Member) => {

            await saveAuthSession(
                session.token!,
                member,
            );

            setSession({
                token: session.token,
                member,
            });

        }, [session.token]);

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
            updateMember,

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
            updateMember,
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