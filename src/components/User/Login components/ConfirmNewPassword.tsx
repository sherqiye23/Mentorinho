import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

type MyComponentsType = {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    emailState: string;
    codeState: string;
}

export default function ConfirmNewPassword({ setPage, emailState, codeState }: MyComponentsType) {
    const validationSchema = yup.object().shape({
        newPassword: yup.string().trim().required("Password is required"),
        confirmPassword: yup.string().trim().required("Password is required")
    });

    return (
        <>
            <Helmet>
                <title>New Password - Mentorinho</title>
            </Helmet>
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
                            newPassword: "",
                            confirmPassword: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            // try {
                            //     const response = await resetPassword({ email: emailState, code: codeState, newPassword: values.password, confirmPassword: values.confirmPassword });
                            //     console.log(values);
                            //     console.log(response);
                            //     if (response.data) {
                            //         toast.success(response.data.message);
                            //         setPage('login-page')
                            //     } else {
                            //         if (response.error) {
                            //             toast.error(response.error.data.Message);
                            //             return;
                            //         }
                            //     }
                            // } catch (error) {
                            //     console.error('Serverə qoşulmada xəta:', error);
                            // }
                            setPage('login-page')
                            console.log(values)
                            resetForm();
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* Password */}
                                <div className="my-2">
                                    <Field
                                        type="text"
                                        name="newPassword"
                                        placeholder="New Password"
                                        className="w-full border border-solid border-gray-400 rounded p-2"
                                    />
                                    <ErrorMessage
                                        name="newPassword"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="my-2">
                                    <Field
                                        type="text"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="w-full border border-solid border-gray-400 rounded p-2"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
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
                                    Send
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}