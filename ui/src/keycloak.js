import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "https://idp.ku0.de/",
 realm: "croeer-test",
 clientId: "zooplusplus",
 onLoad: "check-sso"
});

export default keycloak;