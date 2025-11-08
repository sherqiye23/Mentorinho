import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

type MyComponentsType = {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setEmailState: React.Dispatch<React.SetStateAction<string>>;
}

export default function ForgotPassword({ setPage, setEmailState }: MyComponentsType) {
    const validationSchema = yup.object().shape({
        email: yup.string().email().required('E-mail is required'),
    });

    return (
        <>
            <Helmet>
                <title>Forgot Password - Mentorinho</title>
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
                            email: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            // try {
                            //     const response = await sendForgetPasswordEmail(values?.email.trim());
                            //     console.log(response);
                            //     if (response.data) {
                            //         toast.success(response.data.message);
                            //         setEmailState(values?.email.trim())
                            //         setPage('send-code')
                            //     } else {
                            //         if (response.error.status == 404) {
                            //             toast.error(response.error.data.Message);
                            //             return;
                            //         } else (
                            //             toast.error('Error')
                            //         )
                            //     }
                            // } catch (error) {
                            //     console.error('Serverə qoşulmada xəta:', error);
                            // }
                            setPage('send-code')
                            console.log(values)
                            resetForm();
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* E-mail */}
                                <div className="my-2">
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="E-mail"
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