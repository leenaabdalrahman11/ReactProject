import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import style from "./Order.module.css";

export default function Order() {
  const [couponName, setCouponName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const handleCreateOrder = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true); // Start loading spinner

    const token = localStorage.getItem("userToken");

    const orderData = {
      address,
      phone,
      ...(couponName && { couponName }), // Include couponName only if it’s filled
    };

    try {
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/order",
        orderData,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setSuccessMessage("Order created successfully!");
    } catch (err) {
      setError("Failed to create order. Please try again.");
      console.error("Error creating order:", err);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className={style.orderContainer}>
      {isLoading && <LoadingSpinner />} {/* Display loading spinner overlay */}

      <div className={style.Form}>
        <h2>Create Order :</h2>
        <div className={style.formGroup}>
          <label>Coupon Name</label>
          <input
            type="text"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className={style.formGroup}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>

        <div className={style.formGroup}>
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
          />
        </div>

        <button
          onClick={handleCreateOrder}
          className={`btn ${style.btnPrimary}`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Creating Order...' : 'Create Order'}
        </button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    </div>
  );
}
