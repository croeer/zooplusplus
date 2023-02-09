import React, { useEffect, useState } from "react";

type QrCodeProps = {
  iban: string,
  bic: string,
  beneficiary: string,
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
    const imageUrl = `https://localhost:32770/api/Qrcode/draw?iban=${props.iban}&bic=${props.bic}&beneficiary=${props.beneficiary}&amount=${props.amount}&invoiceNumber=${props.invoiceNumber}&customerNumber=${props.customerNumber}&customerName=${props.customerName}`;
    console.log("fetching " + imageUrl);
    fetchImage(imageUrl);
  }, [props.iban,props.customerName,props.customerNumber,props.bic,props.beneficiary]);

  return (
    <>
    <ul>
      <li>IBAN: {props.iban}</li>
      <li>BIC: {props.bic}</li>
      <li>Name: {props.beneficiary}</li>
      <li>Customer Name: {props.customerName}</li>
      <li>Customer Number: {props.customerNumber}</li>
      
    </ul>
      <img src={img} alt="icons" />
    </>
  );
}