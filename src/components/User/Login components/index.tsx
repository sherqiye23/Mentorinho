import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import axios, { AxiosError } from "axios";

export const LoginPageComponent = () => {
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        emailOrUserName: Yup.string().required("Username or E-mail is required"),
        password: Yup.string().trim().required("Password is required")
    });

    return (
        <div className="h-[93vh] flex justify-center items-center bg-[#ECEFF1]">
            <div className="w-full max-w-[400px] bg-white px-6 py-6 rounded shadow-lg">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div>
                        <img className="w-[100px] rounded-full" src={'./logorinho.jpg'} alt="" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800">Mentorinho</h1>
                </div>

                <Formik
                    initialValues={{
                        emailOrUserName: "",
                        password: "",
                        rememberMe: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const response = await axios.post('https://azelebo4-001-site1.ltempurl.com/api/auth/login', {
                                emailOrUserName: values.emailOrUserName,
                                password: values.password,
                                rememberMe: values.rememberMe,
                            })
                            if (response.data) {
                                localStorage.setItem("accessToken", response.data.token.accessToken);
                                localStorage.setItem("refreshToken", response.data.token.refreshToken);
                                navigate('/')
                                toast.success(response.data.message);
                            }
                        } catch (error: unknown) {
                            const err = error as AxiosError<{ Message?: string }>;
                            console.log(err);

                            if (err.response?.data?.Message) {
                                toast.error("❌ " + err.response.data.Message);
                            } else {
                                toast.error("Error");
                            }
                        }
                        resetForm();
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Username or E-mail */}
                            <div className="my-2">
                                <Field
                                    type="text"
                                    name="emailOrUserName"
                                    placeholder="Username or E-mail"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="emailOrUserName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Password */}
                            <div className="my-2">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* remember me */}
                            <div className="my-2 gap-1 flex items-center">
                                <Field
                                    type="checkbox"
                                    name="rememberMe"
                                    id="rememberMe"
                                    className="border border-solid border-gray-400 rounded p-2"
                                />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>


                            {/* Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded"
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Footer */}
                <div>
                    <div className="text-center mt-4 text-sm">
                        Don't have an account?{" "}
                        <NavLink to={'/signup'} className="text-blue-500 hover:underline">
                            Signup
                        </NavLink>
                    </div>
                    <div className="text-center mt-1 text-sm">
                        <NavLink to={'/forgotpassword'} className="text-gray-500">
                            Forgot Password?
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
