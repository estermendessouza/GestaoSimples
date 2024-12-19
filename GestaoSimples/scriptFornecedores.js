const baseURL = "https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/fornecedores"; // URL base do servidor

// Função para carregar todos os fornecedores e adicionar eventos
function carregarFornecedores() {
    fetch(baseURL)
        .then(response => response.json())
        .then(fornecedores => {
            const lista = document.getElementById("lista-empresas");
            lista.innerHTML = ""; // Limpa a lista atual antes de recriá-la

            fornecedores.forEach(fornecedor => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `
                    <span>${fornecedor.nome} | ${fornecedor.telefone} | ${fornecedor.cnpj}</span>
                    <div class="buttons-container d-flex gap-2">
                        <button class="btn btn-warning update-btn" data-id="${fornecedor.id}"></button>
                        <button class="btn btn-danger delete-btn" data-id="${fornecedor.id}"></button>
                    </div>
                `;
                lista.appendChild(li);

                // Adicione eventos a cada botão dinâmico após criar o elemento
                const editButton = li.querySelector(".update-btn");
                const deleteButton = li.querySelector(".delete-btn");

                // Adicionando eventos de clique
                editButton.addEventListener("click", () => {
                    console.log(`Botão "Editar" clicado para o fornecedor: ${fornecedor.nome}`); // Debug
                    editarFornecedor(fornecedor);
                });

                deleteButton.addEventListener("click", () => {
                    console.log(`Botão "Excluir" clicado para o fornecedor: ${fornecedor.nome}`); // Debug
                    apagarFornecedor(fornecedor.id);
                });
            });

            console.log("Fornecedores carregados e eventos adicionados."); // Debug
        })
        .catch(error => {
            console.error("Erro ao carregar fornecedores:", error);
        });
}

// Função para editar fornecedor (mostra o formulário com os dados do fornecedor selecionado)
function editarFornecedor(fornecedor) {
    const formContainer = document.getElementById("form-container");
    formContainer.classList.remove("d-none"); // Exibe o formulário

    // Preenche os campos do formulário
    console.log("Editando fornecedor:", fornecedor); // Debug
    document.getElementById("nome").value = fornecedor.nome;
    document.getElementById("telefone").value = fornecedor.telefone;
    document.getElementById("cnpj").value = fornecedor.cnpj;

    // Atualiza o evento do formulário
    const form = document.getElementById("fornecedor-form");
    form.onsubmit = event => {
        event.preventDefault();
        console.log(`Enviando informações atualizadas para fornecedor: ${fornecedor.id}`); // Debug

        const fornecedorEditado = {
            nome: document.getElementById("nome").value,
            telefone: document.getElementById("telefone").value,
            cnpj: document.getElementById("cnpj").value,
        };

        atualizarFornecedor(fornecedor.id, fornecedorEditado);

        // Oculta o formulário e reseta os campos
        form.onsubmit = null;
        event.target.reset();
        formContainer.classList.add("d-none");
    };
}

// Função para atualizar fornecedor na API
function atualizarFornecedor(id, fornecedor) {
    fetch(`${baseURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor),
    })
        .then(response => {
            if (response.ok) {
                alert("Fornecedor atualizado com sucesso!");
                carregarFornecedores(); // Atualiza a lista na interface
            } else {
                alert("Erro ao atualizar fornecedor.");
            }
        })
        .catch(error => {
            console.error("Erro ao atualizar fornecedor:", error);
        });
}

// Função para apagar fornecedor
function apagarFornecedor(id) {
    console.log(`Tentando apagar fornecedor com ID: ${id}`); // Debug
    fetch(`${baseURL}/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            if (response.ok) {
                alert("Fornecedor excluído com sucesso!");
                carregarFornecedores(); // Atualiza a lista na interface
            } else {
                alert("Erro ao excluir fornecedor.");
            }
        })
        .catch(error => {
            console.error("Erro ao excluir fornecedor:", error);
        });
}

// Função para cadastrar novo fornecedor na API
function cadastrarFornecedor(fornecedor) {
    fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fornecedor),
    })
        .then(response => {
            if (response.ok) {
                alert("Fornecedor cadastrado com sucesso!");
                carregarFornecedores(); // Atualiza a lista na interface
            } else {
                alert("Erro ao cadastrar fornecedor.");
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar fornecedor:", error);
        });
}

// Botão de adicionar fornecedor
document.getElementById("add-button").addEventListener("click", () => {
    const formContainer = document.getElementById("form-container");
    formContainer.classList.remove("d-none");

    // Limpa os campos do formulário para um novo cadastro
    document.getElementById("fornecedor-form").reset();

    // Atualiza o evento do formulário especialmente para o cadastro
    const form = document.getElementById("fornecedor-form");
    form.onsubmit = event => {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        console.log("Enviando novo fornecedor...");

        const novoFornecedor = {
            nome: document.getElementById("nome").value,
            telefone: document.getElementById("telefone").value,
            cnpj: document.getElementById("cnpj").value,
        };

        cadastrarFornecedor(novoFornecedor);

        // Oculta o formulário e reseta os campos
        event.target.reset();
        formContainer.classList.add("d-none");
    };

    console.log("Formulario de cadastro preparado.");
});

// Botão de cancelar cadastro/edição
document.getElementById("cancel-button").addEventListener("click", () => {
    const formContainer = document.getElementById("form-container");
    formContainer.classList.add("d-none");
    console.log("Formulario ocultado.");
});

// Inicializar a página carregando fornecedores
document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada! Carregando fornecedores..."); // Debug
    carregarFornecedores();
});