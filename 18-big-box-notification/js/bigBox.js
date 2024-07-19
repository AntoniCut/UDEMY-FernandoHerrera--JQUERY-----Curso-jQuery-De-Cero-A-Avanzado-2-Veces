//  *************************************
//  **********  /js/bigBox.js  **********
//  *************************************

(function () {

    //  **********  Documento Cargado  **********
    console.warn('Documento Cargado!!!');


    $.bigBox = function (opciones, callback) {

        opciones = $.extend({
            fa: "fa-thumb-o-up",
            titulo: undefined,
            contenido: undefined,
            boton: "Aceptar"
        }, opciones);


        //  ----------  Validaciones  ----------

        if (opciones.titulo === undefined) {
            alert('El Titulo es necesario');
            return;
        }

        if (opciones.contenido === undefined) {
            alert('El Contenido es necesario')
            return;
        }


        //  ----------  Construimos la caja de fondo y la caja bigBox ----------
        let contenido = '';
        contenido = '<div class="bigBox-Fondo"> </div>';
        contenido += '<div class="bigBox-contenedor" align="center">';
        contenido += '    <div class="bigBox-Cerrar"> <i class="fa fa-times"> </i> </div>';
        contenido += '    <div class="bigBox-Circulo"> <i class="fa ' + opciones.fa + ' fa-3x"> </i> </div>';
        contenido += '    <div class="bigBox-Contenido">';
        contenido += '        <span class="bigBox-Titulo"> ' + opciones.titulo + ' </span>';
        contenido += '        <span class="bigBox-Texto"> ' + opciones.contenido + ' </span>';
        contenido += '    </div>';
        contenido += '    <button class="bigBox-Boton"> ' + opciones.boton + ' </button>';
        contenido += '</div>';
        $("body").append(contenido);


        animar_entrada();   //  Anima la Entrada.


        //  ----------  EVENTOS  ----------

        //  -----  Función del Botón Cerrar  -----
        $(".bigBox-Cerrar").on("click", function () {

            animar_salida();        //  Anima la Salida.
            if (typeof callback == 'function')
                callback('boton-cerrar');
        });


        //  -----  Función del Botón Principal  -----
        $(".bigBox-Boton").on("click", function () {

            animar_salida();        //  Anima la Salida.
            if (typeof callback == 'function')
                callback('boton-principal');
        });


        //  ----------  Función que Anima la Entrada  -----
        function animar_entrada() {

            //  -----  Referencias al HTML  -----
            const $fondo = $(".bigBox-Fondo");
            const $bigBox = $(".bigBox-contenedor");

            
            //  -----  Calculos para las redimensiones  -----
            const anchoP = $(window).width();        //  Ancho de la Pantalla.
            const altoP = $(window).height();        //  Alto de la Pantalla.
            console.log({ anchoP, altoP })

            const anchoB = $bigBox.width();        //  Ancho del bigBox.
            const altoB = $bigBox.height();        //  Alto del bigBox.

            //  -----  Mostrar la Caja en el Centro de la Pantalla.
            $bigBox.css({
                top: (altoP / 2) - (altoB / 2),
                left: (anchoP / 2) - (anchoB / 2)
            });
            

            /*
            //  ancho y alto de la pantalla.
            let anchoP = $(window).width();
            let altoP = $(window).height();
            console.log(anchoP, altoP);
            //  ancho bigbox.
            let anchoB = $bigBox.width();
            let altoB = $bigBox.height();
            console.log(anchoB, altoB);
            //  mostrar la caja en el centro de la pantalla.
            $bigBox.css({
                top: (altoP / 2) - (altoB / 2),
                left: (anchoP / 2) - (anchoB / 2),
            });

            */

            //  -----  Mostramos cajas  -----
            $fondo.show();
            $bigBox.show();

            //  ----------  Realiza la Animacion  ---------- 
            let tl = gsap.timeline();
            tl.to($fondo, 0.5, { opacity: 0.3 })
                .to($bigBox, 0.5, { opacity: 1 }, "-=0.5")
                .from($bigBox, 0.8, { y: "-=20", ease: Bounce.easeOut }, "-=0.5");

        }


        //  ----------  Función que Anima la Salida  ----------
        function animar_salida() {

            //  -----  Referencias al HTML  -----
            const $fondo = $(".bigBox-Fondo");
            const $bigBox = $(".bigBox-contenedor");

            //  ----------  Realiza la Animacion  ---------- 
            let tl = gsap.timeline();
            tl.to($fondo, 0.3, { opacity: 0 })
                .to($bigBox, 0.3, { opacity: 0, onComplete: remover_bigbox }, "-=0.3");

        }


        //  ----------  Función que Elimina el bigBox  ----------
        function remover_bigbox() {

            //  -----  Referencias al HTML  -----
            const $fondo = $(".bigBox-Fondo");
            const $bigBox = $(".bigBox-contenedor");

            //  -----  Eliminamos el Fondo y el bigBox  -----
            $fondo.remove();
            $bigBox.remove();
        }

    }

})();