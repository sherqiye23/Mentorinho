import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import axios, { AxiosError } from 'axios'

export const SignupPageComponent = () => {
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
        firstName: Yup.string()
            .min(3, "Firstname must be at least 3 characters")
            .required("Firstname is required"),
        lastName: Yup.string()
            .min(3, "Lastname must be at least 3 characters")
            .required("Lastname is required"),
        password: Yup.string().trim()
            .required("Please enter your password")
            .matches(/^\S*$/, "No spaces are allowed")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
            .min(8, "Password is too short - minimum 8 characters required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
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
                        userName: "",
                        firstName: "",
                        lastName: "",
                        password: "",
                        confirmPassword: "",
                        email: "",
                        loginAfterRegister: false,
                        acceptMail: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const response = await axios.post('https://azelebo4-001-site1.ltempurl.com/api/auth/register', {
                                userName: values.userName,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                password: values.password,
                                confirmPassword: values.confirmPassword,
                                email: values.email,
                                loginAfterRegister: values.loginAfterRegister,
                                acceptMail: values.acceptMail,
                            })
                            if (response.data) {
                                if (values.loginAfterRegister) {
                                    localStorage.setItem("accessToken", response.data.accessToken);
                                    localStorage.setItem("refreshToken", response.data.refreshToken);
                                    navigate('/')
                                } else {
                                    navigate("/login")
                                }
                                toast.success("You have successfully signed up 🎉");
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
                        // console.log(values);
                        resetForm();
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Username */}
                            <div className="my-2">
                                <Field
                                    type="text"
                                    name="userName"
                                    placeholder="Username"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="userName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Firstname */}
                            <div className="my-2">
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="Firstname"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Lastname */}
                            <div className="my-2">
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Lastname"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="lastName"
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

                            {/* Confirm Password */}
                            <div className="my-2">
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Email */}
                            <div className="my-2">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="E-mail address"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="my-2 gap-1 flex items-center">
                                <Field
                                    type="checkbox"
                                    name="loginAfterRegister"
                                    id="loginAfterRegister"
                                    className="border border-solid border-gray-400 rounded p-2"
                                />
                                <label htmlFor="loginAfterRegister">Login after register</label>
                            </div>

                            <div className="my-2 gap-1 flex items-center">
                                <Field
                                    type="checkbox"
                                    name="acceptMail"
                                    id="acceptMail"
                                    className="border border-solid border-gray-400 rounded p-2"
                                />
                                <label htmlFor="acceptMail">Accept Mail</label>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded"
                            >
                                Sign Up
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Footer */}
                <div className="text-center mt-4 text-sm">
                    Have an account?{" "}
                    <NavLink to={'/login'} className="text-blue-500 hover:underline">
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
