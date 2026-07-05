const API_URL = "http://localhost:3000";

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
    };
}

async function request(path, options = {}) {
    const resposta = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers
        }
    });

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        throw new Error(dados.message || dados.error || "Erro na requisição");
    }

    return dados;
}

async function loginUsuario(email, password) {
    const resposta = await fetch(`${API_URL}/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return resposta.json();
}

async function criarUsuario(name, email, password) {
    const resposta = await fetch(`${API_URL}/usuario/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    return resposta.json();
}

async function listarTarefas() {
    return request("/usuario/tarefas/todastarefa", { method: "GET" });
}

async function criarTarefa(titulo, descricao, status) {
    return request("/usuario/tarefas/", {
        method: "POST",
        body: JSON.stringify({ titulo, descricao, status })
    });
}

async function atualizarTarefa(id, titulo, descricao, status) {
    return request(`/usuario/tarefas/atualiza/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ titulo, descricao, status })
    });
}

async function excluirTarefa(id) {
    return request(`/usuario/tarefas/${id}`, { method: "DELETE" });
}
