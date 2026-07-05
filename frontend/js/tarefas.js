const formTarefa = document.getElementById("form-tarefa");
const listaTarefa = document.getElementById("lista-tarefas");
const btnSair = document.getElementById("btn-sair");

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "./login.html";
}

if (btnSair) {
    btnSair.addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "./login.html";
    });
}

async function carregarTarefas() {
    try {
        const resposta = await fetch("http://localhost:3000/usuario/tarefas/todastarefa", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.message || "Erro ao carregar tarefas");
        }

        mostrarTarefas(dados.tarefa);
    } catch (erro) {
        console.error(erro);
        listaTarefa.innerHTML = "<p class='empty-state'>Erro ao carregar tarefas!</p>";
    }
}

function mostrarTarefas(tarefas) {
    if (!tarefas || tarefas.length === 0) {
        listaTarefa.innerHTML = "<p class='empty-state'>Nenhuma tarefa cadastrada!</p>";
        return;
    }

    listaTarefa.innerHTML = "";

    tarefas.forEach((tarefa) => {
        const card = document.createElement("div");
        card.className = "task-item";

        const statusClass = tarefa.status === "concluida"
            ? "badge-concluida"
            : tarefa.status === "em andamento"
                ? "badge-andamento"
                : "badge-pendente";

        card.innerHTML = `
            <div class="task-meta">
                <h3>${tarefa.titulo}</h3>
                <span class="badge ${statusClass}">${tarefa.status}</span>
            </div>
            <p>${tarefa.descricao}</p>
        `;

        listaTarefa.appendChild(card);
    });
}

formTarefa.addEventListener("submit", async function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const status = document.getElementById("status").value;

    try {
        const resposta = await fetch("http://localhost:3000/usuario/tarefas/criartarefa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, descricao, status })
        });

        const dados = await resposta.json();
        if (!resposta.ok) {
            throw new Error(dados.message || "Erro ao criar tarefa");
        }

        formTarefa.reset();
        carregarTarefas();
    } catch (erro) {
        console.error(erro);
        alert("Erro ao criar tarefa!");
    }
});

carregarTarefas();