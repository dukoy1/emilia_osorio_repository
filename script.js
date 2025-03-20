let products = [];
let editingProductId = null;

function openModal(edit = false, id = null) {
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  if (edit && id !== null) {
    const product = products.find(p => p.id === id);
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-price').value = product.price;
    modalTitle.textContent = 'Edit Product';
    editingProductId = id;
  } else {
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-price').value = '';
    modalTitle.textContent = 'Add Product';
    editingProductId = null;
  }
  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('product-modal').classList.add('hidden');
}

function saveProduct() {
  const id = editingProductId || Date.now();
  const name = document.getElementById('product-name').value;
  const category = document.getElementById('product-category').value;
  const stock = parseInt(document.getElementById('product-stock').value);
  const price = parseFloat(document.getElementById('product-price').value);

  if (editingProductId) {
    products = products.map(p => p.id === editingProductId ? { id, name, category, stock, price } : p);
  } else {
    products.push({ id, name, category, stock, price });
  }
  closeModal();
  renderProducts();
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  renderProducts();
}

function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  products.forEach(product => {
    const row = `<tr>
      <td class='border p-3'>${product.id}</td>
      <td class='border p-3'>${product.name}</td>
      <td class='border p-3'>${product.category}</td>
      <td class='border p-3'>${product.stock}</td>
      <td class='border p-3'>$${product.price.toFixed(2)}</td>
      <td class='border p-3'>
        <button onclick="openModal(true, ${product.id})" class='bg-yellow-500 text-white px-2 py-1 rounded mr-2'>Edit</button>
        <button onclick="deleteProduct(${product.id})" class='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
      </td>
    </tr>`;
    productList.innerHTML += row;
  });
  updateStats();
}

function updateStats() {
  document.getElementById('total-products').textContent = products.length;
  document.getElementById('low-stock').textContent = products.filter(p => p.stock < 5).length;
  document.getElementById('orders-today').textContent = Math.floor(Math.random() * 10);
}

document.addEventListener('DOMContentLoaded', renderProducts);
