import React, { useEffect, useState } from "react";

type QrCodeProps = {
  iban: string,
  bic: string,
  name: string,
  amount: number,
  invoiceNumber: string,
  customerNumber: string,
  customerName: string
}

export default function QrCode(props : QrCodeProps) { //, bic: string, name: string, amount: number, invoiceNumber: string, customerNumber: string, customerName: string) {
  const [img, setImg] = useState<any | null>();

  const fetchImage = async (imageUrl: string) => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    const imageUrl = `https://localhost:32770/api/Qrcode/draw?iban=${props.iban}&bic=${props.bic}&name=${props.name}&amount=${props.amount}&invoiceNumber=${props.invoiceNumber}&customerNumber=${props.customerNumber}&customerName=${props.customerName}`;
    fetchImage(imageUrl);
  }, []);

  return (
    <>
    <ul>
      <li>IBAN: {props.iban}</li>
    </ul>
      <img src={img} alt="icons" />
    </>
  );
}