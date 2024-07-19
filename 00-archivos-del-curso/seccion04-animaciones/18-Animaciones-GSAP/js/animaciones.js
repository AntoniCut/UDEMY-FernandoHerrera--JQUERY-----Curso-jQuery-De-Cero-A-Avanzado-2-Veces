(function(){


	var $cajaRoja = $(".cajaRoja");

	function mover(dir){

		$cajaRoja.clearQueue();

		switch( dir ){

			case "arr":
				$cajaRoja.animate({
					top: "-=100",
				});
			break;

			case "aba":
				$cajaRoja.animate({
					top: "+=100",
				});
			break;

			case "izq":
				$cajaRoja.animate({
					left: "-=100",
				});
			break;

			case "der":
				$cajaRoja.animate({
					left: "+=100",
				});
			break;


			default: 

				$cajaRoja.animate({
					top: "0px",
					left: "0"
				});

		}

	}

	// Funcion del keypress en la pagina, para moverlo con las teclas direccionales
	$(document).on("keypress",function(e){


		switch( e.keyCode ){
			case 119:
				mover("arr");
			break;
		
			case 115:
				mover("aba");
			break;

			case 100:
				mover("der");
			break;

			case 97:
				mover("izq");
			break;
		
			default:
				mover("res");
			break;
		}

	});

	// Funcion de los botones
	$("button").on('click', function() {
		
		var dir = $(this).data("dir");
		mover( dir );

	});


})();