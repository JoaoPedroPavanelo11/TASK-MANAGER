function getToken() {
    return localStorage.getItem("token");
}

function requireAuth() {
    if (!getToken()) {
        window.location.href = "./login.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
}

function redirectIfAuthenticated(destino = "./tarefas.html") {
    if (getToken()) {
        window.location.href = destino;
    }
}
