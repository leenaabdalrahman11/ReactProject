import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigation, Pagination, A11y, EffectCube } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import style from "./Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("userToken");
  const limit = 4;

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://ecommerce-node4.onrender.com/products?page=${page}&limit=${limit}`
      );
      setProducts(response.data.products);
    } catch (error) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    if (!token) {
      setSuccessMessage("You are not authorized. Please log in.");
      setTimeout(() => setSuccessMessage(""), 2000);
      return;
    }
    try {
      await axios.post(
        `https://ecommerce-node4.onrender.com/cart/`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setSuccessMessage("Product added to cart successfully!");
    } catch (err) {
      setSuccessMessage(err.response?.data?.message || "Error adding to cart. Please try again.");
    } finally {
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    if (!productId || !token) {
      setResponseMessage("You are not authorized. Please log in.");
      return;
    }
    try {
      await axios.post(
        `https://ecommerce-node4.onrender.com/products/${productId}/review`,
        { comment, rating: Number(rating) },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setResponseMessage("Review submitted successfully!");
      setComment("");
      setRating("");
      fetchProducts();
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Failed to submit review. Please try again.");
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <section className={style.Products}>
      {loading && <LoadingSpinner />} {/* Display loading spinner overlay when loading */}

      <div className={style.productsContainer}>
        {error && <p className="alert alert-danger">{error}</p>}

        {!loading && (
          <div className={style.Prod}>
            <Swiper
              effect="cube"
              grabCursor={true}
              loop={true}
              speed={1000}
              modules={[EffectCube, Navigation, Pagination, A11y]}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 60,
                shadowScale: 0.94,
              }}
              pagination={{ clickable: true }}
              className={`${style.Swiper} ${style.initialRotate}`}
            >
              {products.map((product) => (
                <SwiperSlide key={product._id} className={style.Slide}>
                  <div className={style.productCard}>
                    <div className={style.ProductsImage}>
                      <img src={product.mainImage.secure_url} alt={product.name} />
                    </div>
                    <div className={style.DescriptionProducts}>
                      <h3>{product.name}</h3>
                      <p>{product.description.split(" ").slice(0, 50).join(" ")}...</p>
                      <p>Price: ${product.price}</p>
                      <p className={style.rating}>
                        {product.avgRating ? (
                          <>
                            <span>Average Rating: </span>
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                style={{
                                  color: index < product.avgRating ? "#FFD700" : "#C0C0C0",
                                }}
                              >
                                ★
                              </span>
                            ))}
                            <span> ({product.avgRating.toFixed(1)})</span>
                          </>
                        ) : (
                          <span>No ratings available</span>
                        )}
                      </p>
                      <div className={style.reviewBTns}>
                        <button
                          type="button"
                          className={`${style.btn} ${style.btnPrimary}`}
                          onClick={openModal}
                        >
                          Add Review
                        </button>
                        <button
                          onClick={() => addToCart(product._id)}
                          className={`${style.btn} ${style.btnSecondary}`}
                        >
                          Add to cart
                        </button>
                        <Link className={style.btn} to={`/product/${product._id}`}>
                          Details
                        </Link>
                      </div>
                      {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={style.paginationButtons}>
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <button onClick={handleNextPage} className="btn btn-primary">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modal for submitting reviews */}
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
                    className={style.Modal}
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
                    <button type="submit" className={`${style.btn}`}>Submit Review</button>
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
      </div>
    </section>
  );
}
