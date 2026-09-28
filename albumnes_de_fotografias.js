//---------------------------------------//
//--|funcionalidad_albumes_fotografias|--//
//---------------------------------------//
const tarjetas = document.querySelectorAll(".tarjeta_fotografia");
const botones_favorito = document.querySelectorAll(".boton_favorito");
const botones_ver = document.querySelectorAll(".boton_ver");
const cantidad_favoritos = document.getElementById("cantidad_favoritos");
const limpiar_favoritos = document.getElementById("limpiar_favoritos");
const modal = document.getElementById("modal_fotografia");
const imagen_modal = document.getElementById("imagen_modal");
const titulo_modal = document.getElementById("titulo_modal");
const cerrar_modal = document.getElementById("cerrar_modal");
const foto_anterior = document.getElementById("foto_anterior");
const foto_siguiente = document.getElementById("foto_siguiente");
//-----------------------------------------//
//--|datos_guardados_usando_localstorage|--//
//-----------------------------------------//
let favoritos = JSON.parse(localStorage.getItem("favoritos_album")) || [];
let indice_actual = 0;
//----------------------------------------------//
//--|actualizar_favoritos_usando_localstorage|--//
//----------------------------------------------//
function actualizar_favoritos() {
    tarjetas.forEach(
        function(tarjeta) {
            const id = tarjeta.dataset.id;
            const boton = tarjeta.querySelector(".boton_favorito");
            const icono = boton.querySelector("i");
            if (favoritos.includes(id)) {
                boton.classList.add("activo");
                icono.classList.remove("fa-regular");
                icono.classList.add("fa-solid");
            } else {
                boton.classList.remove("activo");
                icono.classList.remove("fa-solid");
                icono.classList.add("fa-regular");
            }
        }
    );
    cantidad_favoritos.textContent = favoritos.length;
    localStorage.setItem("favoritos_album", JSON.stringify(favoritos));
}
//-----------------------//
//--|alternar_favorito|--//
//-----------------------//
botones_favorito.forEach(
    function(boton, indice) {
        boton.addEventListener(
            "click",
            function() {
                const tarjeta = tarjetas[indice];
                const id = tarjeta.dataset.id;
                if (favoritos.includes(id)) {
                    favoritos =
                        favoritos.filter(
                            function(favorito) {
                                return favorito !== id;
                            }
                        );
                } else {
                    favoritos.push(id);
                }
                actualizar_favoritos();
            }
        );
    }
);
//----------------------//
//--|abrir_fotografia|--//
//----------------------//
function abrir_fotografia(indice) {
    const tarjeta = tarjetas[indice];
    const imagen = tarjeta.querySelector("img");
    const titulo = tarjeta.querySelector("h2");
    indice_actual = indice;
    imagen_modal.src = imagen.src;
    imagen_modal.alt = imagen.alt;
    titulo_modal.textContent = titulo.textContent;
    modal.classList.add("mostrar");
}
//-----------------//
//--|botones_ver|--//
//-----------------//
botones_ver.forEach(
    function(boton, indice) {
        boton.addEventListener(
            "click",
            function() {
                abrir_fotografia(indice);
            }
        );
    }
);
//-------------------------------//
//--|cerrar_con_un_click_modal|--//
//-------------------------------//
cerrar_modal.addEventListener(
    "click",
    function() {
        modal.classList.remove("mostrar");
    }
);
modal.addEventListener(
    "click",
    function(evento) {
        if (evento.target === modal) {
            modal.classList.remove("mostrar");
        }
    }
);
//----------------------------------------//
//--|fotografia_anterior_y_el_siguiente|--//
//----------------------------------------//
foto_anterior.addEventListener(
    "click",
    function() {
        indice_actual--;
        if (indice_actual < 0) {
            indice_actual = tarjetas.length - 1;
        }
        abrir_fotografia(indice_actual);
    }
);
foto_siguiente.addEventListener(
    "click",
    function() {
        indice_actual++;
        if (indice_actual >= tarjetas.length) {
            indice_actual = 0;
        }
        abrir_fotografia(indice_actual);
    }
);
//---------------------------------------//
//--|limpiar_favoritos_en_localstorage|--//
//---------------------------------------//
limpiar_favoritos.addEventListener(
    "click",
    function() {
        if (favoritos.length === 0) {
            alert("No tienes fotografías favoritas.");
            return;
        }
        const confirmar = confirm("¿Deseas eliminar todos los favoritos?");
        if (!confirmar) {
            return;
        }
        favoritos = [];
        localStorage.removeItem("favoritos_album");
        actualizar_favoritos();
    }
);
//------------------------------//
//--|uso_del_teclado_en_modal|--//
//------------------------------//
document.addEventListener(
    "keydown",
    function(evento) {
        if (!modal.classList.contains("mostrar")) {
            return;
        }
        if (evento.key === "Escape") {
            modal.classList.remove("mostrar");
        }
        if (evento.key === "ArrowLeft") {
            foto_anterior.click();
        }
        if (evento.key === "ArrowRight") {
            foto_siguiente.click();
        }
    }
);
actualizar_favoritos();