let output = document.getElementById("mensaje");


function cargar_clientes() {
  console.log("Entra");
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
        d += '<option>'+arreglo[i].nombre+'</option>';
      }
      $("#cliente").append(d);
      $("#clienteE").append(d);
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

function cargar_contactos() {
  const completed = (e) => {
    var clientes = JSON.parse(e.target.responseText);
    if (clientes.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(clientes.vacio){
      document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes clientes!!!";
    }else if(clientes.error){
      alert(clientes.error);
    }
    else if(clientes.contactos){
      let arreglo = clientes.contactos;
      var d = '';
      for (var i = 0; i < arreglo.length; i++) {
        let name =arreglo[i].nombre;
        d += '<tr>' +
          '<td>' + arreglo[i]._id + '</td>' +
          '<td>' + arreglo[i].client + '</td>' +
          '<td>' + arreglo[i].nombre + '</td>' +
          '<td>' + arreglo[i].apellido + '</td>' +
          '<td>' + arreglo[i].correo + '</td>' +
          '<td>' + arreglo[i].telefono + '</td>' +
          '<td>' + arreglo[i].puesto + '</td>' +
          '<td>'+ "<a  href='#' class='btn btn-success' onclick="+'cargar_datos('+'\''+arreglo[i]._id+'\''+')'+">E</a> <a  href='#' class='btn btn-success' onclick="+'borrar_contactos('+'\''+arreglo[i]._id+'\''+')'+">B</a>"+ '</td>' +
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
  ajaxRequest.open("GET","http://localhost:3000/CRM/contacs?id_user=1");
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
}

function registrar_contactos() {
  var cliente = document.getElementById("cliente").value;
  var nombre = document.getElementById("nombre").value;
  var apellidos = document.getElementById("apellido").value;
  var correo = document.getElementById("correo").value;
  var telefono = document.getElementById("telefono").value;
  var puesto = document.getElementById("puesto").value;

  var mensaje = "";
  const completed = (e) => {
    var cliente = JSON.parse(e.target.responseText);
    if (cliente.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(cliente.Message){
      mensaje = cliente.Message;
    }else if(cliente.error){
      mensaje = cliente.error;
    }
    else if(cliente.contacto){
      mensaje = "Registraste un contacto nuevo";
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
  ajaxRequest.open("POST","http://localhost:3000/CRM/contacs?id_user=1&client="+
  cliente+"&nombre="+nombre+"&apellido="+apellidos+"&correo="+correo+"&telefono="+telefono+
  "&puesto="+puesto);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();

}

function cargar_datos(_id) {
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
      document.getElementById("clienteE").value = clientes.client;
      document.getElementById("nombreE").value = clientes.nombre;
      document.getElementById("apellidoE").value  = clientes.apellido;
      document.getElementById("correoE").value = clientes.correo;
      document.getElementById("telefonoE").value  = clientes.telefono;
      document.getElementById("puestoE").value  = clientes.puesto;
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
    ajaxRequest.open("GET","http://localhost:3000/CRM/contacs?id_user=1&id="+_id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();

}

function editar_contactos() {
  var id = document.getElementById("idE").value;
  var cliente = document.getElementById("clienteE").value;
  var nombre =    document.getElementById("nombreE").value;
  var apellido =    document.getElementById("apellidoE").value;
  var correo =    document.getElementById("correoE").value;
  var telefono =    document.getElementById("telefonoE").value;
  var puesto =    document.getElementById("puestoE").value;
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
    else if(cliente){
      mensaje = cliente.editado;
      window.open("../html/contactos.html", "_self");
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
  ajaxRequest.open("PATCH","http://localhost:3000/CRM/contacs?id_user=1&id="+id+"&client="+
  cliente+"&nombre="+nombre+"&apellido="+apellido+"&correo="+correo+"&telefono="+telefono+
  "&puesto="+puesto);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
  
}

function borrar_contactos(id) {
  if(confirmar_para_borrar()){
    const completed = (e) => {
      $("#modal_registro").modal("hide");
      output.innerHTML = "Se borró el contacto";
      $("#sms").modal();
      window.open("../html/contactos.html", "_self");
    };
    const error = () => console.log(this.responseText);
    let persona = JSON.parse(localStorage.getItem("usuarios"));
    if(persona === null){
      persona = [{"usuario_token":"undefined"}];
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("DELETE","http://localhost:3000/CRM/contacs?id_user=1&id="+id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();
  }
}

function confirmar_para_borrar() {
  let borrar = confirm("¿Desea eliminar este cliente?");
  return borrar;
}