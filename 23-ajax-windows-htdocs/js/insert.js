//  *************************************
//  **********  /js/insert.js  **********
//  *************************************


(function () {
    
    //  -----  Asegúrate de que jQuery está cargado  -----
    if (typeof jQuery === 'undefined') {
        console.error('jQuery no está cargado.');
        return;
    }

    //  -----  Una vez Cargado el Documento  -----
    $(document).ready(function() {
        
        console.warn('Documento Cargado!!!  ----- ', 'jQuery version:', $.fn.jquery);

        $("#frmData").on("submit", function (e) {
            e.preventDefault();  // Previene que el formulario se envíe de manera convencional

            //  -----  Obtener los datos del formulario con serialize()  -----
            const formulario = $(this);
            const dataSerializada = formulario.serialize();
            console.log('Datos serializados:', dataSerializada);

            // -----  Petición AJAX  -----
            $.ajax({
                url: 'php/servicios/post.alumnos.php',
                type: 'POST',
                dataType: 'json',
                data: dataSerializada
            })
            .done(function (data) {
                console.log("Correcto!");
                console.log(data); // Imprime en consola la respuesta de la API
                                
                 //  -----  Dejar el input de nombre vacío y con el foco  -----
                 $("#idNombre").val("").focus();

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Fallo!", textStatus, errorThrown);
                console.log(jqXHR.responseText);
            });
        });
    });
})();


