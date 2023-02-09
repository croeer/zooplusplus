import React, { useEffect, useState } from "react";

type QrCodeProps = {
  iban: string,
  bic: string,
  beneficiary: string,
  amount: number,
  invoiceNumber: string,
  customerNumber: string,
  customerName: string,
  redraw: boolean
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
    if(!props.redraw) {
      return;
    }
    const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/api/Qrcode/draw?iban=${props.iban}&bic=${props.bic}&beneficiary=${props.beneficiary}&amount=${props.amount}&invoiceNumber=${props.invoiceNumber}&customerNumber=${props.customerNumber}&customerName=${props.customerName}`;
    console.log("fetching " + imageUrl);
    fetchImage(imageUrl);
  }, [props.redraw]);

  return (
    <>
      {props.redraw && <img src={img} alt="qrcode" />}
    </>
  );
}