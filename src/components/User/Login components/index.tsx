import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { NavLink } from "react-router";

export const LoginPageComponent = () => {
    const validationSchema = Yup.object().shape({
        usernameoremail: Yup.string().required("Username or E-mail is required"),
        password: Yup.string().trim().required("Password is required")
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
                        usernameoremail: "",
                        password: "",
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
                            {/* Username or E-mail */}
                            <div className="my-2">
                                <Field
                                    type="text"
                                    name="usernameoremail"
                                    placeholder="Username or E-mail"
                                    className="w-full border border-solid border-gray-400 rounded p-2"
                                />
                                <ErrorMessage
                                    name="usernameoremail"
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
