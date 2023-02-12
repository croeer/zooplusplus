import PrivateRoute from "../components/PrivateRoute";
import InvoiceList from "../components/InvoiceList";
import TotalSaldo from "../components/TotalSaldo";
import { useKeycloak } from "@react-keycloak/web";
import Welcome from "./Welcome";
import FileUpload from "../components/FileUpload";

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
