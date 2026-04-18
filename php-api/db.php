<?php

  $conn = new mysqli('localhost', 'root', '', 'react_crud');
  
  if($conn->connect_error) {
    die("connection Error" . $conn->connect_error);
  }
