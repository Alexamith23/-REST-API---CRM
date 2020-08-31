let output = document.getElementById("mensaje");


function cargar_clientes() {
  const completed = (e) => {
    var clientes = JSON.parse(e.target.responseText);
    if (clientes.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(clientes.no_clientes){
      document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes contactos!!!";
      $("#agregar").css('visibility', 'hidden');
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
          d += '<option>'+arreglo[i].usuario +'</option>';
        }
        $("#usuarioE").append(d);
        $("#usuario").append(d);
      }
    };
    const error = () => console.log(this.responseText);
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET","http://localhost:3000/CRM/users");
    ajaxRequest.send();
  }

function cargar_reuniones() {
  const completed = (e) => {
    var clientes = JSON.parse(e.target.responseText);
    if (clientes.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(clientes.vacio){
      document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes reuniones!!!";

    }else if(clientes.error){
      
    }
    else if(clientes.meet){
      let arreglo = clientes.meet;
      var d = '';
      for (var i = 0; i < arreglo.length; i++) {
        let name =arreglo[i].nombre;
        d += '<tr>' +
          '<td>' + arreglo[i]._id + '</td>' +
          '<td>' + arreglo[i].titulo + '</td>' +
          '<td>' + arreglo[i].dia_hora + '</td>' +
          '<td>' + arreglo[i].hora + '</td>' +
          '<td>' + arreglo[i].usuario + '</td>' +
          '<td>' + arreglo[i].virtual + '</td>' +
          '<td>' + arreglo[i].cliente + '</td>' +
          '<td>'+ "<a  href='#' class='btn btn-success' onclick="+'cargar_datos('+'\''+arreglo[i]._id+'\''+')'+">E</a> <a  href='#' class='btn btn-success' onclick="+'borrar_reuniones('+'\''+arreglo[i]._id+'\''+')'+">B</a>"+ '</td>' +
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
  ajaxRequest.open("GET","http://localhost:3000/CRM/reuniones?id_user=1");
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
}

function registrar_reuniones() {
  var titulo = document.getElementById("titulo").value;
  var fecha = document.getElementById("fecha").value;
  var hora = document.getElementById("hora").value;
  var usuario = document.getElementById("usuario").value;
  var cliente = document.getElementById("cliente").value;
  var virtual = document.getElementById("virtual");
  if (virtual.checked) {
    virtual = true;
  }else{
    virtual = false;
  }
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
    else if(cliente.meet){
      mensaje = "Registraste una nueva reunión";
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
  ajaxRequest.open("POST","http://localhost:3000/CRM/reuniones?id_user=1&titulo="+
  titulo+"&fecha="+fecha+"&hora="+hora+"&usuario="+usuario+"&cliente="+cliente+
  "&virtual="+virtual);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
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
      document.getElementById("tituloE").value = clientes.titulo;
      document.getElementById("fechaE").value = clientes.dia_hora;
      document.getElementById("horaE").value = clientes.hora;
      document.getElementById("usuarioE").value = clientes.usuario;
      document.getElementById("clienteE").value = clientes.cliente;
      if(clientes.virtual){
        $("#virtualE").prop("checked", true);
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
    ajaxRequest.open("GET","http://localhost:3000/CRM/reuniones?id_user=1&id="+_id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();

}

function editar_reuniones() {
  var id = document.getElementById("idE").value;
  var titulo = document.getElementById("tituloE").value;
  var fecha = document.getElementById("fechaE").value;
  var hora = document.getElementById("horaE").value;
  var usuario = document.getElementById("usuarioE").value;
  var cliente = document.getElementById("clienteE").value;
  var virtual = document.getElementById("virtualE");
  if (virtual.checked) {
    virtual = true;
  }else{
    virtual = false;
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
      mensaje = "Se editó la reunión con éxito";
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
  ajaxRequest.open("PATCH","http://localhost:3000/CRM/reuniones?id_user=1&id="+id+"&titulo="+
  titulo+"&fecha="+fecha+"&hora="+hora+"&usuario="+usuario+"&cliente="+cliente+
  "&virtual="+virtual);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
  
}

function borrar_reuniones(id) {
  if(confirmar_para_borrar()){
    const completed = (e) => {
      $("#modal_registro").modal("hide");
      output.innerHTML = "Se borró la reunión";
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
    ajaxRequest.open("DELETE","http://localhost:3000/CRM/reuniones?id_user=1&id="+id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();
  }
}

function confirmar_para_borrar() {
  let borrar = confirm("¿Desea eliminar esta reunión?");
  return borrar;
}