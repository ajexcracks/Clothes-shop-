document.addEventListener('DOMContentLoaded', () => {
    // Initialize products if not already in localStorage
    if (!localStorage.getItem('products')) {
        const initialProducts = [
            { name: 'Silk Evening Gown', price: '499.99', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae' },
            { name: 'Tailored Suit', price: '799.99', image: 'https://images.unsplash.com/photo-1594938298603-3c8a9a4a1824' }
        ];
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    // Display products
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Admin login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === '123' && password === '123') {
                localStorage.setItem('admin', 'true');
                window.location.href = 'add-product.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Add product form
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        if (localStorage.getItem('admin') !== 'true') {
            window.location.href = 'admin.html';
        } else {
            addProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const price = document.getElementById('price').value;
                const image = document.getElementById('image').value;
                const products = JSON.parse(localStorage.getItem('products')) || [];
                products.push({ name, price, image });
                localStorage.setItem('products', JSON.stringify(products));
                alert('Product added successfully!');
                window.location.href = 'index.html';
            });
        }
    }
});