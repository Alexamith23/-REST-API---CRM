var output = document.getElementById("nav");
var administrador = false;
output.innerHTML += `<a class="navbar-brand" href="#" id ="nav_color"style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;">CRM Portillo´s</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>`;
if (administrador) {
  output.innerHTML += `
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <a class="nav-link" href="#" id="link">Usuarios <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#" id="link">Reportes</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-success my-2 my-sm-0" type="submit">Buscar</button>
            </form>
        </div>`;
}else{
    output.innerHTML += `
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="../html/clientes.html" id="link">Clientes</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../html/contactos.html" id="link">Contactos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../html/tickets.html" id="link">Tickets</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../html/reuniones.html" id="link">Reuniones</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-success my-2 my-sm-0" type="submit">Buscar</button>
            </form>
        </div>`;
}