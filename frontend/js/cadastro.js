const formCadastro = document.getElementById("form-cadastro");
const mensagemCadastro = document.getElementById("mensagem-cadastro");

function mostrarMensagemCadastro(texto, tipo) {
    mensagemCadastro.textContent = texto;
    mensagemCadastro.className = `alert alert-${tipo}`;
}

formCadastro.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const resultado = await criarUsuario(name, email, password);

    if (resultado.usuario) {
        mostrarMensagemCadastro(resultado.message, "success");

        setTimeout(function() {
            window.location.href = "./login.html";
        }, 1500);

        return;
    }

    mostrarMensagemCadastro(resultado.message || "Erro ao cadastrar usuario.", "danger");
});
