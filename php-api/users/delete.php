<?php

  include('../config.php');
  include('../db.php');

  $data = json_decode(file_get_contents("php://input"));

  $id = $data->id;

  $conn->query("DELETE FROM users WHERE id=$id");
  echo json_encode(["message" => "user deleted"]);