import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Cart.module.css";
import { Link } from 'react-router-dom';
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function Cart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const getCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `https://ecommerce-node4.onrender.com/cart/`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setData(response.data.products);
      setError(null);
    } catch (err) {
      setError("Error fetching cart data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        `https://ecommerce-node4.onrender.com/cart/removeItem`,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      getCart();
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Error removing item from cart");
    }
  };

  const changeQuantity = async (productId, action, currentQuantity) => {
    if (action === "decrase" && currentQuantity <= 1) {
      setError("The quantity cannot be less than 1");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      const url =
        action === "incrase"
          ? "https://ecommerce-node4.onrender.com/cart/incraseQuantity"
          : "https://ecommerce-node4.onrender.com/cart/decraseQuantity";

      const response = await axios.patch(
        url,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      console.log(
        `Successfully ${
          action === "incrase" ? "increased" : "decreased"
        } quantity`,
        response.data
      );
      getCart();
    } catch (err) {
      console.error(
        `Error ${action === "incrase" ? "increasing" : "decreasing"} quantity:`,
        err.response || err
      );
      setError(
        `Error ${action === "incrase" ? "increasing" : "decreasing"} quantity`
      );
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return ( <>
  
  <div className={style.space}></div>
    <div className={style.Cart}>
     
      <h1 className={style.CartTitle}>Leenaty Cart :</h1>
      {data && data.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th className={style.ProductInCartHead}>Image</th>
              <th className={style.ProductInCartHead}>Name</th>
              <th className={style.ProductInCartHead}>Price</th>
              <th className={style.ProductInCartHead}>Quantity</th>
              <th className={style.ProductInCartHead}>Total Price</th>
              <th className={style.ProductInCartHead}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} >
                <td className={style.ProductInCart}>
                  <img
                    src={item.details.mainImage.secure_url}
                    alt={item.details.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td className={style.ProductInCart}>{item.details.name}</td>
                <td className={style.ProductInCart}>${item.details.finalPrice}</td>
                <td className={style.ProductInCart}>
                  <button
                    onClick={() =>
                      changeQuantity(item.details._id, "decrase", item.quantity)
                    }
                    className={`btn btn-secondary btn-sm ${style.QuantityBtn}`}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button
                    onClick={() =>
                      changeQuantity(item.details._id, "incrase", item.quantity)
                    }
                    className={`btn btn-secondary btn-sm ${style.QuantityBtn}`}
                  >
                    +
                  </button>
                </td >
                <td className={style.ProductInCart}>${(item.details.finalPrice * item.quantity).toFixed(2)}</td>
                <td className={style.ProductInCart}>
                  <button
                    onClick={() => removeItem(item.details._id)}
                    className={style.CartBtn}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in cart.</p>
      )}        
        <Link to="/Order" className={`${style.btn} ${style.btnSecondary}`} >Order</Link>

    </div>
  </>
  );
}
