//  ***********************************
//  **********  /js/ajax.js  **********
//  ***********************************


(function () {

    //  **********  Una vez Cargado el Documento  **********
    console.warn('Documento Cargado!!!  ----- ', 'jQuery version:', $.fn.jquery);

    //  ----------  Petición AJAX  ----------
    $.ajax({
        type: "GET",
        url: "https://reqres.in/api/users?page=2",
        dataType: "json"
    })
        .done(function (response) {

            console.log("Hecho correcto!");
            console.log(response);

            const personas = response.data;

            for (let i = 0; i < personas.length; i++) {

                let persona = personas[i];

                let html = '';
                html += '<tr>';
                html += '    <td><img src="' + persona.avatar + '" class="img-thumbnail" alt="Avatar"></td>';
                html += '    <td>' + persona.first_name + '</td>';
                html += '    <td>' + persona.last_name + '</td>';
                html += '    <td>' + persona.email + '</td>';
                html += '</tr>';

                $(".table").append(html);
            }

            /*
            // Muestro los datos de la persona cuyo id = 5.
            const persona = response.data[5];
            console.log(persona);

            $("#picAvatar").attr("src", persona.avatar);
            $("#txtNombre").val(persona.first_name);
            $("#txtApellido").val(persona.last_name);
            $("#emailEmail").val(persona.email);
            */


        })
        .fail(function () {
            console.log("Fallo!");
        })
        .always(function () {
            console.log("Completo!");
        });



})();