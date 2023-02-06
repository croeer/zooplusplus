import PrivateRoute from "../components/PrivateRoute";
import Header from '../components/Header';
import InvoiceList from '../components/InvoiceList';
import TotalSaldo from '../components/TotalSaldo';
import Image from '../components/Image';

export function MyAccount() {
    return (
        <div>
            <Header />
            My Account
            <PrivateRoute>
            {/* <Image /> */}
          
            </PrivateRoute>
        </div>
    );
}
