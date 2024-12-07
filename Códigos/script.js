// botão de adicionar (abrir/fechar formulário)
document.getElementById('add-button').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('form-container').classList.toggle('d-none'); // Mostra ou oculta o formulário
});

// adicionar/editar itens
document.getElementById('fornecedor-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores no formulário
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();

    // Verificar se os campos estão preenchidos
    if (!nome || !telefone || !cnpj) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Verifica se estamos editando ou criando um novo item
    if (this.dataset.editando === "true") {
        const li = document.querySelector(`#lista-empresas li.editando`);
        if (li) {
            // Atualiza os valores do item existente
            li.querySelector('span').textContent = `${nome} | ${telefone} | ${cnpj}`;
            li.classList.remove('editando'); // Remove a indicação de edição
        }
        delete this.dataset.editando; // Limpa o estado de edição

    } else {
        // Criar um novo item na lista
        const novoItem = document.createElement('li');
        novoItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        novoItem.innerHTML = `
            <span>${nome} | ${telefone} | ${cnpj}</span>
            <div class="buttons-container d-flex">
                <button class="btn btn-warning update-btn"></button>
                <button class="btn btn-danger delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" fill="#554E4E"></path>
                    </svg>
                </button>
            </div>
        `;
        document.getElementById('lista-empresas').appendChild(novoItem);
    }

    // Limpar o formulário
    document.getElementById('fornecedor-form').reset();

    // Esconder o formulário
    document.getElementById('form-container').classList.add('d-none');
});

// Delegação de eventos para edição e exclusão
document.getElementById('lista-empresas').addEventListener('click', function(event) {
    const target = event.target;

    // Abrir o formulário para editar um item
    if (target.closest('.update-btn')) {
        const li = target.closest('li'); // Seleciona o item da lista (li)
        const [nome, telefone, cnpj] = li.querySelector('span').textContent.split(' | ');

        // Preencher o formulário com os dados do item existente
        document.getElementById('nome').value = nome.trim();
        document.getElementById('telefone').value = telefone.trim();
        document.getElementById('cnpj').value = cnpj.trim();

        // Indicar que este formulário está no modo edição
        document.getElementById('fornecedor-form').dataset.editando = "true";

        // Marcar o item como "sendo editado"
        li.classList.add('editando');

        // Mostrar o formulário
        document.getElementById('form-container').classList.remove('d-none');
    }

    // Excluir um item
    if (target.closest('.delete-btn')) {
        const li = target.closest('li'); // Seleciona o item pai (li)
        li.remove(); // Remove o item da lista
    }
});