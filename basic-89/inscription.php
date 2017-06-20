<?php 


/*sleep(15);*/
try {

	$pdo = new PDO("mysql:host=localhost;dbname=ajax","root","",array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
}

catch (PDOException $e) {
	echo "Message d'erreur : ".$e;
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {

	if(isset($_POST['id'])) {

		$request = "DELETE FROM users WHERE id = ".$_POST['id'];
		$pdo->query($request);

	}

	else {

	$request = "INSERT INTO users (fistname, lastname, date_naiss, poste) VALUES (:firstname, :lastname, :date_naiss, :poste)";

	$prep = $pdo->prepare($request);
	$prep->bindValue(':firstname', $_POST['prenom'], PDO::PARAM_STR);
	$prep->bindValue(':lastname', $_POST['nom'], PDO::PARAM_STR);
	$prep->bindValue(':date_naiss', $_POST['dateNaissance'], PDO::PARAM_STR);
	$prep->bindValue(':poste', $_POST['poste'], PDO::PARAM_STR);
	$prep->execute();

	}


}

else if($_SERVER['REQUEST_METHOD'] == 'GET'){

		if(empty($_GET)) {

			$request = "SELECT * FROM users";
			$result = $pdo->query($request);

		}

		else {

			$request = "SELECT * FROM users WHERE id = ".$_GET['id'];
			$result = $pdo->query($request);

		}

		echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));

}


?>