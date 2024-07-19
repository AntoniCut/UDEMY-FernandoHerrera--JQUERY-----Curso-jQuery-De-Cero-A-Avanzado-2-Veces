//  ***************************************
//  **********  js/slideShow.js  **********
//  ***************************************


(function () {
    
    console.warn("Documento Cargado!!!");

    let actual = 0;
    const ancho = 600;
    
    //  variables para manejar el intervalo.
    let click = false;
    let intervalo = null;
    let intervaloActivo = false;

    const $slideShow = $(".slideShow ul"); // Referencia al HTML del div slideShow.

    const slides = $slideShow.find("li").length; // nº de 'imagenes' que tenemos o 'li'
    //console.log(slides);


    //  **********  función que inicia el intervalo  **********
    function iniciarIntervalo() {
        
        //$(".botonIntervalo").hide();

        intervalo = setInterval(function () {
            mover("sig");
        }, 1500);
        intervaloActivo = true;
    }

    //  **********  función que detiene el intervalo  **********
    function detenerIntervalo() {
        clearInterval(intervalo);
        intervaloActivo = false;
    }


    //  **********  Función para mover el Slider  **********
    function mover(dir, click) {
        if (click) {
            detenerIntervalo();
        }

        (dir === "sig") ? actual-- : actual++;

        if (actual > 0) actual = (slides - 1) * -1;
        else if (actual <= (slides * - 1)) actual = 0;

        const margen = actual * ancho;

        $slideShow.animate({
            marginLeft: margen
        }, 450);
    }


    //  **********  al pulsar en uno de los botones  **********
    $(".botSlide").on("click", function () {
        const dir = $(this).data("mov");

        if (dir === "time") {
            if (intervaloActivo) {
                detenerIntervalo();
            } else {
                
                iniciarIntervalo();
            }
        } else {
            mover(dir, true);
        }
    });


    //  **********   Inicia el intervalo al cargar la página  **********
    iniciarIntervalo();

})();





/*
(function () {

    //  **********  Documento Cargado  **********  -->
    console.warn("Documento Cargado!!!");

    let actual = 0;
    const ancho = 600;
    const click = false;

    const $slideShow = $(".slideShow ul");      //  Referencia al HTML del div slideShow.

    const slides = $slideShow.find("li").length;    //  nº de 'imagenes' que tenemos o 'li'
    //console.log(slides);

    //  intervalo de tiempo que mueve las diapositivas por intervalos.
    const intervalo = setInterval(function () {
        mover("sig");
    }, 1500);


    //  **********  Función para mover el Slider  **********
    function mover(dir, click) {

        //  si se pulsa algun boton ya no se mueve por intervalo de tiempo.
        if (click) {
            clearInterval(intervalo);
        }


        //  si la direccion es siguiente movemos ala izquierda las diapositivas, sino, a la derecha.
        (dir === "sig") ? actual-- : actual++;

        if (actual > 0) actual = (slides - 1) * -1;
        else if (actual <= (slides * - 1)) actual = 0;

        //console.log( actual )

        const margen = actual * ancho;

        //  movemos las diapositivas.
        $slideShow.animate({
            marginLeft: margen
        }, 450);


    }

    //  **********  al pulsar en uno de los botones  **********
    $(".botSlide").on("click", function () {

        const dir = $(this).data("mov");
        
        if( dir === "time") 
            mover(dir, false)
            
        
            $(document).ready(function () {
                console.log('volver a cargar el documento');
                mover(dir, false);
            });
            
        else mover(dir, true);
    });







})();

*/