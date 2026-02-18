import { navigateTo } from "../router.js";

export function loginView() {
    return `
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Usuario">
            <input type="password" placeholder="Contraseña">
            <button id="btnLogin">Ingresar</button>
        </div>
    `;
}

// Activar eventos después de renderizar
export function loginEvents() {
    document.getElementById("btnLogin")
        .addEventListener("click", () => {
            navigateTo("dashboard");
        });
}
