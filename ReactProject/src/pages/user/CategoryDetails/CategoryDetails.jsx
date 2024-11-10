import React from "react"; 
import { useParams, Link } from "react-router-dom";
import usefetchData from "../../../coustomHook/usefetchData";
import style from "./CategoryDetails.module.css"; // Ensure you are using .module.css
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import axios from 'axios'; // Import axios for API calls
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

export default function CategoryDetails() {
  const { Id } = useParams();
  const { data, loading, error } = usefetchData(
    `https://ecommerce-node4.onrender.com/products/category/${Id}`
  );

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return (
      <div className="alert alert-danger">Error fetching products: {error}</div>
    );
  }

  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/cart/`, {
          productId: productId 
      }, {
          headers: {
              Authorization: `Tariq__${token}`
          }
      });
      console.log('Product added to cart:', response.data);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  return (
    <section className="products">
      <div className={style.space}></div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
        coverflowEffect={{
          rotate: 10,
          stretch: 5,
          depth: 200,
          modifier: 2.5,
        }}
        breakpoints={{
          840: {
            slidesPerView: 1, 
          },
          850: {
            slidesPerView: 2, 
          },
        }}
      >
        {data?.products?.map((product) => (
          <SwiperSlide key={product._id} className={style.Slide}>
            <div className={style.EachSlide}>
              <div className={style.SwiperImg}>
                <img
                  src={product.mainImage.secure_url}
                  alt={product.name}
                  className={style.productImg}
                /> 
              </div>
              <div className={style.SwiperTittle}>
                <h2>{product.name}</h2>
                <span>{product.price}</span>
                <div className={style.CategoriesBTns}>
                  <Link
                    className={style.btn}
                    to={`/product/${product._id}`}
                  >
                    Details
                  </Link>
                  <a onClick={() => addToCart(product._id)} className={style.btn}>
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
