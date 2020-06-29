<?php
 include('../model/database_connect.php');
if(isset($_POST['id_client_f'])){
    $id_client_b = $_POST['id_client_f'];
    $query = "DELETE FROM clientes WHERE clave_cliente = :id_client";
    $statement  = $conn->prepare($query);
$statement->execute(array(
  ':id_client' => $id_client_b
));

if(!$statement){
    die("Query Failed");
}

echo "Tarea borrada correctamente.";

}


 
 
 ?>