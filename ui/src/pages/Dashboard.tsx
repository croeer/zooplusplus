import { useKeycloak } from "@react-keycloak/web";
import PrivateRoute from "../components/PrivateRoute";
import Header from '../components/Header';
import InvoiceList from '../components/InvoiceList';
import TotalSaldo from '../components/TotalSaldo';
import Image from '../components/Image';

export function Dashboard() {
    return (
        <div>
            <Header />
            <PrivateRoute>
            {/* <Image /> */}
            <TotalSaldo total={3434343} />
            <InvoiceList />
            </PrivateRoute>
        </div>
    );
}
