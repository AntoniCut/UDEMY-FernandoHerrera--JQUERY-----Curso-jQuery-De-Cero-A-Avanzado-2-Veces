//  **************************************
//  **********  js/smallBox.js  **********
//  **************************************

(function () {

    //  -----  Documento Cargado  -----
    console.warn('Documento Cargado!!!');


    //  **********  Función Principal - smallBox()  **********
    $.smallBox = function (opciones) {
        
        opciones = $.extend({
            
            titulo: undefined,
            subtitulo: undefined,
            contenido: undefined,
            fa: "fa-envelope-o",
            img: undefined,
            timeout: 3000

        }, opciones);


        //  -----  Crear la caja smallBox Dinamicamente  -----
        let html = '';

        html += '<div class="smallBox-contenedor">';
        html += '    <div class="smallBox-foto">';
        html += '        <img src="' + opciones.img + '">';
        html += '    </div>';
        html += '    <div class="smallBox-contenido" align="center">';
        html += '        <div class="smallBox-textoContenedor" align="left">';
        html += '            <span class="smallBox-titulo">' + opciones.titulo + '</span>';
        html += '            <span class="smallBox-subTitulo"> ' + opciones.subtitulo + ' </span>';
        html += '        </div>';
        html += '        <div class="smallBox-pico"> </div>';
        html += '        <div class="smallBox-cajaColor">';
        html += '            <div class="smallBox-colorTexto">';
        html += opciones.contenido;
        html += '            </div>';
        html += '            <div class="smallBox-colorIcon">';
        html += '                <i class="fa ' + opciones.fa + ' fa-2x"> </i>';
        html += '            </div>';
        html += '        </div>';
        html += '        <div class="smallBox-sombra"> </div>';
        html += '    </div>';
        html += '</div>';

        //  -----  Añadimos al HTML  -----
        $("body").append(html);

        //  -----  Animamos la Entrada  -----
        animar_entrada();

        //  -----  Se tarda un Tiempo para Animar la Salida  -----
        setTimeout( function() {
            animar_salida();
        }, opciones.timeout);

    };


    //  **********  Definición de FUNCIONES  **********

    //  -----  Función que Anima la Entrada  -----
    function animar_entrada() {

        //  -----  Referencias al HTML  -----
        const $smallBox = $(".smallBox-contenedor");

        //  ----------  Animación  -----
        const tl = gsap.timeline();
        tl.from($smallBox, 1.3, { x: "+= 100px", opacity: 0, ease: Bounce.easeOut })
          .from($smallBox, 1.3, { opacity: 1 }, "-=1.3");

    }


    //  -----  Función que Anima la Salida  -----
    function animar_salida() {
        
        //  -----  Referencias al HTML  -----
        const $smallBox = $(".smallBox-contenedor");

        //  ----------  Animación  -----
        let tl = gsap.timeline();
        tl.to($smallBox, 2, { x: "+= 100px" })
          .to($smallBox, 2, { opacity: 0, onComplete: remover_smallbox }, "-=2");
        
    }


    //  -----  Función que Elimina la Caja en Memoria  -----  
    function remover_smallbox() {
        $(".smallBox-contenedor").remove();
    }


})();