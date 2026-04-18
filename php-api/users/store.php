<?php

  include('../config.php');
  include('../db.php');

  $data = json_decode(file_get_contents("php://input"));

  $name = $data->name;
  $email = $data->email;

  $conn->query("INSERT INTO users(name, email) VALUES ('$name', '$email')");
  echo json_encode(["message" => "user created"]);