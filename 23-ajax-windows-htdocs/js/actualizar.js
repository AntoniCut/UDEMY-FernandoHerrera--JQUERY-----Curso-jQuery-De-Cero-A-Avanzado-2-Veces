//  *****************************************
//  **********  /js/actualizar.js  **********
//  *****************************************


(function () {

    //  -----   Asegúrate de que jQuery está cargado  -----
    if (typeof jQuery === 'undefined') {
        console.error('jQuery no está cargado.');
        return;
    }


    function $_GET(param) {

        let vars = {};
        window.location.href.replace(location.hash, '').replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function (m, key, value) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if (param) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    }


    //  -----  Una vez Cargado el Documento  -----
    $(document).ready(function () {

        console.warn('Documento Cargado!!!  ----- ', 'jQuery version:', $.fn.jquery);

        //  -----  Obtenemos el ID  -----
        const id = $_GET('id');



        // -----  Petición AJAX  -----
        $.ajax({

            url: 'php/servicios/get.alumnos.php?id=' + id,
            type: 'POST',
            dataType: 'json',
            //data: dataSerializada
        })

            .done(function (data) {

                console.log("Correcto!");
                console.log(data); // Imprime en consola la respuesta de la API     

                //  -----  Mostrar en la Tabla la Información  -----
                const alumno = data.alumnos[0];
                $("#txtid").val(alumno.id);
                $("#txtnombre").val(alumno.nombre);
                $("#cmbestado").val(alumno.estado);

            });


        //  ----------  ACTUALIZAR Datos  ----------

        $("#frmData").on("submit", function (e) {
            
            e.preventDefault();  // Previene que el formulario se envíe de manera convencional
            
            //  -----  Obtener los datos del formulario con serialize()  -----
            const formulario = $(this);
            const dataSerializada = formulario.serialize();
            console.log('Datos serializados:', dataSerializada);
            
            // -----  Petición AJAX  -----
            $.ajax({
                url: 'php/servicios/post.guardaralumno.php',
                type: 'POST',
                dataType: 'json',
                data: dataSerializada
            })
                .done(function (data) {
                    console.log("Correcto!");
                    console.log(data); // Imprime en consola la respuesta de la API
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("Fallo!", textStatus, errorThrown);
                    console.log(jqXHR.responseText);
                });
        });

    })

})();



