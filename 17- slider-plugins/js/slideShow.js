//  *****************************************
//  **********  /src/slideShow.js  **********
//  *****************************************


(function () {

	//  **********  Documento Cargado  **********
	console.warn('Documento Cargado!!!');


	//  **********  Definimos nuestro SlideShow  **********
	$.slideShow = function (opciones) {
		//  *****  Opciones  *****
		opciones = $.extend({
			divDestino: ".slideShow",
			intervalo: 1500,
			ancho: 600,
			velocidad: 1200,
			color: "#ba007c",
			slides: [],
		}, opciones);

		opciones.velocidad = opciones.velocidad / 1000;

		//  Validamos si hay slides.
		if (opciones.slides.length === 0) {
			alert("Los slides son necesarios");
			return;
		}

		// *****  Definición de variables  *****
		let actual = 0;
		const ancho = opciones.ancho;
		let intervalo = null;
		const slides = opciones.slides.length;


		// *****  Creación Dinámica del slideShow (Diapositivas)  *****
		let contenido = `
            <ul>
                ${opciones.slides.map(slide => `<li><img src="${slide}"></li>`).join('')}
            </ul>
        `;
		$(opciones.divDestino).html(contenido);  //  Añadimos al HTML.


		// *****  Creación Dinamica de los Botones  *****
		const botonesContenido = opciones.slides.map((slide, i) => {
			return `<div data-idx="${i}" class="slideButton"> </div>`;
		}).join('');

		const contenidoFinal = `${botonesContenido}<div data-idx="timer" class="slideButtonTimer"> Timer </div>`;
		$('.slideShowButtons').html(contenidoFinal);		//  Añadimos al HTML.


		//  ----- Referencias al HTML  -----
		const $slideshow = $(opciones.divDestino + " ul");
		const $puntos = $(".slideShowButtons");
		const $botonTimer = $(".slideButtonTimer");


		//  -----   Ocultamos el botón Timer al inicio  -----
		$botonTimer.hide();


		// Cambiamos el color del primer punto
		$puntos.find("div").eq(0).css({
			backgroundColor: opciones.color
		});


		//  **********  DEFINICION DE FUNCIONES  **********

		//  **********  Función que Inicia el Intervalo  **********
		function iniciarIntervalo() {
			$botonTimer.hide();
			intervalo = setInterval(function () {
				mover("sig", false);
			}, opciones.intervalo);
		}


		// **********  Función que Detiene el Intervalo  **********
		function detenerIntervalo() {
			clearInterval(intervalo);
			$botonTimer.show();
		}


		// **********  Función que Mueve las Diapositivas con el Botón 'anterior' y 'siguiente'  **********
		function mover(dir, click) {
			(dir === "sig") ? actual-- : actual++;
			if (actual > 0) actual = (slides - 1) * -1;
			else if (actual <= (slides * -1)) actual = 0;
			mover_por_punto(actual, click);
		}


		// **********  Función que Mueve las Diapositivas con los Botones Redondos  **********
		function mover_por_punto(actual, click) {
			if (click) detenerIntervalo();
			const margen = actual * ancho;
			const idx = actual * -1;
			const $puntoActual = $puntos.find("div").eq(idx);
			const $demasPuntos = $puntos.find("div").not($puntoActual);

			// Animación
			var tl = new TimelineMax();
			tl.to($slideshow, opciones.velocidad, { marginLeft: margen, ease: Elastic.easeOut.config(1, 0.75) })
				.to($puntoActual, 0.5, { backgroundColor: opciones.color }, "-=1.2")
				.to($demasPuntos, 0.5, { backgroundColor: "#a1a1a1" }, "-=1.2");
		}


		// **********  EVENTOS:  Al Hacer Click en uno de los Botones Redondos  **********
		$puntos.on("click", ".slideButton, .slideButtonTimer", function () {
			let idx = $(this).data('idx');
			//alert(idx); // Añadido para depuración
			if (idx === "timer") {
				iniciarIntervalo();
			} else {
				idx = idx * -1;
				mover_por_punto(idx, true);
			}
		});


		// *****  Inicia el intervalo al cargar el documento  *****
		iniciarIntervalo();
	}

})();

