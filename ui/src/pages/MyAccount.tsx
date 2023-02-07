import PrivateRoute from "../components/PrivateRoute";
import Header from '../components/Header';
import InvoiceList from '../components/InvoiceList';
import TotalSaldo from '../components/TotalSaldo';
import Image from '../components/RandomQrCode';
import { Box, Button, Stack, TextField } from "@mui/material";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QrCode from "../components/QrCode";

export function MyAccount() {
    return (
        <div>
            <Header />
            <h2>Einstellungen</h2>
            <PrivateRoute>
            {/* <Image /> */}
            <Box m={3}>
            <Stack justifyContent="left" spacing={2}>
            <TextField id="outlined-basic" label="Name im Verwendungszweck" variant="outlined" placeholder="Vorname Nachname" />
            <TextField id="outlined-basic" label="Zooplus IBAN" variant="outlined" placeholder="DE07 1234 1234 1234 1234 12"/>
            <TextField id="outlined-basic" label="Zooplus BIC" variant="outlined" placeholder="COBADEFF700"/>
            <TextField id="outlined-basic" label="Begünstigter" variant="outlined" placeholder="Zooplus AG"/>
            </Stack>
            </Box>
            <Stack alignItems="center" spacing={2}>
            <Button variant="contained" endIcon={<QrCode2Icon />} >QR-Code testen</Button>
            <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained">Save</Button>
            <Button variant="outlined">Cancel</Button>
            </Stack>
            </Stack>
            </PrivateRoute>
        </div>
    );
}
