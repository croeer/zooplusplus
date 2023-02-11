import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/Header";
import InvoiceList from "../components/InvoiceList";
import TotalSaldo from "../components/TotalSaldo";
import { useKeycloak } from "@react-keycloak/web";
import Welcome from "./Welcome";

export function Dashboard() {
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated;

  return (
    <div>
      {!isAuthenticated && <Welcome />}
      <PrivateRoute>
        <TotalSaldo total={3434343} />
        <InvoiceList />
      </PrivateRoute>
    </div>
  );
}
