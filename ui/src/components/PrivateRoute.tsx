// @ts-ignore
import { Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

type Props = {
  children?: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated;
  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
