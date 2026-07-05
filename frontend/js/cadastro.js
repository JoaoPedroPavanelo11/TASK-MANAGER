const formCadastro = document.getElementById("form-cadastro");
const mensagemCadastro = document.getElementById("mensagem-cadastro");

redirectIfAuthenticated();

formCadastro.addEventListener("submit", async function (event) {
    event.preventDefault();
    esconderMensagem(mensagemCadastro);

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const resultado = await criarUsuario(name, email, password);

        if (resultado.usuario) {
            mostrarMensagem(mensagemCadastro, resultado.message || "Conta criada com sucesso!", "success");

            setTimeout(function () {
                window.location.href = "./login.html";
            }, 1200);
            return;
        }

        mostrarMensagem(mensagemCadastro, resultado.message || "Erro ao cadastrar.", "danger");
    } catch (error) {
        mostrarMensagem(mensagemCadastro, "Erro ao conectar com o servidor.", "danger");
    }
});
