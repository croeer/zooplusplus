import PrivateRoute from "../components/PrivateRoute";
import { Box, Button, Stack, TextField } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QrCode from "../components/QrCode";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../App";
import FileUpload from "../components/FileUpload";
import { LoadingButton } from "@mui/lab";

export function Upload() {
  const [iban, setIban] = useState<string>("DE64700400410211441101");
  const [bic, setBic] = useState<string>("COBADEFF700");
  const [customerName, setCustomerName] = useState<string>("Customer Name");
  const [customerNumber, setCustomerNumber] =
    useState<string>("customerNumber");
  const [beneficiary, setBeneficiary] = useState<string>("Zooplus AG");
  const [redrawQr, setRedrawQr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0.0);
  const [invoiceNumber, setInvoiceNumber] = useState<string>("invoiceNumber");

  const { apiConnected, setApiConnected } = useContext(ApiContext);

  function mapApiResponse(obj: any): any {
    console.log(obj);
    setIban(obj.iban);
    setBic(obj.bic);
    setCustomerName(obj.customerName);
    setCustomerNumber(obj.customerNumber);
    setBeneficiary(obj.beneficiaryName);
  }

  // useEffect(() => {
  //   if (!apiConnected) return;
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/api/config`, { method: "GET" })
  //     .then((data) => data.json()) // Parsing the data into a JavaScript object
  //     .then((obj) => mapApiResponse(obj));
  // }, []);

  return (
    <div>
      <h2>QR-Code erzeugen</h2>
      <FileUpload
        amount={amount}
        invoiceNumber={invoiceNumber}
        setAmount={setAmount}
        setInvoiceNumber={setInvoiceNumber}
        customerNumber={customerNumber}
        setCustomerNumber={setCustomerNumber}
        customerName={customerName}
        setCustomerName={setCustomerName}
        loading={loading}
        setLoading={setLoading}
      />
      <Box m={3}>
        <Stack justifyContent="left" spacing={2}>
          <TextField
            id="amount"
            label="Summe"
            variant="outlined"
            disabled={!apiConnected || loading}
            value={amount}
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedrawQr(false);
              setAmount(parseFloat(event.target.value));
            }}
          />{" "}
          <TextField
            id="invoiceNumber"
            label="Rechnungsnummer im Verwendungszweck"
            variant="outlined"
            disabled={!apiConnected || loading}
            value={invoiceNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedrawQr(false);
              setInvoiceNumber(event.target.value);
            }}
          />
          <TextField
            id="customerName"
            label="Name im Verwendungszweck"
            variant="outlined"
            disabled={!apiConnected || loading}
            value={customerName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedrawQr(false);
              setCustomerName(event.target.value);
            }}
          />
          <TextField
            id="customerNumber"
            label="Kundennummer im Verwendungszweck"
            variant="outlined"
            disabled={!apiConnected || loading}
            value={customerNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedrawQr(false);
              setCustomerNumber(event.target.value);
            }}
          />
          <TextField
            id="iban"
            label="Zooplus IBAN"
            variant="outlined"
            disabled={!apiConnected || loading}
            placeholder="DE07 1234 1234 1234 1234 12"
            value={iban}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedrawQr(false);
              setIban(event.target.value);
            }}
          />
          <TextField
            id="bic"
            label="Zooplus BIC"
            variant="outlined"
            disabled={!apiConnected || loading}
            placeholder="COBADEFF700"
            value={bic}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedrawQr(false);
              setBic(event.target.value);
            }}
          />
          <TextField
            id="beneficiary"
            label="Beg&uuml;nstigter"
            variant="outlined"
            disabled={!apiConnected || loading}
            placeholder="Zooplus AG"
            value={beneficiary}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRedrawQr(false);
              setBeneficiary(event.target.value);
            }}
          />
        </Stack>
      </Box>
      <Stack alignItems="center" spacing={2}>
        <LoadingButton
          variant="contained"
          disabled={!apiConnected || loading}
          endIcon={<QrCode2Icon />}
          onClick={() => setRedrawQr(true)}
          loading={loading}
        >
          {" "}
          QR-Code generieren
        </LoadingButton>
        <QrCode
          iban={iban}
          bic={bic}
          beneficiary={beneficiary}
          amount={amount}
          invoiceNumber={invoiceNumber}
          customerName={customerName}
          customerNumber={customerNumber}
          redraw={redrawQr}
          loading={loading}
          setLoading={setLoading}
        />
      </Stack>
    </div>
  );
}
