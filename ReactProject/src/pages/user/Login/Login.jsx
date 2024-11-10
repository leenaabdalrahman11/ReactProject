import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import axios from "axios";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../../context/DataContext';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import style from './Login.module.css';

export default function Login() {
  const { isLogin, userData, setisLogin, setuserData } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();
  const schema = yup.object({
    email: yup.string()
      .required("Email is required")
      .email("Must be a valid email")
      .min(5, "Email must be at least 5 characters")
      .max(40, "Email must be at most 40 characters"),
    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one letter and one number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: LoginUser,
    validationSchema: schema
  });

  async function LoginUser() {
    setLoading(true); 
    try {
      const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, formik.values);
      if (data.message === 'success') {
        localStorage.setItem("userToken", data.token);
        setisLogin(true);
        const decoded = jwtDecode(data.token);
        setuserData(decoded);
        setSuccessMessage("Login successful!");
        navigate('/home');
      }
    } catch (error) {
      setSuccessMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); 
    }
  }

  return (
    <>
      {loading && <LoadingSpinner />} 
      <div className={style.space}></div>
      <div className={style.backGround}>
        <form className={style.Form} onSubmit={formik.handleSubmit}>
          <h1>Login :</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              id="email"
              onBlur={formik.handleBlur}
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email address</label>
            {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
            {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
          </div>
          <br />
          <button type="submit" className={`btn ${style.btnPrimary}`} disabled={loading}>Login</button>
          <button
            type="button"
            className={`btn ${style.btnSecondary}`}
            onClick={() => navigate('/ForgotPassword')}
          >
            Forgot Password?
          </button>
          {successMessage && (
            <div className={`alert ${successMessage === "Login successful!" ? "alert-success" : "alert-danger"}`} role="alert">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </>
  );
}