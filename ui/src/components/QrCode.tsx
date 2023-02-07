import React, { useEffect, useState } from "react";

export default function QrCode(iban: string) { //, bic: string, name: string, amount: number, invoiceNumber: string, customerNumber: string, customerName: string) {
  const [img, setImg] = useState<any | null>();

  const imageUrl = `https://localhost:32768/api/Qrcode/draw?iban=${iban}` // &bic=${bic}&name=${name}&amount=${amount}&invoiceNumber=${invoiceNumber}&customerNumber=${customerNumber}&customerName=${customerName}`;


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