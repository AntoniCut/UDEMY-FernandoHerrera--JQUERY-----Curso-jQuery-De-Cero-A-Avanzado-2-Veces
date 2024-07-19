<?php

//  *******************************************************
//  **********  /php/servicios/post.alumnos.php  **********
//  *******************************************************

// Incluir la clase de base de datos
include_once("../classes/class.Database.php");

// Verificar que se recibieron los datos esperados
if (isset($_POST['txtnombre']) && isset($_POST['cmbestado'])) {
    $nombre = $_POST['txtnombre'];
    $estado = $_POST['cmbestado'];

    // Asegurarse de que los valores no están vacíos
    if (!empty($nombre) && !empty($estado)) {
        $sql = "INSERT INTO alumnos (nombre, estado) VALUES ('$nombre', '$estado')";
        $hecho = Database::ejecutar_idu($sql);

        if ($hecho) {
            $respuesta = json_encode(
                array(
                    'err' => false,
                    'mensaje' => "Creado Correctamente",
                )
            );
        } else {
            $respuesta = json_encode(
                array(
                    'err' => true,
                    'mensaje' => "Error al crear el registro",
                )
            );
        }
    } else {
        $respuesta = json_encode(
            array(
                'err' => true,
                'mensaje' => "Datos incompletos",
            )
        );
    }
} else {
    $respuesta = json_encode(
        array(
            'err' => true,
            'mensaje' => "No se recibieron los datos necesarios",
        )
    );
}

header('Content-Type: application/json');
echo $respuesta;

?>
