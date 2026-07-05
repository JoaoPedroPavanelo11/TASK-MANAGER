const formLogin = document.getElementById("form-login");
const mensagemLogin = document.getElementById("mensagem-login");

redirectIfAuthenticated();

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    esconderMensagem(mensagemLogin);

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const resultado = await loginUsuario(email, password);

        if (resultado.token) {
            localStorage.setItem("token", resultado.token);
            mostrarMensagem(mensagemLogin, resultado.message || "Login realizado!", "success");

            setTimeout(function () {
                window.location.href = "./tarefas.html";
            }, 800);
            return;
        }

        mostrarMensagem(mensagemLogin, resultado.message || "E-mail ou senha incorretos.", "danger");
    } catch (error) {
        mostrarMensagem(mensagemLogin, "Erro ao conectar com o servidor.", "danger");
    }
});
