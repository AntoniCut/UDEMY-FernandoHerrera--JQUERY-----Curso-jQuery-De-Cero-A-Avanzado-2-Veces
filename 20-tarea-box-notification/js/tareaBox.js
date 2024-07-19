//  **************************************
//  **********  js/tareaBox.js  **********
//  **************************************

(function () {

    //  -----  Documento Cargado  -----
    console.warn('Documento Cargado!!!');

    let tbContador = 0;


    //  **********  Funciondel Plugin  -----  tareaBox()  **********

    $.tareaBox = function (opciones) {

        opciones = $.extend({
            img: undefined,
            titulo: undefined,
            subtitulo: undefined,
            color: "#58167d",
            fa: "fa-comments-o",
            timeout: 3500
        }, opciones);


        //  -----  Creamos un ID único para cada Notificacion y asi tener un mejor control del objeto.
        tbContador++;
        const tbID = "tbID-" + tbContador;      //  Ejemplo:  tbID-1, tbID-2, ..., etc.

        let html = '';

        //  -----  Creare un 'div' especial llamado 'top-right' donde insertare 
        //         las Notificaciones para que se apilen una abajo de otra...
        //         Pero este 'div' solo debe crearse una vez  -------------
        console.log($(".tb-topright").length);

        if ($(".tb-topright").length === 0) {

            html += '<div class="tb-topright"> </div>';
            $("body").append(html);

        }

        console.log($(".tb-topright").length);


        //  -----  Creamos el HTML Dinamicamente, que es el <div class="tb-body"> </div>  -----  

        html = '';
        html += '<div id="' + tbID + '" class="tb-body" style="background-color:' + opciones.color + '">'; // Aqui debemos colocar el ID y el color.

        //  -----  Si viene el parametro de la imagen Crearlo  -----
        if (opciones.img != undefined) html += '<div class="tb-foto"> <img src="'+ opciones.img +'"> </div>';

        //  -----  Creamos el resto del HTML  -----
        html += '    <div class="tb-contenido" align="right">';
        html += '        <span>';
        html += '            <span class="tb-titulo"> ' + opciones.titulo + ' </span>';
        html += '            <br> ' + opciones.subtitulo;
        html += '        </span>';
        html += '    </div>';
        html += '    <div class="tb-icon">';
        html += '        <i class="fa ' + opciones.fa + '"></i>';
        html += '    </div>';
        html += '</div>';

        //  -----  Insertaremos la Notificación, pero dentro del
        //         'div' donde van las notificaciones.
        $(".tb-topright").append(html);

        //  -----  Llama a la Entrada, pero solo para la Notificación con el ID que cree  -----
        animar_entrada(tbID);

        //  -----  Al pasar un Tiempo 'Animamos la salida'  -----
        setTimeout(function () {
            animar_salida(tbID);
        }, opciones.timeout);

    };


    //  **********  Definicion de FUNCIONES  **********

    //  -----------  función 'Animar Entrada'  ----------
    function animar_entrada(tbID) {

        //  -----  Referencia al HTML para crear una Notificación de ID '#tbID'  -----
        const $tareaBox = $("#" + tbID);

        //  -----  Creamos una 'linea de tiempo' para la animacion con GSAP  -----
        const tl = gsap.timeline();
        tl.from($tareaBox, 1, { x: "+= 100px", ease: Bounce.easeOut })
            .from($tareaBox, 1, { opacity: 0 }, "-=1");

    }


    //  -----------  función 'Animar Salida'  ----------
    function animar_salida(tbID) {

        //  -----  Referencia al HTML para crear una Notificación de ID '#tbID'  -----
        const $tareaBox = $("#" + tbID);

        //  -----  Creamos una 'linea de tiempo' para la animacion con GSAP  -----
        const tl = gsap.timeline();
        tl.to($tareaBox, 1, { x: "+= 200px" })
            .to($tareaBox, 1, { opacity: 0, onComplete: remover_contenido, onCompleteParams: [tbID] }, "-=1")
            .to($tareaBox, 0.8, { height: "0px", marginTop: "0px", onComplete: remover_notificacion, onCompleteParams: [tbID] });

    }


    //  -----------  función 'Remover Contenido'  ----------
    function remover_contenido(tbID) {

        //  -----  Eliminamos todos los 'div' internos  -----
        $("#" + tbID).find('div').remove();

    }
    
    
    //  -----------  función 'Remover Notificación'  ----------
    function remover_notificacion(tbID) {
        //  -----  Eliminamos la Animación cuyo ID es "#tbID"  -----
        $("#" + tbID).remove();
    }


})();