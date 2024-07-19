(function(){


	$.ajax({
		type: 'GET',
		url : 'http://www.json-generator.com/api/json/get/canYsishLm?indent=2',
		dataType: 'json'
	})
	.done(function( data ){
		console.log("Hecho Correcto!");

		var person = data;

		console.log( data );

		$("#picFoto").attr( "src" , data.picture );
		$("#txtNombre").val( data.name );
		$("#txtDireccion").val( data.address );
		$("#txtTelefono").val( data.phone );
		$("#txtGenero").val( data.gender );

	})
	.fail(function(){
		console.log("Fallo!");
	})
	.always(function(){
		console.log("Completo!");
	});


})();