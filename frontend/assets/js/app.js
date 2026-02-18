import { registerRoute, navigateTo } from "./router.js";
import { loginView, loginEvents } from "./views/loginView.js";
import { principalView, principalEvents} from "./views/principal.js";

// Registrar rutas
registerRoute("login", () => {
    const html = loginView();
    setTimeout(loginEvents, 0);
    return html;
});
registerRoute("dashboard", () => {
    const html = principalView();
    //setTimeout(principalEvents, 0);
    return html;
});
/*
registerRoute("dashboard", () => {
    const html = dashboardView();
    setTimeout(dashboardEvents, 0);
    return html;
});

registerRoute("crearCliente", crearClienteView);

*/
// Inicial
navigateTo("dashboard");
