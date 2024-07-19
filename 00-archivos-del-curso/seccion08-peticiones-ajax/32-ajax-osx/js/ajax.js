(function(){

	


	$.ajax({
		type: 'GET',
		url : 'php/servicios/get.alumnosBeta.php',
		dataType: 'json'
	})
	.done(function( data ){
		
		console.log("Correcto!");

		console.log( data ); // Se imprime en consola la api


	})
	.fail(function(){
		console.log("Fallo!");
	})
	.always(function(){
		console.log("Completo!");
	});








})();