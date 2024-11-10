import React, { useEffect, useState } from 'react';
import style from './Profile.module.css';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch('https://ecommerce-node4.onrender.com/order', {
        method: 'GET',
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(data.orders || []); // Ensure orders is an array
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner/>;
  if (error) return <p>Error: {error}</p>;

  return (<>
 
    <div className={style.space}></div>
    <div className={style.profileContainer}>
      <h1 className={style.profileTitle}>Order List</h1>

      {!selectedOrder ? (
        <section className={style.orderList}>
          <h2 className={style.title}>All Orders</h2>
          <div className={style.ordersContainer}>
            {orders.map((order, index) => (
              <div className={style.orderCard} key={order._id}>
                <button
                  className={style.orderButton}
                  onClick={() => setSelectedOrder(order)}
                >
                  Order {index + 1}
                </button>
                <ul className={style.orderDetails}>
                  <li><strong>Status:</strong> {order.status}</li>
                  <li><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</li>
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className={style.orderDetailsContainer}>
          <h3 className={style.orderTitle}>
            Order Details for Order {orders.indexOf(selectedOrder) + 1}
          </h3>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.products.map((product) => (
                <tr key={product.productId._id} className={style.tableRow}>
                  <td>{product.productId.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.productId.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={style.backButton}
            onClick={() => setSelectedOrder(null)} // Return to order list
          >
            Back to All Orders
          </button>
        </section>
      )}
    </div>
   </>);
}
