//  ***************************************
//  **********  js/slideShow.js  **********
//  ***************************************


(function () {

    //  **********  Documento Cargado  **********  -->
    console.warn("Documento Cargado!!!");

    let actual = 0;
    const ancho = 600;
    let intervalo = null;
    let intervaloActivo = true;

    //  **********  Referencias al HTML  **********
    const $slideShow = $(".slideShow ul"); // Referencia al HTML del div slideShow.
    const $botones = $(".botSlide").not('[data-mov="time"]'); // Botones Anterior y Siguiente
    const $botonTime = $('[data-mov="time"]'); // Botón Timer

    const slides = $slideShow.find("li").length; // nº de 'imagenes' que tenemos o 'li'
    //console.log(slides);


    //  **********  función que Inicia el Intervalo  **********
    function iniciarIntervalo() {
        intervalo = setInterval(function () {
            mover("sig", false);
        }, 1500);
        intervaloActivo = true;
        $botonTime.prop("disabled", true).addClass("disabled");
        $botones.prop("disabled", false).removeClass("disabled");
    }


    //  **********  función que Detiene el Intervalo  **********
    function detenerIntervalo() {
        clearInterval(intervalo);
        intervaloActivo = false;
        $botonTime.prop("disabled", false).removeClass("disabled");
    }


    //  **********  función para mover las diapositivas  **********
    function mover(dir, click) {
        if (click) {
            detenerIntervalo();
        }

        (dir === "sig") ? actual-- : actual++;

        if (actual > 0) actual = (slides - 1) * -1;
        else if (actual <= (slides * - 1)) actual = 0;

        const margen = actual * ancho;

        /*
        $slideShow.animate({
            marginLeft: margen
        }, 450);
        */

        //  -----  utilizando la libreria 'TwenMax'  -----
        const tl = new TimelineMax();
        tl.to($slideShow, 1.2, {
            marginLeft: margen,
            //ease: Bounce.easeOut
            ease: Elastic.easeOut.config(1, 0.75)
            //ease: SteppedEase.config(12)
        });

    }


    //  **********  al pulsar en los botones  **********
    $(".botSlide").on("click", function () {
        const dir = $(this).data("mov");

        if (dir === "time") {
            if (!intervaloActivo) {
                iniciarIntervalo();
            }
        } else {
            mover(dir, true);
        }
    });


    //  **********  Inicia el intervalo al cargar la página  ***********
    iniciarIntervalo();


})();
