import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import style from './Register.module.css';

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email")
    .min(5, "Email must be at least 5 characters")
    .max(40, "Email must be at most 40 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be no more than 20 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('https://ecommerce-node4.onrender.com/auth/signup', values);
        console.log("Registration successful:", data);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  });

  return (
    <>
      <div className={style.space}></div>
      <div className={style.backGround}>
        <form className={style.Form} onSubmit={formik.handleSubmit}>
          <h1>Register :</h1>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              id="name"
              placeholder="Enter your name"
            />
            <label htmlFor="name">Name</label>
            {formik.touched.userName && formik.errors.userName ? (
              <div className="alert alert-danger">{formik.errors.userName}</div>
            ) : null}
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email address</label>
            {formik.touched.email && formik.errors.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
            {formik.touched.password && formik.errors.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          
          <br />
          <button type="submit" className={`btn ${style.btnPrimary}`}>Register</button>
        </form>
      </div>
    </>
  );
}
