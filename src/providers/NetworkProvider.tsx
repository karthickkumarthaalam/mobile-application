import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

interface NetworkContextType {
    isConnected: boolean | null;
    isOffline: boolean;
    isChecking: boolean;
}

const NetworkContext = createContext<NetworkContextType>({
    isConnected: null,
    isOffline: false,
    isChecking: true,
});

interface Props {
    children: ReactNode;
}

export const NetworkProvider = ({ children }: Props) => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const updateState = (state: NetInfoState) => {
            const connected =
                state.isConnected === true &&
                state.isInternetReachable !== false;

            setIsConnected(connected);
            setIsChecking(false);
        };

        NetInfo.fetch().then(updateState);

        const unsubscribe = NetInfo.addEventListener(updateState);

        return unsubscribe;
    }, []);

    return (
        <NetworkContext.Provider
            value={{
                isConnected,
                isOffline: isConnected === false,
                isChecking,
            }}
        >
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => useContext(NetworkContext);