import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

type MyComponentsType = {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setCodeState: React.Dispatch<React.SetStateAction<string>>;
}

export default function SendCode({ setPage, setCodeState }: MyComponentsType) {
    const validationSchema = yup.object().shape({
        code: yup.string().required('Code is required'),
    });

    return (
        <>
            <Helmet>
                <title>Send Code - Mentorinho</title>
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
                            code: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            // if (isNaN(Number(values.code))) {
                            //     toast.error('Düzgün daxil edin');
                            // } else {
                            //     setCodeState(Number(values.code))
                            //     setPage("new-password")
                            //     setSubmitting(false)
                            // }
                            setPage('confirm-new-password')
                            console.log(values)
                            resetForm();
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* Code */}
                                <div className="my-2">
                                    <Field
                                        type="text"
                                        name="code"
                                        placeholder="Code"
                                        className="w-full border border-solid border-gray-400 rounded p-2"
                                    />
                                    <ErrorMessage
                                        name="code"
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