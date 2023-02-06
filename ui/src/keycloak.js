import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "https://lemur-2.cloud-iam.com/auth/",
//  url: "http://localhost:8080/auth/",
 realm: "croeer-test",
 clientId: "zooplusplus",
 onLoad: "check-sso"
});

export default keycloak;