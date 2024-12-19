const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const productsContainer = document.getElementById('products-container');
const addProductBtn = document.getElementById('add-product');
const finalizePurchaseBtn = document.getElementById('finalize-purchase');
let products = [];

menuBtn.addEventListener('click', () => {
  sidebar.style.left = '0';
});

closeBtn.addEventListener('click', () => {
  sidebar.style.left = '-250px';
});

function renderProducts() {
  productsContainer.innerHTML = '';
  products.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <h2>${product.nome}</h2>
      <p>${product.descricao}</p>
      <p>Preço: R$ ${product.preco}</p>
      <p>Categoria: ${product.categoria}</p>
      <p>Quantidade: <span id="quantity-${index}">${product.quantity || 1}</span></p>
      <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
      <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
      <button class="excluir-btn" onclick="deleteProduct(${product.idProduto}, ${index})">Excluir</button>
    `;
    productsContainer.appendChild(productDiv);
  });
}

function getProducts() {
  fetch('https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/produtos')
    .then(response => response.json())
    .then(data => {
      products = data.map(item => ({
        ...item,
        quantity: 1
      }));
      renderProducts();
    })
    .catch(error => console.error('Erro ao carregar os produtos:', error));
}

function addProduct() {
  const newProduct = {
    nome: 'Novo Produto',
    descricao: 'Descrição do novo produto',
    preco: '99.99',
    categoria: 'Nova Categoria',
  };

  fetch('https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  })
    .then(response => response.json())
    .then(createdProduct => {
      products.push({ ...createdProduct, quantity: 1 });
      renderProducts();
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
}

function updateProduct(index) {
  const product = products[index];
  const updatedProduct = {
    nome: prompt('Editar nome do produto:', product.nome) || product.nome,
    descricao: prompt('Editar descrição do produto:', product.descricao) || product.descricao,
    preco: prompt('Editar preço do produto:', product.preco) || product.preco,
    categoria: prompt('Editar categoria do produto:', product.categoria) || product.categoria,
  };

  fetch(`https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/produtos/${product.idProduto}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProduct),
  })
    .then(response => response.json())
    .then(updatedData => {
      products[index] = { ...updatedData, quantity: product.quantity };
      renderProducts();
    })
    .catch(error => console.error('Erro ao atualizar produto:', error));
}

function deleteProduct(idProduto, index) {
  fetch(`https://574f960e-c244-4355-8367-ccc07e18e71e-00-3ud78sen3fz.riker.replit.dev/produtos/${idProduto}`, {
    method: 'DELETE',
  })
    .then(() => {
      products.splice(index, 1);
      renderProducts();
    })
    .catch(error => console.error('Erro ao deletar produto:', error));
}

function increaseQuantity(index) {
  products[index].quantity++;
  document.getElementById(`quantity-${index}`).innerText = products[index].quantity;
}

function decreaseQuantity(index) {
  if (products[index].quantity > 1) {
    products[index].quantity--;
    document.getElementById(`quantity-${index}`).innerText = products[index].quantity;
  }
}

function finalizePurchase() {
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  alert(`Redirecionando para a tela de pagamento.`);
}

addProductBtn.addEventListener('click', addProduct);
finalizePurchaseBtn.addEventListener('click', finalizePurchase);

getProducts();
