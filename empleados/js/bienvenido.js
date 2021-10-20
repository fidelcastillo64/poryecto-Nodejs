window.onload = init;
var headers = {};
var url_R = "http://localhost:3000/empleados";

function init(){
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
                'Authorization': "bearer " + localStorage.getItem("token")
        }
        cargar_funcionalidades();
    }
    else{
        window.location.href = "index.html";
    }
}

function cargar_funcionalidades(){
    document.querySelector('.btn_btn-registro').addEventListener('click', insertar_user);
    document.querySelector('.btn_btn-modificar').addEventListener('click', modificar_user);
    document.querySelector('.btn_btn-eliminar').addEventListener('click', delete_user);
    document.querySelector('.btn_btn-buscar').addEventListener('click', buscar_user);
}

function modificar_user()
{
    var nombrelocal = document.getElementById('nom_m').value; 
    var apellidoslocal = document.getElementById('ape_m').value; 
    var correolocal = document.getElementById('email_m').value;
    var passwordlocal = document.getElementById('pass_m').value; 
    var telefonolocal = document.getElementById('tel_m').value; 
    var direccionlocal = document.getElementById('dic_m').value;
    url_R = url_R + "/" + nombrelocal;
    alert(url_R);
    axios({
        method: 'put', 
        url: url_R,
        headers,
        data: {
            nombre: nombrelocal,
            apellidos: apellidoslocal,
            correo: correolocal, 
            contrasena: passwordlocal,
            telefono: telefonolocal,
            direccion: direccionlocal
        }
    }).then(function(res) {
        console.log(res.data); 
        if (res.data.code === 200) {
            alert("actulizacion exitosa");
        }
        else{
            alert("usuario no insertado");
        }
    }).catch(function(err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/empleados";
}

function insertar_user(){
    var nombrelocal = document.getElementById('nom_r').value; 
    var apellidoslocal = document.getElementById('ape_r').value; 
    var correolocal = document.getElementById('email_r').value;
    var passwordlocal = document.getElementById('pass_r').value; 
    var telefonolocal = document.getElementById('tel_r').value; 
    var direccionlocal = document.getElementById('dic_r').value;
    alert(url_R);
    axios({
        method: 'post', 
        url: url_R,
        headers,
        data: {
            nombre: nombrelocal,
            apellidos: apellidoslocal,
            correo: correolocal, 
            contrasena: passwordlocal,
            telefono: telefonolocal,
            direccion: direccionlocal
        }
    }).then(function(res) {
        console.log(res.data); 
        if (res.data.code === 201) {
            alert("insercion exitosa");
        }
        else{
            alert("usuario no insertado");
        }
    }).catch(function(err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/empleados";
}

function delete_user(){
    var idlocal = document.getElementById('id_del').value; 
    var nombrelocal = document.getElementById('nom_del').value; 
    url_R = url_R + "/";
    axios({
        method: 'delete', 
        url: url_R,
        headers,
        data: {
            id: idlocal,
            nombre: nombrelocal
        }
    }).then(function(res) {
        console.log(res.data); 
        if (res.data.code === 200) {
            alert("eliminacion exitosa");
        }
        else{
            alert("usuario no eliminado");
        }
    }).catch(function(err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/empleados";
}

function buscar_user(){
    var idlocal = document.getElementById('id_bus').value; 
    var nombrelocal = document.getElementById('nom_bus').value; 
    url_R = url_R + "/buscar";
    alert(url_R)
    axios({
        method: 'post', 
        url: url_R,
        headers,
        data: {
            id: idlocal,
            nombre: nombrelocal
        }
    }).then(function(res) {
        console.log(res.data); 
        if (res.data.code === 200) {
            const usuario = res.data.message;
            displaydatos(usuario);
        }
        else{
            alert("usuario no eliminado");
        }
    }).catch(function(err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/empleados";
}

function displaydatos(usuario){
    const contenedor = document.querySelector("div.seccion_bus");
contenedor.innerHTML +=`<div>
apellidos:<br>
<h5 class="int_AP">${usuario[0].apellidos}</h5>
</div>
<div>
correo electrónico:<br>
<h5 class="int_CE">${usuario[0].correo}</h5>
</div>
<div>
contraseña:<br>
<h5 class="int_PS">${usuario[0].contrasena}</h5>
</div>
<div>
telefono:<br>
<h5 class="int_tel">${usuario[0].telefono}</h5>
</div>
<div>
direccion:<br>
<h5 class="int_dic">${usuario[0].direccion}</h5>
</div>`;
}