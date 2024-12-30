"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// Custom SWR fetcher for the sign-in process
const fetcher = async (email, password) => {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  return data; // Return data if successful
};

const Intro = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null); // To track errors
  const [successMessage, setSuccessMessage] = useState(null); // To track success

  useEffect(() => {
    if (session) {
      router.push("/dashboard"); // Redirect to the dashboard if already signed in
    }
  }, [session, router]);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Call the SWR hook for sign-in
      const { email, password } = values;
      const data = await fetcher(email, password);

      // If successful, display success message and redirect
      if (data.success) {
        setSuccessMessage("Login successful! Redirecting to dashboard...");
        router.push("/dashboard");
      }
    } catch (error) {
      // Handle errors and display error message
      console.error("Error occurred during login:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-b px-6 lg:px-0 from-black via-blue-800 to-white h-screen">
      <h1 className="text-white text-center pt-20 pb-10 text-xl font-semibold">
        Sign-In for using the Ai-based project knowledge
      </h1>

      {/* Success Message Banner */}
      {successMessage && (
        <div className="bg-green-500 text-white text-center py-2 mb-4">
          {successMessage}
        </div>
      )}

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="bg-red-500 text-white text-center py-2 mb-4">
          {errorMessage}
        </div>
      )}

      <div className="max-w-lg m-auto rounded-xl text-white border-2 p-10">
        <h1 className="text-2xl font-bold mb-5">Sign In</h1>

        {/* Formik Sign-In Form */}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full p-2 border rounded-md text-black"
                />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border rounded-md text-black"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-lg font-medium">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 border rounded-md text-black"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-t from-blue-700 to-black text-lg text-white rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Sign In/Out Button */}
        <div className="md:mt-0 mt-10 pt-10 text-center">
          {session ? (
            <div className="flex items-center space-x-4">
              <span>{session.user.email}</span>
              <button
                onClick={() => signOut()}
                className="text-2xl hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("github", { redirect: false })}
              className="text-2xl hover:underline px-4 rounded-lg py-1 border-2 bg-gradient-to-t from-blue-700 to-black text-white"
            >
              Login with GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Intro;
