import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/Header";
import InvoiceList from "../components/InvoiceList";
import TotalSaldo from "../components/TotalSaldo";
import Image from "../components/RandomQrCode";
import { Box, Button, Stack, TextField } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import QrCode from "../components/QrCode";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../App";

export function MyAccount() {
  const [iban, setIban] = useState<string>("DE02500105170137075030");
  const [bic, setBic] = useState<string>("INGDDEFF");
  const [customerName, setCustomerName] = useState<string>("Chef Chefson");
  const [customerNumber, setCustomerNumber] = useState<string>("1234");
  const [beneficiary, setBeneficiary] = useState<string>("Zooplus AG");
  const [redrawQr, setRedrawQr] = useState<boolean>(false);

  const { apiConnected, setApiConnected } = useContext(ApiContext);

  function mapApiResponse(obj: any): any {
    console.log(obj);
    setIban(obj.iban);
    setBic(obj.bic);
    setCustomerName(obj.customerName);
    setCustomerNumber(obj.customerNumber);
    setBeneficiary(obj.beneficiaryName);
  }

  useEffect(() => {
    if (!apiConnected) return;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/config`, { method: "GET" })
      .then((data) => data.json()) // Parsing the data into a JavaScript object
      .then((obj) => mapApiResponse(obj));
  }, []);

  return (
    <div>
      <Header />
      <h2>Einstellungen</h2>
      <PrivateRoute>
        {/* <Image /> */}
        <Box m={3}>
          <Stack justifyContent="left" spacing={2}>
            <TextField
              id="customerName"
              label="Name im Verwendungszweck"
              variant="outlined"
              disabled={!apiConnected}
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
              disabled={!apiConnected}
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
              disabled={!apiConnected}
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
              disabled={!apiConnected}
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
              disabled={!apiConnected}
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
          <Button
            variant="contained"
            disabled={!apiConnected}
            endIcon={<QrCode2Icon />}
            onClick={() => setRedrawQr(true)}
          >
            {" "}
            QR-Code testen
          </Button>
          <QrCode
            iban={iban}
            bic={bic}
            beneficiary={beneficiary}
            amount={666.67}
            invoiceNumber="1234"
            customerName={customerName}
            customerNumber={customerNumber}
            redraw={redrawQr}
          />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" disabled={!apiConnected}>
              Save
            </Button>
            <Button variant="outlined" disabled={!apiConnected}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </PrivateRoute>
    </div>
  );
}
