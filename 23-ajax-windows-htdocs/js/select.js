//  *************************************
//  **********  /js/select.js  **********
//  *************************************


(function () {

    //  ----- Asegúrate de que jQuery está cargado  -----
    if (typeof jQuery === 'undefined') {
        console.error('jQuery no está cargado.');
        return;
    }

    // -----  Una vez Cargado el Documento  -----
    $(document).ready(function () {

        console.warn('Documento Cargado!!!  ----- ', 'jQuery version:', $.fn.jquery);

        // -----  Petición AJAX  -----
        $.ajax({
            url: 'php/servicios/get.alumnos.php',
            type: 'POST',
            dataType: 'json',
            //data: dataSerializada
        })
            .done(function (data) {

                console.log("Correcto!");
                console.log(data); // Imprime en consola la respuesta de la API

                if (data.error) {

                    alert('Algo Raro Paso!!!');
                    return;
                }
                //  -----  Creamos filas dinamicamente en cada iteración  -----
                data.alumnos.forEach(function (alumno, index) {

                    let content = "";

                    content += '<tr id="fila'+alumno.id+'">';
                    content += '    <td>' + alumno.id + '</td>';
                    content += '    <td>' + alumno.nombre + '</td>';
                    content += '    <td>' + alumno.estado + '</td>';
                    content += '    <td class="text-center">';
                    content += '        <a href="actualizar.html?id=' + alumno.id + '" class="btn btn-primary"> <i class="fa fa-edit"> </i> </a>';
                    content += '    </td>';
                    content += '    <td class="text-center">';
                    content += '        <a href="" data-nombre="' + alumno.nombre + '" data-id="' + alumno.id + '" class="btn btn-danger botEliminar"> <i class="fa fa-trash-o"> </i> </a>';
                    content += '    </td>';
                    content += '</tr>';

                    $("#tblRegistros").append(content);

                });

            })

            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Fallo!", textStatus, errorThrown);
                console.log(jqXHR.responseText);
            });

    });


    //  -----  Al pulsar en el Boton Eliminar  -----
    $("body").on("click", ".botEliminar", function (e) {

        e.preventDefault();

        const nombre = $(this).data("nombre");

        const id = $(this).data('id');
        console.log(id);

        //  -----  Codigo del Plugins SweetAlert2  -----
        
        Swal.fire({
            title: '¿Estás Seguro?',
            text: '¿De querer borrar a: ' + nombre + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Sí, Bórralo!',
            cancelButtonText: 'Cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                borrarRegistro(id);
            }
        });
    
    });


    //  -----  Función que borra el registro  -----
    function borrarRegistro(id) {

        //  -----  Cuando estemos seguros que deseamos borrar el registro  -----

        // -----  Petición AJAX  -----
        $.ajax({
            url: 'php/servicios/post.eliminaralumno.php?id=' + id,
            type: 'POST',
            dataType: 'json',
            //data: dataSerializada
        })
            .done(function (data) {

                console.log("Correcto!");
                console.log(data); // Imprime en consola la respuesta de la API     

                //  -----  Actualiza la Vista de la Tabla eliminando la fila de la tablas  -----
                $("#fila"+id).remove();

                //swal("Borrado!", "El registro ha sido eliminado correctamente!!!, 'success'");
                Swal.fire('¡Borrado!', 'El registro ha sido eliminado correctamente!!!.', 'success');
                console.log("Borrado!", "El registro ha sido eliminado correctamente!!!");

            });
    }

})();



