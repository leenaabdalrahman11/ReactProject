import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./ForgotPassword.module.css";

// Enhanced validation schema with email verification
const validationSchema = Yup.object().shape({
  email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email")
      .min(5, "Email must be at least 5 characters")
      .max(40, "Email must be at most 40 characters"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be no more than 20 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  code: Yup.string()
    .length(4, "Code must be exactly 4 characters")
    .matches(/^[A-Za-z0-9]+$/, "Code must be alphanumeric")
    .required("Code is required"),
});

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false); 
  const [email, setEmail] = useState(""); 

  const sendCode = async (email) => {
    try {
      const response = await axios.patch("https://ecommerce-node4.onrender.com/auth/sendcode", {
        email,
      });
      console.log(response.data);
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending code:", error);
      alert("Failed to send code. Please check the email and try again.");
    }
  };

  return (
    <div className={style.ForgotPassword}>
      <div className={style.container}>
        {!emailSent ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: validationSchema.fields.email,
            })}
            onSubmit={(values) => {
              setEmail(values.email);
              sendCode(values.email);
            }}
          >
            {() => (
              <Form className={style.stepContainer}>
                <label>Email:</label>
                <Field type="email" name="email" className={style.inputField} />
                <ErrorMessage name="email" component="div" className="error" />
                <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>Send Code</button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
          initialValues={{ password: "", code: "" }}
          enableReinitialize
          validationSchema={Yup.object({
            password: validationSchema.fields.password,
            code: validationSchema.fields.code,
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await axios.patch("https://ecommerce-node4.onrender.com/auth/forgotPassword", {
                email: email,
                password: values.password,
                code: values.code,
              });
              console.log("Password reset response:", response.data);
              alert("Password reset successful!");
              resetForm(); 
            } catch (error) {
              console.error("Error resetting password:", error);
              alert("Password reset failed. Please check your code and try again.");
            }
          }}
        >
        
            {() => (
              <Form className={style.stepContainer}>
                <label>Enter the new Password:</label>
                <Field type="password" name="password" className={style.inputField} />
                <ErrorMessage name="password" component="div" className="error" />

                <label>Enter the code sent to the email</label>
                <Field type="text" name="code" className={style.inputField} />
                <ErrorMessage name="code" component="div" className="error" />

                <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>Submit</button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
