const formLogin = document.getElementById("form-login");
const mensagemLogin = document.getElementById("mensagem-login");

function mostrarMensagemLogin(texto, tipo){
    mensagemLogin.textContent = texto;
    mensagemLogin.className = `alert alert-${tipo}`;
}


formLogin.addEventListener("submit", async function(event)  {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const resultado = await loginUsuario(email, password);
    console.log(resultado);
});

