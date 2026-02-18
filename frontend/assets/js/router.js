const routes = {}

export function registerRoute(path, component) {
  routes[path] = component
}

export function navigateTo(path) {
    const app = document.getElementById('app');
    if (routes[path]) {
        app.innerHTML = routes[path]();
    } else {
        app.innerHTML = '<h1>404 - Página no encontrada</h1>'
    }
}