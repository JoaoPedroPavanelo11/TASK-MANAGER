const STATUS_LABELS = {
    PENDENTE: "Pendente",
    EM_ANDAMENTO: "Em andamento",
    CONCLUIDA: "Concluída"
};

const STATUS_BADGE = {
    PENDENTE: "badge-pendente",
    EM_ANDAMENTO: "badge-andamento",
    CONCLUIDA: "badge-concluida"
};

function getStatusLabel(status) {
    return STATUS_LABELS[status] || status;
}

function getStatusBadgeClass(status) {
    return STATUS_BADGE[status] || "badge-pendente";
}

function mostrarMensagem(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = `alert alert-${tipo} show`;
}

function esconderMensagem(elemento) {
    elemento.textContent = "";
    elemento.className = "alert";
}

function escapeHtml(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function criarElemento(tag, className, texto) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (texto !== undefined) el.textContent = texto;
    return el;
}
