<?php 

if($_POST) {

	$pdo = new PDO("mysql:host=localhost;dbname=ajax","root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$request = "INSERT INTO users (fistname, lastname, date_naiss, poste) VALUES (:firstname, :lastname, :date_naiss, :poste)";

	$prep = $pdo->prepare($request);

	$prep->bindValue(':firstname', $_POST['prenom'], PDO::PARAM_STR);
	$prep->bindValue(':lastname', $_POST['nom'], PDO::PARAM_STR);
	$prep->bindValue(':date_naiss', $_POST['dateNaissance'], PDO::PARAM_STR);
	$prep->bindValue(':poste', $_POST['poste'], PDO::PARAM_STR);

	$prep->execute();
}

?>