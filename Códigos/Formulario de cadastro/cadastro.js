document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('name').value;
    const dataDeNascimento = document.getElementById('data-de-nascimento').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmeSenha = document.getElementById('confirme-senha').value;

    if (senha !== confirmeSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    const usuario = {
        nome: nome,
        dataDeNascimento: dataDeNascimento,
        email: email,
        senha: senha
    };

    const url = 'https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/usuarios';

    fetch(url, {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(usuario) 
    })
    .then(response => response.json())
    .then(data => {
        alert('Cadastro realizado com sucesso!');
        console.log('Usuário cadastrado:', data);

        window.location.href = 'login.html';
    })
    .catch(error => {
        alert('Erro ao cadastrar usuário. Tente novamente!');
        console.error('Erro:', error);
    });
});
