let output = document.getElementById("mensaje");


function cargar_clientes() {
  const completed = (e) => {
    var clientes = JSON.parse(e.target.responseText);
    if (clientes.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(clientes.no_clientes){
      document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes ningún ticket!!!";
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


function cargar_tikets() {
  const completed = (e) => {
    var clientes = JSON.parse(e.target.responseText);
    if (clientes.Unauthorized) {
      alert("Su sessión ha caducado, por favor vuelva a iniciar sessión");
      window.open("../index.html", "_self");
    } else if(clientes.vacio){
      document.getElementById("admin").innerText = "¡¡¡Vaya al parecer no tienes ningún ticket!!!";
      $("#agregar").css('visibility', 'hidden');
    }else if(clientes.error){
      
    }
    else if(clientes.supportTiket){
      let arreglo = clientes.supportTiket;
      var d = '';
      for (var i = 0; i < arreglo.length; i++) {
        let name =arreglo[i].nombre;
        d += '<tr>' +
          '<td>' + arreglo[i]._id + '</td>' +
          '<td>' + arreglo[i].titulo + '</td>' +
          '<td>' + arreglo[i].detalle + '</td>' +
          '<td>' + arreglo[i].reporta + '</td>' +
          '<td>' + arreglo[i].cliente + '</td>' +
          '<td>' + arreglo[i].estado + '</td>' +
          '<td>'+ "<a  href='#' class='btn btn-success' onclick="+'cargar_datos('+'\''+arreglo[i]._id+'\''+')'+">E</a> <a  href='#' class='btn btn-success' onclick="+'borrar_tiket('+'\''+arreglo[i]._id+'\''+')'+">B</a>"+ '</td>' +
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
  ajaxRequest.open("GET","http://localhost:3000/CRM/tikets?id_user=1");
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
}

function registrar_tikets() {
  var titulo = document.getElementById("titulo").value;
  var detalle = document.getElementById("detalle").value;
  var pertenece = document.getElementById("pertenece").value;
  var radios = document.getElementsByName("estado");
  var cliente = document.getElementById("cliente").value;
  for (var i = 0, length = radios.length; i < length; i++)
  {
    if (radios[i].checked)
    {
        radios = radios[i].value;
        break;
    }
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
    else if(cliente.supportTiket){
      mensaje = "Registraste un nuevo tiket";
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
  ajaxRequest.open("POST","http://localhost:3000/CRM/tikets?id_user=1&titulo="+
  titulo+"&detalle="+detalle+"&reporta="+pertenece+"&cliente="+cliente+"&estado="+radios);
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
        document.getElementById("detalleE").innerText = clientes.detalle;
        document.getElementById("perteneceE").value = clientes.reporta;
        var radios = document.getElementsByName("estadoE");  
        document.getElementById("clienteE").value = clientes.cliente;
        for (var i = 0, length = radios.length; i < length; i++)
        {
            if (radios[i].value == clientes.estado)
            {
                radios[i].checked = true;
                break;
            }
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
    ajaxRequest.open("GET","http://localhost:3000/CRM/tikets?id_user=1&id="+_id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();

}

function editar_tikets() {
    var id = document.getElementById("idE").value;
    var titulo = document.getElementById("tituloE").value;
    var detalle = document.getElementById("detalleE").value;
    var pertenece = document.getElementById("perteneceE").value;
    var radios = document.getElementsByName("estadoE");
    var cliente = document.getElementById("clienteE").value;
    for (var i = 0, length = radios.length; i < length; i++)
    {
      if (radios[i].checked)
      {
          radios = radios[i].value;
          break;
      }
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
      mensaje = "Se editó el ticket con éxito";
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
  ajaxRequest.open("PATCH","http://localhost:3000/CRM/tikets?id_user=1&id="+id+"&titulo="+
  titulo+"&detalle="+detalle+"&reporta="+pertenece+"&cliente="+cliente+"&estado="+radios);
  ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
  ajaxRequest.send();
  
}

function borrar_tiket(id) {
  if(confirmar_para_borrar()){
    const completed = (e) => {
      $("#modal_registro").modal("hide");
      output.innerHTML = "Se borró el ticket";
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
    ajaxRequest.open("DELETE","http://localhost:3000/CRM/tikets?id_user=1&id="+id);
    ajaxRequest.setRequestHeader("authorization",persona[0].usuario_token)
    ajaxRequest.send();
  }
}

function confirmar_para_borrar() {
  let borrar = confirm("¿Desea eliminar este ticket?");
  return borrar;
}