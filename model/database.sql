 CREATE TABLE choferes(
     matricula_chofer VARCHAR(100),
     nombre_chofer VARCHAR(100),
     dni_chofer DOUBLE,
     telefono_chofer VARCHAR(100),
     dirección_chofer VARCHAR(100),
     foto_chofer VARCHAR(100), 
     CONSTRAINT pk_chofer PRIMARY KEY(matricula_chofer)
)
 CREATE TABLE clientes(
     clave_cliente INT NOT NULL AUTO_INCREMENT, 
     matricula_chofer_f VARCHAR(100),
     nombre_cliente VARCHAR(100), 
     telefono_cliente VARCHAR(100), 
     coordenadas_cliente VARCHAR(100), 
     fechayhora_cliente TIMESTAMP DEFAULT
     CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
     CONSTRAINT pk_cliente PRIMARY KEY(clave_cliente),
     CONSTRAINT fk_chofer FOREIGN KEY(matricula_chofer_f)
     REFERENCES choferes(matricula_chofer)
 )

CREATE TABLE login_user(
name_user VARCHAR(50),
password_user VARCHAR(50)
)

 SELECT nombre_cliente,nombre_chofer FROM clientes 
 INNER JOIN choferes ON clientes.matricula_chofer_f=choferes.matricula_chofer 