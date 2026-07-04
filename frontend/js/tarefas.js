const formTarefa = document.getElementById("form-tarefa");
const listaTarefa = document.getElementById("lista-tarefa");

// Verificar o Token
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "./login.html";
}

// Carregar as tarefas
async function carregarTarefas() {
    try {
        const resposta = await fetch("http://localhost:3000/usuario/tarefas/todastarefa", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        );

        const dados = await resposta.json();

           if(!resposta.ok){
            throw new Error(dados.message || "Erro ao carregar tarefas");
        }

        mostrarTarefas(dados.tarefa);
    } catch (erro) {
        console.error(erro);
        listaTarefa.innerHTML = "<p>Erro ao carregar tarefas!</p>";
    }
}

function mostrarTarefas(tarefa){
    if(!tarefa || tarefa.length === 0){
        listaTarefa.innerHTML = "<p>Nenhuma tarefa cadastrada!</p>"
        return;
    }

    listaTarefa.innerHTML = " ";

    tarefas.forEach(tarefa => {
        const card = document.createElement("div");
        card.className = "card mb-3";

        card.innerHTML = `
            <div class="card-body">
                <h3 class="h6">${tarefa.titulo}</h3>
                <p class="mb-2">${tarefa.descricao}</p>
                <span class="badge bg-primary">${tarefa.status}</span>
            </div>
        `;

        listaTarefa.appendChild(card);
    })
}

formTarefa.addEventListener("submit", async function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("desrição").value;
    const status = document.getElementById("status").value;

    try{
        const resposta = await fetch("http://localhost:3000/usuario/tarefas/criartarefa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, descricao, status })
        });

        const dados = await resposta.json();
        if(!resposta.ok){
            throw new Error(dados.message || "Erro ao criar tarefa");
        }

        formTarefa.reset();
        carregarTarefas();
    }catch(erro){
        console.error(erro);
        alert("Erro ao criar tarefa!");
    }
});

carregarTarefas();