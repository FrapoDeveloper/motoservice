<?php 
include('../model/database_connect.php');

$driver_id_b =  $_POST['enrollment_driver']; //variables name
$driver_name_b =  $_POST['name_driver'];
$driver_dni_b =  $_POST['dni_driver'];
$driver_phone_b = $_POST['phone_driver'];
$driver_address_d = $_POST['address_driver'];

$query = "UPDATE choferes SET nombre_chofer=:name_d,
dni_chofer = :dni_d, telefono_chofer = :phone_d, dirección_chofer = :addr_d 
WHERE matricula_chofer = :id_d";

$statement  = $conn->prepare($query);
$statement->execute(array(
':id_d' => $driver_id_b,
':name_d' => $driver_name_b,
':dni_d' => $driver_dni_b,
':phone_d' => $driver_phone_b,
':addr_d' => $driver_address_d,
));

if(!$statement){
    die("Query Failed");
}

echo "Tarea editada correctamente.";

?>