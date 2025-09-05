import { useContext, useEffect } from "react";
import { LoginPageComponent } from "../../../components/User/Login components"
import { userInfoContext } from "../../../context/UserInfoContext";
import { useNavigate } from "react-router";
import { Helmet } from 'react-helmet'

const LoginPage = () => {
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
        <title>Login - Mentorinho</title>
      </Helmet>
      <LoginPageComponent />
    </>
  )
}

export default LoginPage