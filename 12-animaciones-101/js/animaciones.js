//  ******************************************
//  **********  /js/animaciones.js  **********
//  ******************************************

(function () {

   //  **********  Referencias al HTML  **********
   const $cajaRoja = $(".cajaRoja");


   //  **********  Documento Cargado  **********  -->
   console.warn("Documento Cargado!!!");

   function mover(dir) {

      //$cajaRoja.clearQueue();    //  Para que no se acumulen las animaciones.

      switch (dir) {

         case "arr":
            $cajaRoja.animate({
               top: "-=50px"
            }, 200);
            break;

         case "aba":
            $cajaRoja.animate({
               top: "+=50px"
            }, 200);
            break;

         case "izq":
            $cajaRoja.animate({
               left: "-=50px"
            }, 200);
            break;

         case "der":
            $cajaRoja.animate({
               left: "+=50px"
            }, 200);
            break;

         case "res":
            $cajaRoja.animate({
               top: 0,
               left: 0
            }, 1000);

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


})();
