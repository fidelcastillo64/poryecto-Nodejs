window.onload = init;

    function init() { 
        if(!localStorage.getItem("token"))
        {
            document.querySelector('.btn-primary').addEventListener('click', login);
        }
        else
        {
            window.location.href = "bienvenido.html";
        }
}

function login() {
    var mail = document.getElementById('input-mail').value; 
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post', 
        url: 'http://localhost:3000/user/login', 
        data: {
            correo: mail, 
            contrasena: pass
        }

    }).then(function(res) {
        console.log(res.data); 
        if (res.data.code === 200) {
            localStorage.setItem("token", res.data.message);
            window.location.href = "bienvenido.html";
            alert("inicio exitoso");
        }
        else{
            alert("Usuario y/o contraseña incorrecta");
        }
    }).catch(function(err) {
        console.log(err);
    })
}
