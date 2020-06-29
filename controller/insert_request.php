<?php 
include('../model/database_connect.php');

$phone_user = $_POST['phone_user'];
$name_user = $_POST['name_user'];
$licence_driver =$_POST['licence_driver'];
$coordinates_user =$_POST['coordinates_user'];

$query = "INSERT INTO clientes (clave_cliente, matricula_chofer_f,
 nombre_cliente,telefono_cliente,coordenadas_cliente, 
 fechayhora_cliente) VALUES(null,:licence_driver,:name_user,:phone_user,
 :coordinates_user, null)";

  $statement  = $conn->prepare($query);
  $statement->execute(array(
    ':licence_driver' => $licence_driver,
    ':name_user' =>$name_user,
    ':phone_user' =>$phone_user,
    ':coordinates_user' =>$coordinates_user
));
$result= $statement->fetch();
if($row = $statement->fetch(PDO::FETCH_ASSOC)){
  echo json_encode($row,JSON_UNESCAPED_UNICODE);
}


?>