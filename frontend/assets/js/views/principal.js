import { navigateTo } from "../router.js";


let estado = "Usuarios";
document.addEventListener("click", (e) => {
    if(e.target.id == "btnCrear"){
        if(estado == "Usuarios"){
            document.body.insertAdjacentHTML("beforeend", crearUsuario())
        }if(estado == "Contenido"){
            document.body.insertAdjacentHTML("beforeend", crearContenidoModal())
        }
        
    }
    if(e.target.id == "btnCerrar" ){
        document.getElementById("modalOverlay")?.remove();
    }
    if(e.target.id == "btn_usuario"){
        estado = "Usuarios";
        render();
    }
    if(e.target.id == "btn_contenido"){
        estado = "Contenido";
        render();
    }
});
function render(){
    document.getElementById("app").innerHTML = principalView();
}
export function principalView() {
    return `
        <div>
            ${header(estado)}
            ${sidebar(estado)}
            ${mainContent(estado)}
        </div>
    `;
}
function header(nombre) {
    return `
        <header>
            <div>
                <h1>Mis ${nombre}</h1>
                <p>administri tus ${nombre}</p>
            </div>
            <div>
                <div>
                    <h3>musicas</h3>
                </div>
                <div>
                    <h3>peliculas</h3>
                </div>
            </div>
            <button id="btn_usuario">empleados</button>
            <button id="btn_contenido">contenido</button>
        </header>
    `;
}

function sidebar(nombre) {
    return `
        <aside>
            <button id="btnCrear">Agregar ${nombre}</button>
        </aside>
    `;
}

function mainContent(aux) {
    if(aux == "Usuarios"){
        return usuarios();
    }if(aux == "Contenido"){
        return `
            <main>
                <div>
                    <button id="btnLogout">Videos</button>
                    <button id="btnGoLogin">Musicas</button>
                </div>
                <div>
                    ${tablaContenido()}
                </div>
            </main>
        `;
    }
}

function tablaContenido(){
    return `
        <table border="1">
            <caption>Mis archivos</caption>
            <thead>
                <tr>
                    <th>nombre</th>
                    <th>genero</th>
                    <th>tipo</th>
                    <th>acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>alex</td>
                <td>rock</td>
                <td>audio</td>
                <td><button>editar</button><button>eliminar</button></td>
                </tr>
                <tr>
                <td>bronco</td>
                <td>pop</td>
                <td>audio</td>
                <td><button>editar</button><button>eliminar</button></td>
                </tr>
                <tr>
                <td>martin</td>
                <td>rock</td>
                <td>audio</td>
                <td><button>editar</button><button>eliminar</button></td>
                </tr>
            </tbody>
            </table>
    `;
}
function crearContenidoModal() {
    return `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal">
                <h2>Agregar Contenido</h2>
                <input type="text" placeholder="Nombre"><br><br>
                <input type="text" placeholder="Genero"><br><br>
                <select>
                    <option>Audio</option>
                    <option>Video</option>
                </select><br><br>

                <button id="btnGuardar">Guardar</button>
                <button id="btnCerrar">Cerrar</button>
            </div>
        </div>
    `;
}
export function principalEvents() {
    const btnCrear = document.getElementById("btnCrear");
    
    if (btnCrear) {
        btnCrear.addEventListener("click", () => {
            const modalRoot = document.getElementById("modal-root");
            modalRoot.innerHTML = crearContenidoModal();
            // Evento cerrar
            document.getElementById("btnCerrar")
                .addEventListener("click", () => {
                    modalRoot.innerHTML = "";
                });
            // Cerrar al hacer click fuera
            document.getElementById("modalOverlay")
                .addEventListener("click", (e) => {
                    if (e.target.id === "modalOverlay") {
                        modalRoot.innerHTML = "";
                    }
            });
        });
    }
}
function usuarios(){
    return `
        <div>
        <div>
            <img src="" alt="logo">
        </div>
        <p>
            elvis vedia cruz
        </p>
        <div>
            <button>editar</button>
            <button>eliminar</button>
        </div>
    </div>
    `;
}
function crearUsuario(){
    return `
    <div class="modal-overlay" id="modalOverlay">
            <div class="modal">
                <h2>Agregar Usuario</h2>
                <input type="text" placeholder="Nombre"><br><br>
                <input type="password" placeholder="password"><br><br>

                <button id="btnGuardar">Guardar</button>
                <button id="btnCerrar">Cerrar</button>
            </div>
        </div>
    `;
}