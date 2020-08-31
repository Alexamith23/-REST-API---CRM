let output = document.getElementById("mensaje");



function registrar_usuario() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var usuario = document.getElementById("usuario").value;
    var clave = document.getElementById("clave").value;
    var administrador = document.getElementById("administrador");
    if (administrador.checked) {
        administrador = true;
      }else{
        administrador = false;
      }
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
        mensaje = "Registraste a "+persona.usuario+" en el sistema"
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
    ajaxRequest.open("POST","http://localhost:3000/CRM/users?nombre=" +nombre +"&apellido=" +apellido +"&usuario=" 
    +usuario +"&clave=" +clave+"&admin=" +administrador);
    ajaxRequest.send();
  }
  function cargar_usuarios() {
    const completed = (e) => {
      var clientes = JSON.parse(e.target.responseText);
    if(clientes.no_clientes){
        document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes contactos!!!";
        $("#agregar").css('visibility', 'hidden');
      }else if(clientes.error){
        alert(clientes.error);
      }
      else if(clientes){
        let arreglo = clientes;
        var d = '';
        for (var i = 0; i < arreglo.length; i++) {
            if (arreglo[i].administrador === undefined) {
                arreglo[i].administrador = false;
            }
            if(arreglo[i].administrador){
                arreglo[i].administrador = "Administrador";
            }else{
                arreglo[i].administrador = "Usuario";
            }

          d += '<tr>' +
          '<td>' + arreglo[i]._id + '</td>' +
          '<td>' + arreglo[i].nombre + '</td>' +
          '<td>' + arreglo[i].apellido + '</td>' +
          '<td>' + arreglo[i].usuario + '</td>' +
          '<td>' + arreglo[i].clave + '</td>' +
          '<td>' + arreglo[i].administrador + '</td>' +
          '<td>'+ "<a  href='#' class='btn btn-success' onclick="+'cargar_datos('+'\''+arreglo[i]._id+'\''+')'+">E</a> <a  href='#' class='btn btn-success' onclick="+'borrar_usuario('+'\''+arreglo[i]._id+'\''+')'+">B</a>"+ '</td>' +
          '</tr>';
        }
        $("#tabla").append(d);
      }
    };
    const error = () => console.log(this.responseText);
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET","http://localhost:3000/CRM/users");
    ajaxRequest.send();
  }

function cargar_datos(_id) {
  const completed = (e) => {
    var clientes = JSON.parse(e.target.responseText);
    if (clientes.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(clientes.error){
      document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes contactos!!!";
      
    }else if(clientes.error){
      alert(clientes.error);
    }
    else if(clientes){
        document.getElementById("idE").value = clientes._id;
        document.getElementById("nombreE").value = clientes.nombre;
        document.getElementById("apellidoE").value = clientes.apellido;
        document.getElementById("usuarioE").value = clientes.usuario;
        document.getElementById("claveE").value = clientes.clave;
        if(clientes.administrador){
            $("#administradorE").prop("checked", true);
          }
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
    ajaxRequest.open("GET","http://localhost:3000/CRM/users?id_user=1&id="+_id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();

}

function editar_usuarios() {
    var _id = document.getElementById("idE").value;
    var nombre = document.getElementById("nombreE").value;
    var apellido = document.getElementById("apellidoE").value;
    var usuario = document.getElementById("usuarioE").value;
    var clave = document.getElementById("claveE").value;
    var administrador = document.getElementById("administradorE");
    if (administrador.checked) {
        administrador = true;
      }else{
        administrador = false;
      }
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
      mensaje = "Se editó el usuario con éxito";
    }
    $("#modal_editar").modal("hide");
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
  ajaxRequest.open("PATCH","http://localhost:3000/CRM/users?id_user=1&id="+_id+"&nombre=" +nombre +"&apellido=" +apellido +"&usuario=" 
  +usuario +"&clave=" +clave+"&admin=" +administrador);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
  
}

function borrar_usuario(id) {
  if(confirmar_para_borrar()){
    const completed = (e) => {
      $("#modal_registro").modal("hide");
      output.innerHTML = "Se borró la cuenta";
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
    ajaxRequest.open("DELETE","http://localhost:3000/CRM/users?id_user=1&id="+id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();
  }
}

function confirmar_para_borrar() {
  let borrar = confirm("¿Desea eliminar la cuenta de este usuario?");
  return borrar;
}