import { registerRoute, navigateTo } from "./router.js";
import { loginView, loginEvents } from "./views/loginView.js";
import { principalView, principalEvents} from "./views/principal.js";

import { video, musica } from "./views/reproductor.js";

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
registerRoute("peliculas", () => {
    const html = video();
    return html;
})
registerRoute("musicas", () => {
    const html = musica();
    return html;
})
/*
registerRoute("dashboard", () => {
    const html = dashboardView();
    setTimeout(dashboardEvents, 0);
    return html;
});

registerRoute("crearCliente", crearClienteView);

*/
// Inicial
navigateTo("peliculas");
navigateTo("musicas");
navigateTo("dashboard");
navigateTo("login");