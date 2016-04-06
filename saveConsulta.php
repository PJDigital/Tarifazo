<?php 

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$db = new PDO("sqlite:./consultaLuz.sqlite");

    $sql = "INSERT INTO consultas (ip, cia, ubicacion, consumo, consumoAnterior, esSoc ) VALUES ('". $_SERVER['REMOTE_ADDR'] . "', ' ".$_REQUEST['cia']."', '".$_REQUEST['ubicacion']."',".$_REQUEST['consumo'].",".$_REQUEST['consumoAnterior'].",'".$_REQUEST['esSoc']."');";
    
	$db->query($sql);
	echo "ok";
?>