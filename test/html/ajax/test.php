<?php
	
$user = $_POST['user'];

header('Content-Type: text/plain');
echo 	'Hi ' . $user . '!';
	
?>