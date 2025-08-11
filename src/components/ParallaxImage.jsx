import React from "react";

const ParallaxImage = ({
  src,
  alt = "image",
  className = "",
  speedx,
  speedy,
  speedz,
  rotation,
  distance,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`parallax ${className}`}
      data-speedx={speedx}
      data-speedy={speedy}
      data-speedz={speedz}
      data-rotation={rotation}
      data-distance={distance}
    />
  );
};

export default ParallaxImage;
