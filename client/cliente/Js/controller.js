let output = document.getElementById("mensaje");
function registrar_usuario() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var usuario = document.getElementById("usuario").value;
  var clave = document.getElementById("clave").value;
  var mensaje = "";
  const completed = (e) => {
    var persona = JSON.parse(e.target.responseText);
    if (persona.Message) {
      mensaje = "Por favor ingrese todos los datos solicitados";
    } else if (persona.repetido) {
      mensaje = "El nombre de usuario registrado ya existe";
    } else if (persona.error) {
      console.log(persona.error);
    } else if (persona.nombre) {
      mensaje = "Muchas gracias por registrarte!! Ahora inicia sessión para empezar";
      window.open("index.html", "_self");
    }
    $("#modal_registro").modal("hide");
    output.innerHTML = mensaje;
    $("#sms").modal();
  };

  const error = () => console.log(this.responseText);

  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completed);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open(
    "POST",
    "http://localhost:3000/CRM/users?nombre=" +
      nombre +
      "&apellido=" +
      apellido +
      "&usuario=" +
      usuario +
      "&clave=" +
      clave
  );
  ajaxRequest.send();
}

function autenticar() {
  var usuario = document.getElementById("inputEmail3").value;
  var clave = document.getElementById("inputPassword3").value;
  var mensaje = "";
  const completed = (e) => {
    var persona = JSON.parse(e.target.responseText);
    if (persona.vacio) {
      mensaje = "Por favor ingrese todos los datos solicitados";
    } else if (persona.repetido) {
      mensaje = "Nombre de usuario o contraseña incorrecto";
    } else if (persona.token) {
      var usuario = [{"usuario_token":persona.token}];
      localStorage.setItem("usuarios", JSON.stringify(usuario)); 
      window.open("./html/dashboard_user.html", "_self");
    }
    if (mensaje != "") {
      $("#exampleModalCenter").modal("hide");
      output.innerHTML = mensaje;
      $("#sms").modal();
    }
  };

  const error = () => console.log(this.responseText);

  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completed);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open(
    "POST",
    "http://localhost:3000/CRM/userLogin?usuario=" + usuario + "&clave=" + clave
  );
  ajaxRequest.send();
}



function cargar_clientes() {
  const completed = (e) => {
    var clientes = JSON.parse(e.target.responseText);
    if (clientes.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(clientes.no_clientes){
      document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes clientes!!!";
      
    }else if(clientes.error){
      alert(clientes.error);
    }
    else if(clientes.clientes){
      let arreglo = clientes.clientes;
      var d = '';
      for (var i = 0; i < arreglo.length; i++) {
        d += '<tr>' +
          '<td>' + arreglo[i]._id + '</td>' +
          '<td>' + arreglo[i].nombre + '</td>' +
          '<td>' + arreglo[i].ced_juridica + '</td>' +
          '<td>' + arreglo[i].pagina_web + '</td>' +
          '<td>' + arreglo[i].direccion + '</td>' +
          '<td>' + arreglo[i].telefono + '</td>' +
          '<td>' + arreglo[i].sector + '</td>' +
          '<td> <a  href="./dashboard_user.html" class="btn btn-success" style="">E</a> <a  href="./dashboard_user.html" class="btn btn-success" style="">B</a></td>' +
          '</tr>';
      }
      //document.getElementById("tabla").append(d);
      $("#tabla").append(d);
    }
  };
  const error = () => console.log(this.responseText);
  let persona = JSON.parse(localStorage.getItem("usuarios"));
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completed);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET","http://localhost:3000/CRM/clientes?id_user=1");
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
}


function registrar_clientes() {
  var nombre = document.getElementById("nombre").value;
  var juridica = document.getElementById("juridica").value;
  var web = document.getElementById("web").value;
  var dir = document.getElementById("dir").value;
  var telefono = document.getElementById("telefono").value;
  var mensaje = "";
  const completed = (e) => {
    var persona = JSON.parse(e.target.responseText);
    if (persona.Message) {
      mensaje = "Por favor ingrese todos los datos solicitados";
    } else if (persona.repetido) {
      mensaje = "El nombre de usuario registrado ya existe";
    } else if (persona.error) {
      console.log(persona.error);
    } else if (persona.nombre) {
      window.open("./html/dashboard_user.html", "_self");
    }
    $("#modal_registro").modal("hide");
    output.innerHTML = mensaje;
    $("#sms").modal();
  };

}