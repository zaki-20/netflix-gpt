import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation schema
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import {  toast } from 'react-toastify';


export default function Login() {
    const navigate = useNavigate()
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: !isSignInForm && Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          navigate('/browse')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast( `${errorCode} - ${errorMessage}` )
          console.log(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        //   console.log(user)
        navigate('/browse')

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast( `${errorMessage}` )

        });
    }

    // You can handle form submission logic here
    setSubmitting(false);
  };

  return (
    <div className="relative bg-opacity-50 z-10  w-full h-full  bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg)] bg-cover">
      <div className="absolute bg-black bg-opacity-40 w-full h-full -z-10"></div>
      <Header />
      <div className="z-50 bg-black mx-auto sm:w-[400px] bg-opacity-75 text-white mb-20 px-16 py-10 rounded-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-3xl font-bold mb-7">
                {isSignInForm ? "Sign In" : "Sign Up"}
              </h2>
              {!isSignInForm && (
                <div className="mb-7">
                  <Field
                    type="name"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-3 py-3 rounded-md bg-[#333333] outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}
              <div className="mb-7">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email or phone number"
                  className="w-full px-3 py-3 rounded-md bg-[#333333] outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-7">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-3 py-3 rounded-md bg-[#333333] outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex justify-center mb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#e50815] w-full py-3 rounded-md"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isSignInForm
                    ? "Sign In"
                    : "Sign Up"}
                </button>
              </div>
              <div className="mb-10">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="w-4 h-4" />
                    <label className="text-gray-400 font-light text-sm">
                      Remember
                    </label>
                  </div>
                  <div>
                    <p className="font-light text-sm text-gray-400">
                      Need help?
                    </p>
                  </div>
                </div>
              </div>
              {isSignInForm ? (
                <div className="mb-5" onClick={toggleSignInForm}>
                  <span className="font-light text-gray-400">
                    New to Netflix?
                  </span>
                  <Link to="/">
                    <span className="font-light hover:underline">
                      Sign up now.
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="mb-5" onClick={toggleSignInForm}>
                  <span className="font-light text-gray-400">
                    Already registered?
                  </span>
                  <Link to="/">
                    <span className="font-light hover:underline">
                      Sign In Now?
                    </span>
                  </Link>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400">
                  This page is protected by Google reCAPTCHA to <br /> ensure
                  you are not a bot.{" "}
                  <span className="text-blue-600">Learn more.</span>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
}
