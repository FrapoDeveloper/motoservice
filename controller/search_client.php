<?php 
include('../model/database_connect.php');
$search_b = $_POST['search_f'];
if(!empty($search_b)){

    $query = "SELECT fechayhora_cliente,telefono_cliente,nombre_cliente,
    nombre_chofer,importe_cliente FROM clientes INNER JOIN choferes 
    ON clientes.matricula_chofer_f=choferes.matricula_chofer WHERE nombre_cliente
    LIKE '$search_b%' ";
    $statement = $conn->prepare($query);
    $resultado= $statement->execute();
   
    $json = array();
    while($row = $statement->fetch()){
        $json[] = array(
        'date_client_b'=> $row['fechayhora_cliente'],
        'phone_client_b'=> $row['telefono_cliente'],
        'name_client_b'=> $row['nombre_cliente'],
        'name_driver_b'=> $row['nombre_chofer'],
        'import_client_b'=> $row['importe_cliente']
        );
     
    }
    $jsonString = json_encode($json);
    echo $jsonString;


}

?>