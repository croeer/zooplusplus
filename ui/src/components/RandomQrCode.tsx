import React, { useEffect, useState } from "react";
const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/api/Qrcode/random`;

export default function RandomQrCode() {
  const [img, setImg] = useState<any | null>();

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <img src={img} alt="icons" />
    </>
  );
}
