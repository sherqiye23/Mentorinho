import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = "https://azelebo4-001-site1.ltempurl.com/";

export interface UserInfo {
    userName: string;
    userId: string;
    email: string;
    role: string;
    exp: number;
}

export interface UserInfoContextType {
    userInfo: UserInfo | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    logout: () => void;
    isRefreshing: boolean;
}

export const userInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export default function UserInfoProvider({ children }: { children: React.ReactNode }) {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUserInfo(null);
    };

    const updateUserInfo = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken) {
            setUserInfo(null);
            return;
        }

        try {
            const decoded: any = jwtDecode(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);

            // token expired
            if (decoded.exp < currentTime) {
                if (refreshToken && !isRefreshing) {
                    setIsRefreshing(true);
                    try {
                        const encodedRefresh = encodeURIComponent(refreshToken);
                        const response = await axios.post(
                            `${API_URL}api/auth/refreshtoken?refreshToken=${encodedRefresh}`
                        );

                        localStorage.setItem("accessToken", response.data.token.accessToken);
                        localStorage.setItem("refreshToken", response.data.token.refreshToken);

                        setIsRefreshing(false);
                        await updateUserInfo();
                    } catch (error) {
                        console.error("Error refreshing token:", error);
                        logout();
                    } finally {
                        setIsRefreshing(false);
                    }
                } else {
                    logout();
                }
            } else {
                setUserInfo({
                    userName: decoded.unique_name,
                    userId: decoded.sub,
                    email: decoded.email,
                    role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    exp: decoded.exp,
                });
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            logout();
        }
    };

    useEffect(() => {
        updateUserInfo();
    }, []);

    return (
        <userInfoContext.Provider value={{ userInfo, setUserInfo, logout, isRefreshing }}>
            {children}
        </userInfoContext.Provider>
    );
}
