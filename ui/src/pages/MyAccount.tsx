import PrivateRoute from "../components/PrivateRoute";
import Header from '../components/Header';
import InvoiceList from '../components/InvoiceList';
import TotalSaldo from '../components/TotalSaldo';
import Image from '../components/RandomQrCode';
import { Box, Button, Stack, TextField } from "@mui/material";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QrCode from "../components/QrCode";
import { useState } from "react";

export function MyAccount() {
    const [iban, setIban] = useState<string>("DE02500105170137075030");
    const [bic, setBic] = useState<string>("INGDDEFF");
    const [customerName, setCustomerName] = useState<string>("Chef Chefson");
    const [customerNumber, setCustomerNumber] = useState<string>("1234");
    const [beneficiary, setBeneficiary] = useState<string>("Zooplus AG");

    return (
        <div>
            <Header />
            <h2>Einstellungen</h2>
            <PrivateRoute>
            {/* <Image /> */}
            <Box m={3}>
            <Stack justifyContent="left" spacing={2}>
            <TextField id="outlined-basic" label="Name im Verwendungszweck" variant="outlined" value={customerName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(event.target.value); }} />
            <TextField id="outlined-basic" label="Kundennummer im Verwendungszweck" variant="outlined" value={customerNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerNumber(event.target.value); }} />
            <TextField id="outlined-basic" label="Zooplus IBAN" variant="outlined" placeholder="DE07 1234 1234 1234 1234 12" value={iban} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setIban(event.target.value); }}/>
            <TextField id="outlined-basic" label="Zooplus BIC" variant="outlined" placeholder="COBADEFF700" value={bic} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBic(event.target.value); }}/>
            <TextField id="outlined-basic" label="Begünstigter" variant="outlined" placeholder="Zooplus AG" value={beneficiary} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficiary(event.target.value); }}/>
            </Stack>
            </Box>
            <Stack alignItems="center" spacing={2}>
            <Button variant="contained" endIcon={<QrCode2Icon />} >QR-Code testen</Button>
            <QrCode iban={iban} bic={bic} beneficiary={beneficiary} amount={666.67} invoiceNumber="1234" customerName={customerName} customerNumber={customerNumber}/>
            <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained">Save</Button>
            <Button variant="outlined">Cancel</Button>
            </Stack>
            </Stack>
            </PrivateRoute>
        </div>
    );
}
