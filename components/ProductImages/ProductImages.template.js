import React from "react";
import ImageGallery from "react-image-gallery";
const ProductImagesTemplate = ({ product }) => {
  const images = [];

  product.photos.map((item) => {
    images.push({
      original: item.src,
      thumbnail: item.src,
      originalHeight: "100",
      originalClass: " w-52 h-52 flex  items-center ",
    });
  });
  return (
    <div
      className={` bg-white m-1 rounded lg:w-2/5    text-center   overflow-scrolld  mt-3 `}
    >
      <div className=" flex justify-center  w-full">
        <ImageGallery
          items={images}
          fullscreen={false}
          infinite={false}
          showFullscreenButton={false}
          showPlayButton={false}
          disableThumbnailScroll={true}
          // showThumbnails={false}
          // showBullets={true}
          sizes={2}
          // showIndex={true}
          className="bg-red-100 w-full"
        />
      </div>
    </div>
  );
};

export default ProductImagesTemplate;
