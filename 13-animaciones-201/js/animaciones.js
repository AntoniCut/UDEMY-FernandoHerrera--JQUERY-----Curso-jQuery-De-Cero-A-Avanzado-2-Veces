//  ******************************************
//  **********  /js/animaciones.js  **********
//  ******************************************

(function () {

	//  **********  Documento Cargado  **********  -->
	console.warn("Documento Cargado!!!");

	//  **********  Referencias al HTML  **********
	const $cajaRoja = $(".cajaRoja");

	//  **********  al pulsar el boton 'tamaño'  **********
	$("#botTamano").on('click', function () {

		$cajaRoja
			
			.animate({
				width: "+=100px",
				height: "+=100px"
			}, function () {
				console.log("Termino la animacion del tamaño");
			})
			
			.animate({
				top: "-=10px",
			}, function () {
				$(this)
				.css({
					backgroundColor: "green"
				})
				.animate({
					opacity: 0.3
				}, 1500)
				.animate({
					opacity: 1
				}, 1500, function() {
					$(this).remove()
				})
								
			})
				
	});


})();
