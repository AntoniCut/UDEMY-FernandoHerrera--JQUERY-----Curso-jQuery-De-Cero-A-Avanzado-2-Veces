//  *****************************************
//  **********  /src/slideShow.js  **********
//  *****************************************


(function () {

	//  **********  Documento Cargado  **********
	console.warn('Documento Cargado!!!');


	// *****  definicion de variables  *****
	let actual = 0;
	const ancho = 600;
	let intervalo = null;
	let intervaloActivo = true;

	//  *****  Referencias al HTML  *****
	const $slideshow = $(".slideShow ul");
	const slides = $slideshow.find("li").length;
	const $puntos = $(".slideShowButtons");
	const $botonTime = $(".slideButtonTimer");

	//  encontramos el punto 0 y le cambiamos el color.
	$puntos.find("div").eq(0).css({
		backgroundColor: "#58167d"
	});

	
	//  **********  función que Inicia el Intervalo  **********
	function iniciarIntervalo() {
		intervalo = setInterval(function () {
			mover("sig", false);
			//mover_por_punto(actual, true);
		}, 1500);
		intervaloActivo = true;
		$botonTime.hide();
		
	}


	//  **********  función que Detiene el Intervalo  **********
	function detenerIntervalo() {
		clearInterval(intervalo);
		intervaloActivo = false;
		$botonTime.show();
	}


	//  **********  función que mueve las diapositivas con el boton 'anterior' y 'siguiente'  **********
	function mover(dir, click) {

		(dir === "sig") ? actual-- : actual++;

		if (actual > 0) actual = (slides - 1) * -1;
		else if (actual <= (slides * -1)) actual = 0;

		mover_por_punto(actual, click);
	}



	//  **********  función que mueve las diapositivas con los botones redondos  **********
	function mover_por_punto(actual, click) {

		//if (click) clearInterval(intervalo);
		if (click) detenerIntervalo();


		const margen = actual * ancho;

		const idx = actual * -1;
		const $puntoActual = $puntos.find("div").eq(idx);
		const $demasPuntos = $puntos.find("div").not($puntoActual);

		//  -----  animación  -----
		var tl = new TimelineMax();
		tl.to($slideshow, 1.2, { marginLeft: margen, ease: Elastic.easeOut.config(1, 0.75) })	//  animar diapositivas.
			.to($puntoActual, 0.5, { backgroundColor: "#58167d" }, "-=1.2")						//  pinta el punto actual color activo.
			.to($demasPuntos, 0.5, { backgroundColor: "#a1a1a1" }, "-=1.2")						//  pinta los demas puntos color inactivo.

	}


	//  **********  al hacer click en uno de los botones redondos  **********
	$(".slideButton").on("click", function () {

		let idx = $(this).data('idx');
		idx = idx * -1;
		console.log(idx);
		mover_por_punto(idx, true);

	});


	//  **********  al hacer click en el botón de 'Timer'  **********
	$botonTime.on("click", function () {
		iniciarIntervalo();
	});




	//  *****  Inicia el intervalo al cargar el documento  *****
	iniciarIntervalo();

	

})();