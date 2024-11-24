<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'] ?? '';
    $senha = $_POST['senha'] ?? '';

    // Simula usuários cadastrados
    $usuarios = [
        'admin' => '123456',
        'user' => 'senha123'
    ];

    if (isset($usuarios[$login]) && $usuarios[$login] === $senha) {
        // Login bem-sucedido
        $_SESSION['usuario'] = $login;
        header('Location: index.html'); // Redireciona para a área logada
        exit;
    } else {
        // Login ou senha incorretos
        echo "
            <script>
                alert('Login ou senha incorretos!');
                window.location.href = 'login.html';
            </script>
        ";
        exit;
    }
}



