//  ******************************************
//  **********  /js/animaciones.js  **********
//  ******************************************


(function () {

   //  **********  Documento Cargado  **********  -->
   console.warn("Documento Cargado!!!");

   function mover(dir) {

      //  **********  Referencias al HTML  **********
      const $cajaRoja = $(".cajaRoja");
      const $cajaAzul = $(".cajaAzul");

      //  Para que no se acumulen las animaciones.
      $cajaRoja.clearQueue();

      //  **********  Creacion de un Timeline  **********
      const tl = gsap.timeline();
      //const tl = new TimelineMax();


      switch (dir) {

         case "arr":

            $cajaRoja.animate({
               top: "-=50px"
            }, 450);

            tl.to($cajaAzul, 0.45, { y: "-=50" });

            break;

         case "aba":

            $cajaRoja.animate({
               top: "+=50px"
            }, 450);

            tl.to($cajaAzul, 0.45, { y: "+=50" });

            break;

         case "izq":

            $cajaRoja.animate({
               left: "-=50px"
            }, 450);

            tl.to($cajaAzul, 0.45, { x: "-=50" });

            break;

         case "der":

            $cajaRoja.animate({
               left: "+=50px"
            }, 450);

            tl.to($cajaAzul, 0.45, { x: "+=50" });

            break;

         case "res":

            $cajaRoja.animate({
               top: 0,
               left: 0,
               width: "50px",
               height: "50px"
            }, 1000)
            .css({backgroundColor: "red"})

            tl.to($cajaAzul, 1, { 
               x: "0", 
               y: "0",
               width: "50px",
               height: "50px",
               backgroundColor: "blue" 
            });

      }
   }


   //  **********  Al pulsar uno de los botones  **********
   $("button").on('click', function () {

      const dir = $(this).data("dir");
      mover(dir);

   });


   //  **********  Al pulsar las teclas 'W', 'S', 'A', 'D' y 'barra espacio'  **********
   $(document).on('keypress', function (e) {

      const keyCode = e.keyCode;
      //console.log(keyCode);
      //alert(keyCode)

      switch (keyCode) {

         //  W
         case 119:
            mover("arr");
            break;

         //  S
         case 115:
            mover("aba");
            break;

         //  A
         case 97:
            mover("izq");
            break;

         //  D
         case 100:
            mover("der");
            break;
      }

   });



   //  **********  Al pulsar las teclas de direccion  **********
   $(document).on('keydown', function (e) {

      const keyCode = e.keyCode;

      //console.log(keyCode);
      //alert(keyCode)

      switch (keyCode) {

         //  ^
         case 38:
            mover("arr");
            break;

         //  ^invertido
         case 40:
            mover("aba");
            break;

         //  <-
         case 37:
            mover("izq");
            break;

         //  ->
         case 39:
            mover("der");
            break;
         //  barra espacio
         case 32:
            mover("res");
            break;
      }

   });


   //  **********  Ancho y Color  **********
   $("#botAncho").on('click', function () {

      //  **********  Referencias al HTML  **********
      const $cajaRoja = $(".cajaRoja");
      const $cajaAzul = $(".cajaAzul");

      //  Para que no se acumulen las animaciones.
      $cajaRoja.clearQueue();

      //  **********  Creacion de un Timeline  **********
      const tl = gsap.timeline();
      //const tl = new TimelineMax();

      $cajaRoja.animate({
         width:  "+=150",
         height: "+=150"
      }, 500);

      tl.to($cajaAzul, 0.5, {
         width:  "+=150",
         height: "+=150",
         backgroundColor: "red"
      }).to($cajaRoja, 0.3, {backgroundColor: "blue"}, "-=0.2");



   });





})();
