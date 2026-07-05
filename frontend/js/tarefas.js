requireAuth();

const formTarefa = document.getElementById("form-tarefa");
const listaTarefa = document.getElementById("lista-tarefas");
const btnSair = document.getElementById("btn-sair");
const btnCancelar = document.getElementById("btn-cancelar");
const btnSalvar = document.getElementById("btn-salvar");
const formTitulo = document.getElementById("form-titulo");
const taskCount = document.getElementById("task-count");
const inputTarefaId = document.getElementById("tarefa-id");

btnSair.addEventListener("click", logout);

btnCancelar.addEventListener("click", resetarFormulario);

formTarefa.addEventListener("submit", async function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const status = document.getElementById("status").value;
    const id = inputTarefaId.value;

    try {
        if (id) {
            await atualizarTarefa(id, titulo, descricao, status);
        } else {
            await criarTarefa(titulo, descricao, status);
        }

        resetarFormulario();
        carregarTarefas();
    } catch (erro) {
        alert(erro.message || "Erro ao salvar tarefa.");
    }
});

function resetarFormulario() {
    formTarefa.reset();
    inputTarefaId.value = "";
    formTitulo.textContent = "Nova Tarefa";
    btnSalvar.textContent = "Adicionar";
    btnCancelar.style.display = "none";
}

function preencherFormulario(tarefa) {
    inputTarefaId.value = tarefa.id;
    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("descricao").value = tarefa.descricao;
    document.getElementById("status").value = tarefa.status;
    formTitulo.textContent = "Editar Tarefa";
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.style.display = "inline-flex";
    document.getElementById("titulo").focus();
}

async function carregarTarefas() {
    try {
        const dados = await listarTarefas();
        mostrarTarefas(dados.tarefas || []);
    } catch (erro) {
        listaTarefa.innerHTML = "";
        const vazio = criarElemento("div", "empty-state");
        vazio.appendChild(criarElemento("p", null, "Erro ao carregar tarefas. Tente novamente."));
        listaTarefa.appendChild(vazio);
        taskCount.textContent = "";
    }
}

function mostrarTarefas(tarefas) {
    listaTarefa.innerHTML = "";

    if (!tarefas.length) {
        const vazio = criarElemento("div", "empty-state");
        vazio.appendChild(criarElemento("p", null, "Nenhuma tarefa cadastrada. Crie a primeira ao lado."));
        listaTarefa.appendChild(vazio);
        taskCount.textContent = "0 tarefas";
        return;
    }

    taskCount.textContent = `${tarefas.length} tarefa${tarefas.length > 1 ? "s" : ""}`;

    tarefas.forEach(function (tarefa) {
        const card = criarElemento("article", "task-item");

        const header = criarElemento("div", "task-item-header");
        header.appendChild(criarElemento("h3", null, tarefa.titulo));

        const badge = criarElemento("span", `badge ${getStatusBadgeClass(tarefa.status)}`, getStatusLabel(tarefa.status));
        header.appendChild(badge);
        card.appendChild(header);

        card.appendChild(criarElemento("p", "task-item-desc", tarefa.descricao));

        const footer = criarElemento("div", "task-item-footer");
        const actions = criarElemento("div", "task-actions");

        const btnEditar = criarElemento("button", "btn btn-ghost btn-sm", "Editar");
        btnEditar.type = "button";
        btnEditar.addEventListener("click", function () {
            preencherFormulario(tarefa);
        });

        const btnExcluir = criarElemento("button", "btn btn-danger btn-sm", "Excluir");
        btnExcluir.type = "button";
        btnExcluir.addEventListener("click", async function () {
            if (!confirm("Deseja excluir esta tarefa?")) return;

            try {
                await excluirTarefa(tarefa.id);
                if (inputTarefaId.value === tarefa.id) resetarFormulario();
                carregarTarefas();
            } catch (erro) {
                alert(erro.message || "Erro ao excluir tarefa.");
            }
        });

        actions.appendChild(btnEditar);
        actions.appendChild(btnExcluir);
        footer.appendChild(actions);
        card.appendChild(footer);

        listaTarefa.appendChild(card);
    });
}

carregarTarefas();
