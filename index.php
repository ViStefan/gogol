<?php
  session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <title>Вход</title>
  <meta charset="utf-8">
  <style type="text/css">
    body {
      width: 600px;
      margin: 200px auto;
      text-align: center;
      font-size: 2em;
      font-family: sans-serif;
    }

    #name {
      width: 100%;
      font-size: 2em;
    }

    #login {
      margin-top: 50px;
    }
  </style>
  <script type="text/javascript">
    function login() {
      localStorage.setItem("sex", document.getElementById('man').checked);
      localStorage.setItem("name", document.getElementById('name').value);
      console.log(document.getElementById('name').value);
      location.href = 'chat.html';
    }
  </script>
</head>
<body>
  <input type="hidden" name="action" value="login">
  <input type="text" name="name" placeholder="Имя" id="name"><br>
  <label><input type="radio" name="sex" value="man" id="man" checked> Дяденька</label>
  <label><input type="radio" name="sex" value="woman"> Тётенька</label><br>
  <input type="button" value="Войти" onclick="login();">
</body>
</html>