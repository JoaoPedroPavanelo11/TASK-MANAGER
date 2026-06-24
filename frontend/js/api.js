const API_URL = "http://localhost:3000";

async function loginUsuario(email, password) {
    const resposta = await fetch(`${API_URL}/usuario/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    return resposta.json();
}

async function criarUsuario(name, email, password) {
    const resposta = await fetch(`${API_URL}/usuario/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password})
    });
    return resposta.json();
}
