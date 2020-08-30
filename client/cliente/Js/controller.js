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
      $("#modal_registro").modal("hide");
      $("#exampleModalCenter").modal();
    }
    if(mensaje != ""){
      $("#modal_registro").modal("hide");
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
        let name =arreglo[i].nombre;
        d += '<tr>' +
          '<td>' + arreglo[i]._id + '</td>' +
          '<td>' + arreglo[i].nombre + '</td>' +
          '<td>' + arreglo[i].ced_juridica + '</td>' +
          '<td>' + arreglo[i].pagina_web + '</td>' +
          '<td>' + arreglo[i].direccion + '</td>' +
          '<td>' + arreglo[i].telefono + '</td>' +
          '<td>' + arreglo[i].sector + '</td>' +
          '<td>'+ "<a  href='#' class='btn btn-success' onclick="+'cargar_datos('+'\''+arreglo[i]._id+'\''+')'+">E</a> <a  href='#' class='btn btn-success' onclick="+'borrar_clientes('+'\''+arreglo[i]._id+'\''+')'+">B</a>"+ '</td>' +
          '</tr>';
      }
      $("#tabla").append(d);
    }
  };
  const error = () => console.log(this.responseText);
  let persona = JSON.parse(localStorage.getItem("usuarios"));
  if(persona === null){
    persona = [{"usuario_token":"undefined"}];
  }
  
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
  var sector = document.getElementById("sector").value;
  var mensaje = "";
  const completed = (e) => {
    var cliente = JSON.parse(e.target.responseText);
    if (cliente.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(cliente.vacio){
      mensaje = cliente.vacio;
    }else if(cliente.error){
      mensaje = cliente.error;
    }
    else if(cliente.client){
      mensaje = "Registraste un cliente nuevo";
    }
    if(mensaje != ""){
      $("#modal_registro").modal("hide");
      output.innerHTML = mensaje;
      $("#sms").modal();
    }
  };
  const error = () => console.log(this.responseText);
  let persona = JSON.parse(localStorage.getItem("usuarios"));
  if(persona === null){
    persona = [{"usuario_token":"undefined"}];
  }
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completed);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST","http://localhost:3000/CRM/clientes?id_user=1&nombre="+
  nombre+"&ced_juridica="+juridica+"&pagina_web="+web+"&direccion="+dir+"&telefono="+telefono+
  "&sector="+sector);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();

}

function cargar_datos(_id) {
  var mensaje = "";
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
    else if(clientes){
      document.getElementById("idE").value = clientes._id;
      document.getElementById("nombreE").value = clientes.nombre;
      document.getElementById("juridicaE").value  = clientes.ced_juridica;
      document.getElementById("webE").value = clientes.pagina_web;
      document.getElementById("dirE").value  = clientes.direccion;
      document.getElementById("telefonoE").value  = clientes.telefono;
      document.getElementById("sectorE").value  = clientes.sector;
      $("#modal_editar").modal();
    }
  };
    const error = () => console.log(this.responseText);
    let persona = JSON.parse(localStorage.getItem("usuarios"));
    if(persona === null){
      persona = [{"usuario_token":"undefined"}];
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET","http://localhost:3000/CRM/clientes?id_user=1&id="+_id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();

}

function editar_clientes() {
  var id = document.getElementById("idE").value;
  var nombre = document.getElementById("nombreE").value;
  var juridica = document.getElementById("juridicaE").value;
  var web = document.getElementById("webE").value;
  var dir = document.getElementById("dirE").value;
  var telefono = document.getElementById("telefonoE").value;
  var sector = document.getElementById("sectorE").value;
  var mensaje = "";
  const completed = (e) => {
    var cliente = JSON.parse(e.target.responseText);
    if (cliente.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(cliente.vacio){
      mensaje = cliente.vacio;
    }else if(cliente.error){
      mensaje = cliente.error;
    }
    else if(cliente.editado){
      mensaje = cliente.editado;
      window.open("../html/clientes.html", "_self");
    }
    $("#modal_registro").modal("hide");
    output.innerHTML = mensaje;
    $("#sms").modal();
  };
  const error = () => console.log(this.responseText);
  let persona = JSON.parse(localStorage.getItem("usuarios"));
  if(persona === null){
    persona = [{"usuario_token":"undefined"}];
  }
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completed);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("PATCH","http://localhost:3000/CRM/clientes?id_user=1&id="+id+"&nombre="+
  nombre+"&ced_juridica="+juridica+"&pagina_web="+web+"&direccion="+dir+"&telefono="+telefono+
  "&sector="+sector);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
  
}

function borrar_clientes(id) {
  if(confirmar_para_borrar()){
    const completed = (e) => {
      $("#modal_registro").modal("hide");
      output.innerHTML = mensaje;
      $("#sms").modal();
      window.open("../html/clientes.html", "_self");
    };
    const error = () => console.log(this.responseText);
    let persona = JSON.parse(localStorage.getItem("usuarios"));
    if(persona === null){
      persona = [{"usuario_token":"undefined"}];
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("DELETE","http://localhost:3000/CRM/clientes?id_user=1&id="+id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();
  }
}

function confirmar_para_borrar() {
  let borrar = confirm("¿Desea eliminar este cliente?");
  return borrar;
}