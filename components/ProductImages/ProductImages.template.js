import React from "react";
import ImageGallery from "react-image-gallery";
const ProductImagesTemplate = ({ product }) => {
  const images = [];
  product.photos.map((item) => {
    images.push({
      original: item.src,
      thumbnail: item.src,
      originalClass: "w-full",
    });
  });
  return (
    <div
      className={` bg-white  m-1 rounded lg:w-2/5 p-10  text-center  flex justify-center overflow-scrolld  mt-3 `}
    >
      <ImageGallery
        items={images}
        fullscreen={false}
        infinite={false}
        showFullscreenButton={false}
        showPlayButton={false}
        disableThumbnailScroll={true}
        showThumbnails={false}
        sizes={2}
      />
    </div>
  );
};

export default ProductImagesTemplate;
