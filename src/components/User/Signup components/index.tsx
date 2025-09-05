import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { NavLink } from "react-router";


export const SignupPageComponent = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
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
                    <div className="text-3xl font-bold text-[#FF9800]">⌘</div>
                    <h1 className="text-xl font-semibold text-gray-800">Mentorinho</h1>
                </div>

                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        confirmPassword: "",
                        email: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        toast.success("You have successfully signed up 🎉");
                        console.log(values);
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
                                    name="username"
                                    placeholder="Username"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="username"
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
