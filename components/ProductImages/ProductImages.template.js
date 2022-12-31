import Image from "next/image";
import photo from "../../public/images/ camra2.jpeg";
import style from "./ProductImages.module.scss";
// import {imageZoom} from "../../lib/function.utils";
import Zoom from "react-img-zoom";
import ReactImageMagnify from "react-image-magnify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "config/variables.config";

const ProductImagesTemplate = ({ product }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={` bg-white m-1 rounded lg:w-2/5 p-10  w-full text-center `}>
      {/* <Slider
        {...{
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        }} 
      > */}
      <Carousel>
        <div className="w-full">
          <Zoom
            img={`${BASE_URL}${product.photo}`}
            zoomScale={3}
            height={250}
            width={250}
          />
        </div>
        <div>
          <Zoom
            img="http://localhost:3002/asset/images/products/product-1670389930567.jpeg"
            zoomScale={3}
            height={250}
            width={250}
          />
        </div>
      </Carousel>

      {/* <AliceCarousel mouseTracking items={items} /> */}
      {/* <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: "http://localhost:3002/asset/images/products/product-1670389930567.jpeg",
          },
          largeImage: {
            src: "http://localhost:3002/asset/images/products/product-1670389930567.jpeg",
            width: 1200,
            height: 1800,
          },
          enlargedImageContainerStyle: { width: "5px", height: "5px" },
        }}
      /> */}
      {/* <div className="">
        <Carousel>
          <div>

          </div>
          <div>
            <Zoom
              img="http://localhost:3002/asset/images/products/product-1671191082570.jpeg"
              zoomScale={3}
              height={400}
              width={400}
            />
          </div>
          <div>
            <Image src={photo} />
          </div>
          <div>
            <img src="http://localhost:3002/asset/images/products/product-1670389930567.jpeg" />
          </div>
          <div>
            <img src="http://localhost:3002/asset/images/products/product-1670389930567.jpeg" />
          </div>
          <div>
            <img src="http://localhost:3002/asset/images/products/product-1670389930567.jpeg" />
          </div>
        </Carousel>
      </div> */}
      {/* <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: "http://localhost:3002/asset/images/products/product-1670389930567.jpeg",
          },
          largeImage: {
            src: "http://localhost:3002/asset/images/products/product-1670389930567.jpeg",
            width: 500,
            height: 1500,
          },
          enlargedImageContainerStyle: {
            position: "fixed",
            top: "200px",
            right: "30%",
            width: "100%",
            height: "100%",
          },
        }}
      /> */}
    </div>
  );
};

export default ProductImagesTemplate;
