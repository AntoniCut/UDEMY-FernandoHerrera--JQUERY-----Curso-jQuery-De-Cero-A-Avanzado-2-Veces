//  ***********************************
//  **********  /js/ajax.js  **********
//  ***********************************


(function () {

	//  **********  Una vez Cargado el Documento  **********
	console.warn('Documento Cargado!!!  ----- ', 'jQuery version:', $.fn.jquery);

	//var Latitude = 9.975941;
	//var Longitude = -84.007505;

	const Latitude = 38.1674852;
	const Longitude = -0.9629568;

	//const Latitude = 40.416906;
	//const Longitude = -3.7060583;


	$.ajax({
		type: 'GET',
		url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + Latitude + '&lon=' + Longitude + "&units=metric&appid=9f50a805aa0089a1edd1829a5db029f0",
		dataType: 'jsonp'
	})
		.done(function (data) {

			console.log("Correcto!");
			console.log(data); // Se imprime en consola la api

			mostrar_data(data);

		})
		.fail(function () {
			console.log("Fallo!");
		})
		.always(function () {
			console.log("Completo!");
		});


	//  ----------  Función para mostrar toda la data y dejar  ----------
	//  ----------  la petición AJAX mas limpia  ------------------------

	function mostrar_data(data) {

		const url = "img/" + data.weather[0].icon + ".png";
		$(".imgClima").attr('src', url);

		const temperatura = Math.round(data.main.temp);
		$(".lblTemperatura").html(temperatura + "&#176");

		$(".divLoading").fadeOut(200, function () {
			$(".divInfo").fadeIn(200);
		});

		const cityName = data.name;
		console.log(cityName);  // Salida: La Murada


		$(".lblCiudad").text( cityName );

	}

})();