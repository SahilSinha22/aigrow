"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import  { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = "AIzaSyDfce-RAFNX_g_VdXfD-Nod-NMAactLGGQ";
const genAI = new GoogleGenerativeAI(apiKey);

const Page = () => {
  const [apiResponse, setApiResponse] = useState("Your answer is here .give your idea here and build in real life to change you "); 
  const [error, setError] = useState(null); 

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 400,
    responseMimeType: "text/plain",
  };

  const initialValues = {
    title: "",
    description: "",
    category: "",
    language:"",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    language: Yup.string().required("Language is required"),
  });
  async function run(prompt) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
   
      setApiResponse(result.response.text());
      setError(null); 
    } catch (error) {
      console.error("Error sharing prompt:", error);
      setError("Failed to share prompt. Try again later."); 
    }
  }
  const handleSubmit = async (values, { resetForm }) => {
    try {
      /* const prompt = {
        title: values.title,
        description: values.description,
        category: values.category,
      };

      */
      const prompt = `Hey, I want to know about ${values.title}. Please provide a description based on ${values.description} within the field of ${values.category} and present the information in ${values.language}.`;
      console.log(prompt);
      await run(prompt); 
      resetForm();
    
    
    } catch (error) {
      console.error("Error sharing prompt:", error);
      setError("Failed to share prompt. Try again later.");
      setApiResponse(null); 
    }
  };

  return (
    <div className=" text-white bg-gradient-to-b from-black via-blue-800  to-white">
     <h1 className="text-white text-center font-bold px-8 text-3xl md:text-4xl pt-20">
            Hey I am Here for help , easy and fast answering AI in any language 
        </h1>
   
    <div className="max-w-7xl p-10 m-auto   mt-10 flex justify-between flex-col lg:flex-row ">
       
        <div>

       
      <h1 className="text-2xl font-bold mb-5">Share your Question here</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-lg font-medium">
                Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="w-full p-2 text-black border rounded-md"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-lg font-medium"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                id="description"
                rows="4"
                className="w-full p-2 text-black border rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label htmlFor="category" className="block  text-lg font-medium">
                Category
              </label>
              <Field
                as="select"
                name="category"
                id="category"
                className="w-full p-2 border rounded-md text-black"
              >
                <option value="">Select Category</option>
                <option value="tech">Tech</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <div>
              <label htmlFor="language" className="block text-lg font-medium">
                Language
              </label>
              <Field
                as="select"
                name="language"
                id="language"
                className="w-full p-2 border rounded-md text-black"
              >
                <option value="">Select Category</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="urdu">urdu</option>
              </Field>
              <ErrorMessage
                name="language"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sharing..." : "Share Prompt"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
      <div>

     
      {/* Display the response or error */}
      <div className="mt-6 text-white scroll-smooth focus:scroll-auto">
        {apiResponse && (
          <div className="p-4  bg-gradient-to-b from-black to-blue-700 border  max-w-3xl border-rounded-lg  rounded-md">
            <h2 className="text-lg font-semibold">Response:</h2>
            <pre className="whitespace-pre-wrap break-words text-md  ">
              {apiResponse}
            </pre>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
      </div>
    </div>

    </div>
  );
};

export default Page;
