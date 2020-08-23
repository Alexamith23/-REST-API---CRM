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
      window.open("./html/dashboard_user.html", "_self");
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
