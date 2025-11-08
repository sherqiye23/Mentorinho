import { useContext, useEffect, useState } from "react";
import { LoginPageComponent } from "../../../components/User/Login components"
import { userInfoContext } from "../../../context/UserInfoContext";
import { useNavigate } from "react-router";
import { Helmet } from 'react-helmet'
import ForgotPassword from "../../../components/User/Login components/ForgotPassword";
import SendCode from "../../../components/User/Login components/SendCode";
import ConfirmNewPassword from "../../../components/User/Login components/ConfirmNewPassword";

const LoginPage = () => {
  const context = useContext(userInfoContext);
  const navigate = useNavigate();
  const [page, setPage] = useState<string>("login-page")
  const [emailState, setEmailState] = useState<string>("")
  const [codeState, setCodeState] = useState<string>("")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  useEffect(() => {
    if (context?.userInfo) {
      navigate("/");
    }
  }, [context?.userInfo, navigate]);

  return (
    <>
      {page === "login-page" && <LoginPageComponent setPage={setPage} />}
      {page === "forgot-password" && <ForgotPassword setPage={setPage} setEmailState={setEmailState} />}
      {page === "send-code" && <SendCode setPage={setPage} setCodeState={setCodeState} />}
      {page === "confirm-new-password" && <ConfirmNewPassword setPage={setPage} emailState={emailState} codeState={codeState} />}
    </>
  )
}

export default LoginPage