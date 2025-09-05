import { Helmet } from "react-helmet"
import { SignupPageComponent } from "../../../components/User/Signup components"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { userInfoContext } from "../../../context/UserInfoContext";

const SignupPage = () => {
    const context = useContext(userInfoContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context?.userInfo) {
            navigate("/");
        }
    }, [context?.userInfo, navigate]);

    return (
        <>
            <Helmet>
                <title>Signup - Mentorinho</title>
            </Helmet>
            <SignupPageComponent />
        </>
    )
}

export default SignupPage