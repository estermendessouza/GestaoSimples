<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'] ?? '';
    $senha = $_POST['senha'] ?? '';

    // URL da API que retorna os usuários
    $apiUrl = 'https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/usuarios';

    // Faz a requisição à API
    $response = file_get_contents($apiUrl);
    $usuarios = json_decode($response, true);

    // Verifica se o nome e a senha correspondem a algum usuário
    $loginBemSucedido = false;
    foreach ($usuarios as $usuario) {
        if ($usuario['nome'] === $login && $usuario['senha'] === $senha) {
            $loginBemSucedido = true;
            break;
        }
    }

    if ($loginBemSucedido) {
        // Login bem-sucedido
        $_SESSION['usuario'] = $login;
        header('Location: fornecedores.html'); // Redireciona para a área logada
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
?>