import PrivateRoute from "../components/PrivateRoute";
import Header from '../components/Header';
import InvoiceList from '../components/InvoiceList';
import TotalSaldo from '../components/TotalSaldo';
import RandomQrCode from '../components/RandomQrCode';

export function Dashboard() {
    return (
        <div>
            <Header />
            <PrivateRoute>
            <RandomQrCode />
            <TotalSaldo total={3434343} />
            <InvoiceList />
            </PrivateRoute>
        </div>
    );
}
