<?php

  include('../config.php');
  include('../db.php');

  $data = json_decode(file_get_contents("php://input"));

  $id = $data->id;
  $name = $data->name;
  $email = $data->email;

  $conn->query("UPDATE users SET name='$name', email='$email' WHERE id=$id");
  echo json_encode(["message" => "user updated"]);