import { useContext } from "react"
import { NavLink } from "react-router"
import { userInfoContext } from "../../../context/UserInfoContext"
import { IoIosLogOut } from "react-icons/io";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const UserNavbar = () => {
    const context = useContext(userInfoContext);

    if (!context) {
        throw new Error("userInfoContext must be used inside UserInfoProvider");
    }

    const { userInfo, setUserInfo } = context;
    console.log(userInfo);

    const logOutFunction = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast.error("Token tapılmadı, daxil olunmamısınız.");
                return;
            }

            const response = await axios.post(
                "https://azelebo4-001-site1.ltempurl.com/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 204) {
                toast.success("Successfully Logout ✅");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUserInfo(null)
            }
        } catch (error: unknown) {
            const err = error as AxiosError<{ Message?: string }>;
            console.log(err);

            if (err.response?.data?.Message) {
                toast.error("❌ " + err.response.data.Message);
            } else {
                toast.error("Error: " + err.message);
            }
        }
    };


    return (
        <div className="py-2 bg-[#282828]">
            <div className="customContainer flex w-full justify-between items-center">
                <div className="flex items-center justify-center gap-3 text-gray-200">
                    <NavLink to={'/'}>
                        <div>
                            <img className="w-[50px] rounded-full" src={'./logorinho.jpg'} alt="" />
                        </div>
                    </NavLink>
                    <NavLink to={'/explore'}>
                        <div>Explore</div>
                    </NavLink>
                    <NavLink to={'/quizset'}>
                        <div>Quizs</div>
                    </NavLink>
                </div>
                {
                    userInfo?.userName ? (
                        <div className="flex items-center justify-center gap-2 text-gray-200">
                            <div>{userInfo?.userName}</div>
                            <div onClick={() => logOutFunction()} className="cursor-pointer text-red-600"><IoIosLogOut /></div>
                        </div >
                    ) : (
                        <div className="flex items-center justify-center gap-1 text-gray-200">
                            <NavLink to={'/login'}>
                                <div className="font-semibold">Login</div>
                            </NavLink>
                            <div>or</div>
                            <NavLink to={'/signup'}>
                                <div className="font-semibold">Signup</div>
                            </NavLink>
                        </div >
                    )
                }
            </div >
        </div >
    )
}
