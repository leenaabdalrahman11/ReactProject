import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Product.module.css";
import { Navigation, Pagination, A11y, EffectCube } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import usefetchData from "../../../coustomHook/usefetchData";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function Product() {
  const { Id } = useParams();
  const { data, loading, error } = usefetchData(`https://ecommerce-node4.onrender.com/products/${Id}`);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  
  const [rating, setRating] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  if (loading) return <LoadingSpinner/>;
  if (error) return <div className="alert alert-danger">Error fetching products: {error}</div>;

  const product = data?.product;
  const productImages = product?.subImages || [];

  const addToCart = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setSuccessMessage("You are not authorized. Please log in.");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }

    try {
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/cart/",
        { productId: Id },
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      setSuccessMessage("Product added to cart successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setSuccessMessage(err.response?.data?.message || "Error adding to cart. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };
  console.log('kkkkkkkkkkk',data);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    if (!token) {
      setResponseMessage("You are not authorized. Please log in.");
      return;
    }

    try {
      await axios.post(
        `https://ecommerce-node4.onrender.com/products/${Id}/review`,
        { comment, rating: Number(rating) },
        {
          headers: { Authorization: `Tariq__${token}` },
        }
      );
      setResponseMessage("Review submitted successfully!");
      setComment("");
      setRating("");
      setShowModal(false); // Close modal after submitting review
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Failed to submit review. Please try again."
      );
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
  <> 
  
    <section className={styles.productDetails}>
       <div className={styles.space}></div> 
      <div className={styles.Product}>
        {product ? (
          <>
            <div className={styles.ProductImg}>
              {productImages.length > 0 ? (
                <Swiper
                  effect="cube"
                  grabCursor={true}
                  loop={true}
                  speed={1000}
                  modules={[EffectCube, Navigation, Pagination, A11y]}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  pagination={{ clickable: true }}
                  className={styles.Swiper}
                >
                  {productImages.map((img) => (
                    <SwiperSlide key={img.public_id} className={styles.Slide}>
                      <img src={img.secure_url} alt={product.name} className={styles.productImg} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className={styles.Description}>
              <h1 className={styles.Name}>{product.name}</h1>
              <p>{product.description}</p>
              <h3>Price: ${product.price}</h3>
            <h3 className={styles.rating}>
                        {data.avgRating ? (
                          <>
                            <span>Average Rating: </span>
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                style={{
                                  color:
                                    index < data.avgRating
                                      ? "#FFD700"
                                      : "#C0C0C0",
                                }}
                              >
                                ★
                              </span>
                            ))}
                            <span> ({data.avgRating.toFixed(1)})</span>
                          </>
                        ) : (
                          <span>No ratings available</span>
                        )}
                      </h3>
              <div className={styles.reviewBTns}>
                <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={openModal}>
                  Add Review
                </button>
                <button onClick={addToCart} className={`${styles.btn} ${styles.btnSecondary}`}>
                  Add to cart
                </button>
              </div>
             
              {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
               {product.reviews && product.reviews.length > 0 && (
                        <div className={styles.reviewsSection}>
                          <h3>Reviews:</h3>
                          <div id={`carousel${product._id}`} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                              {product.reviews.map((review, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                  <div className="card" style={{ width: "18rem", margin: "0 auto" }}>
                                    <div className="card-body">
                                      <h5 className="card-title">{review.createdBy.userName}:</h5>
                                      <p className="card-text">{review.comment}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${product._id}`} data-bs-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#carousel${product._id}`} data-bs-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                      )}
            </div>
 
            {showModal && (
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            aria-labelledby="submitReviewLabel"
            aria-modal="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Submit a Review</h5>
                  <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form
                    className={styles.Modal}
                    onSubmit={(e) => handleSubmit(e, products[0]._id)}
                  >
                    <div className="mb-3">
                      <label htmlFor="comment">Comment:</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="rating">Rating:</label>
                      <input
                        type="number"
                        id="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                    <button type="submit" className={`${styles.btn}`}>Submit Review</button>
                  </form>
                  {responseMessage && <div className="alert alert-success mt-2">{responseMessage}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          </>
        ) : (
          <p>Product details not available.</p>
        )}
    
      </div>
    </section>
  
  </>
 
  );
}
