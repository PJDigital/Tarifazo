<?php 
	
	try{
		$mailTo = "denuncias@quetarifatengo.com.ar";
		$subject = "#TARIFAZO Denuncia a Defensa al Consumidor";
		$medidor = isset($_POST["medidor"])?$_POST["medidor"]:"";
		$observaciones = isset($_POST["observaciones"])?$_POST["observaciones"]:"";
		$cabeceras = 'From: ' . $_POST["email"] . "\r\n" .
		'Cc: ' . $_POST["email"] . "\r\n" . 
	    'Reply-To: ' . $_POST["email"] . "\r\n".
	    "MIME-Version: 1.0" . "\r\n".
	    "Content-type:text/html;charset=UTF-8" . "\r\n";	

	    $mensaje =  "<h4>Denuncia a Defensa al Consumidor</h4>" .
	    			"<b>Cuenta</b>: " . $_POST["cuenta"].'<br />'.
	                "<b>Medidor</b>: " . $medidor .'<br />'.
                    "<b>Nombre y Apellido</b>:" . $_POST["nombre"].'<br />'.   
            		"<b>Email de Contacto</b>: " . $_POST["email"].'<br />'.
		    		"<b>Telefono de Contacto</b>:". $_POST["telefono"].'<br />'.
              		"<b>Observaciones</b>'<br />" . $observaciones;



		mail( $mailTo,$subject,$mensaje,$cabeceras);
          
        $db = new PDO("sqlite:./consultaLuz.sqlite");
  		$sql = "INSERT INTO envios (ip,cuenta,medidor,nombre,email,telefono,observaciones) VALUES ('". $_SERVER['REMOTE_ADDR'] . 
  		       "','" . $_POST["cuenta"] ."','" . $medidor ."','" . $_POST["nombre"]."','" . $_POST["email"].
  		       "','" . $_POST["email"]."','". $observaciones."');";
 
  		 $db->query($sql);

		echo "OK";
	}catch(Exception $e){

		echo "Error". e;
	};

