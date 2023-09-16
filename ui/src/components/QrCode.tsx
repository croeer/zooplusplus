import React, { SetStateAction, useEffect, useRef, useState } from "react";

type QrCodeProps = {
  iban: string;
  bic: string;
  beneficiary: string;
  amount: number;
  invoiceNumber: string;
  customerNumber: string;
  customerName: string;
  redraw: boolean;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
};

export default function QrCode(props: QrCodeProps) {
  //, bic: string, name: string, amount: number, invoiceNumber: string, customerNumber: string, customerName: string) {
  const [img, setImg] = useState<any | null>();
  const qrCodeRef = useRef<null | HTMLDivElement>(null);

  const fetchImage = async (imageUrl: string) => {
    props.setLoading(true);
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    props.setLoading(false);
  }, [img]);

  useEffect(() => {
    if (!props.redraw) {
      console.log("Exiting qr code refresh");
      return;
    }
    const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/api/Qrcode/draw?iban=${props.iban}&bic=${props.bic}&beneficiary=${props.beneficiary}&amount=${props.amount}&invoiceNumber=${props.invoiceNumber}&customerNumber=${props.customerNumber}&customerName=${props.customerName}`;
    console.log("fetching " + imageUrl);
    fetchImage(imageUrl);
    qrCodeRef!.current!.scrollIntoView();
  }, [props.redraw]);

  return (
    <>
      {props.redraw && (
        <div>
          <img src={img} alt="qrcode" />
          <div ref={qrCodeRef} />
        </div>
      )}
    </>
  );
}
