<?php 
include('../model/database_connect.php');
//Consulta para ver los datos de clientes que realizaron el servicio
$query = "SELECT clave_cliente,fechayhora_cliente,telefono_cliente,nombre_cliente,nombre_chofer,importe_cliente FROM clientes 
INNER JOIN choferes ON clientes.matricula_chofer_f=choferes.matricula_chofer";
//preparamos la consulta
$statement = $conn->prepare($query);
//ejecutamos el statement
$resultado= $statement->execute();
//este array será para mandarlo al front
$json = array();
//rellenar el array object con los valores que obtengo de la base de datos
while($row = $statement->fetch()){
    $json[] = array(
    'key_client_b' => $row['clave_cliente'],
    'date_client_b'=> $row['fechayhora_cliente'],
    'phone_client_b'=> $row['telefono_cliente'],
    'name_client_b'=> $row['nombre_cliente'],
    'name_driver_b'=> $row['nombre_chofer'],
    'import_client_b'=> $row['importe_cliente']
    );
 
}
//mando al fronet convertido en string
$jsonString = json_encode($json);
echo $jsonString;

?>