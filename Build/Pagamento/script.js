// Função para redirecionar para a página de pagamento por PIX
function redirectToPixPayment() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        // Redireciona para a página de pagamento por PIX
        window.location.href = 'pix-payment.html';
    }
}

// Função para enviar o pagamento
function enviarPagamento(dadosPagamento) {
    fetch('https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/pagamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPagamento)
    })
    .then(response => {
        if (response.ok) {
            alert('Pagamento registrado com sucesso!');
        } else {
            alert('Erro ao registrar o pagamento.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Função para atualizar o pagamento
function atualizarPagamento(id, novosDados) {
    fetch(`https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/pagamentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novosDados)
    })
    .then(response => {
        if (response.ok) {
            alert('Pagamento atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar o pagamento.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Função para deletar o pagamento
function deletarPagamento(id) {
    fetch(`https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/pagamentos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Pagamento deletado com sucesso!');
        } else {
            alert('Erro ao deletar o pagamento.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Adicionando botões para as operações no HTML
function adicionarBotoes() {
    // Criando o botão de Enviar Pagamento (POST)
    const btnEnviar = document.createElement('button');
    btnEnviar.innerText = 'Registrar Pagamento';
    btnEnviar.onclick = () => {
        const dadosPagamento = {
            // Exemplo de dados de pagamento - ajuste conforme necessário
            metodoPagamento: 'PIX',
            valor: 100,
            status: 'Pendente'
        };
        enviarPagamento(dadosPagamento);
    };

    // Criando o botão de Atualizar Pagamento (PUT)
    const btnAtualizar = document.createElement('button');
    btnAtualizar.innerText = 'Atualizar Pagamento';
    btnAtualizar.onclick = () => {
        const idPagamento = 1;  // Exemplo de ID de pagamento - ajuste conforme necessário
        const novosDados = {
            metodoPagamento: 'PIX',
            valor: 150,
            status: 'Concluído'
        };
        atualizarPagamento(idPagamento, novosDados);
    };

    // Criando o botão de Deletar Pagamento (DELETE)
    const btnDeletar = document.createElement('button');
    btnDeletar.innerText = 'Deletar Pagamento';
    btnDeletar.onclick = () => {
        const idPagamento = 1;  // Exemplo de ID de pagamento - ajuste conforme necessário
        deletarPagamento(idPagamento);
    };

    // Adicionando os botões ao corpo do HTML
    document.body.appendChild(btnEnviar);
    document.body.appendChild(btnAtualizar);
    document.body.appendChild(btnDeletar);
}

// Chamando a função para adicionar os botões na página
adicionarBotoes();
