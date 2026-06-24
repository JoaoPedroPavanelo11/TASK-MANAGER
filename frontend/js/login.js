const formLogin = document.getElementById("form-login");
const mensagemLogin = document.getElementById("mensagem-login");

function mostrarMensagemLogin(texto, tipo) {
    mensagemLogin.textContent = texto;
    mensagemLogin.className = `alert alert-${tipo}`;
}


formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const resultado = await loginUsuario(email, password);

        if (resultado.token) {
            mostrarMensagemLogin(resultado.message, "success");
            localStorage.setItem("token", resultado.token);

            setTimeout(function () {
                window.location.href = "./tarefas.html";
            }, 1000)
            return;
        }
        mostrarMensagemLogin(resultado.message || "Erro ao fazer login!", "danger")
    } catch (error) {
        mostrarMensagemLogin("Erro ao fazer login!", "danger")
    }

});
