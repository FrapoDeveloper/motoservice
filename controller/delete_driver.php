<?php
 include('../model/database_connect.php');
if(isset($_POST['id_driver_f'])){
    $id_driver_b = $_POST['id_driver_f'];
    $query = "DELETE FROM choferes WHERE matricula_chofer = :id_driver";
    $statement  = $conn->prepare($query);
    $statement->execute(array(
    ':id_driver' => $id_driver_b
    ));

if(!$statement){
    die("Query Failed");
}

echo "Tarea borrada correctamente.";

}


 
 
 ?>