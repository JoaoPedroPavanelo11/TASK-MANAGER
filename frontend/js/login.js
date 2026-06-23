const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", async function(event)  {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const resultado = await loginUsuario(email, password);
    console.log(resultado);
});
