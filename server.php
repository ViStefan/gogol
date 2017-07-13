<?php
  header('Content-Type: text/json');
  header('Cache-Control: no-cache, must-revalidate');

  session_start();

  if ($_POST['action'] == 'send') {
    $file = fopen('chat.txt', 'a');
    echo $file;
    $now = time();
    foreach ($_POST['message'] as $msg) {
      fwrite($file, $now.'$'.$msg."\n");
    }
    fclose($file);
    $_SESSION['last'] = $now;
  } else {
    $now = time();

    $result = [];

    if (isset($_SESSION['last'])) {
      $messages = file('chat.txt');
      foreach ($messages as $msg) {
        $msg = explode('$', $msg, 2);
        if ($msg[0] > $_SESSION['last']) {
          $result[] = $msg[1];
        }
      }
      echo json_encode($result);
    }
    $_SESSION['last'] = $now;
  }
?>