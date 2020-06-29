<?php
 include('../model/database_connect.php');
if(isset($_POST['id_driver_f'])){
    $id_driver_b = $_POST['id_driver_f'];
    $query = "SELECT * FROM choferes WHERE matricula_chofer = :id_driver";
    $statement  = $conn->prepare($query);
    $statement->execute(array(
    ':id_driver' => $id_driver_b
    ));

if(!$statement){
    die("Query Failed");
}
$json = array();
while($row = $statement->fetch()){
    $json[] = array(
        'key_driver_b' => $row['matricula_chofer'],
        'photo__driver_b' => $row['foto_chofer'],
        'enrollment_driver_b' => $row['matricula_chofer'],
        'name_driver_b' => $row['nombre_chofer'],
        'dni_driver_b'=>$row['dni_chofer'],
        'phone_driver_b'=> $row['telefono_chofer'],
        'addres_driver_b'=> $row['dirección_chofer']
    );
}

$jsonString = json_encode($json[0]);
echo $jsonString;

}


 
 
 ?>