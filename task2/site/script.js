// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Адаптивное меню
    initMobileMenu();
    
    // Инициализация форм
    initForms();
    
    // Инициализация галереи
    initGallery();
    
    // Плавная прокрутка для внутренних ссылок
    initSmoothScroll();
    
    // Динамическое обновление года в футере
    updateCopyrightYear();
    
    // Проверка и инициализация специфичных для страницы функций
    if (document.querySelector('.product-grid')) {
        initProductGrid();
    }
    
    if (document.querySelector('#order-form')) {
        initOrderForm();
    }
    
    if (document.querySelector('#contact-form')) {
        initContactForm();
    }
    
    // Добавление анимаций при прокрутке
    initScrollAnimations();
});

// Адаптивное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
    }
}

// Инициализация форм
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Валидация форм
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
            
            // Показать сообщение об успехе
            showFormMessage(this, 'Форма успешно отправлена!', 'success');
            return true;
        });
        
        // Динамическое обновление полей
        form.addEventListener('change', function(e) {
            updateFormState(this);
        });
    });
}

// Валидация формы
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            markFieldAsInvalid(field);
            isValid = false;
        } else {
            markFieldAsValid(field);
            
            // Специфичная валидация
            if (field.type === 'email' && !isValidEmail(field.value)) {
                markFieldAsInvalid(field);
                isValid = false;
            }
            
            if (field.type === 'tel' && !isValidPhone(field.value)) {
                markFieldAsInvalid(field);
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function markFieldAsInvalid(field) {
    field.style.borderColor = '#e74c3c';
    field.parentElement.classList.add('has-error');
}

function markFieldAsValid(field) {
    field.style.borderColor = '#2ecc71';
    field.parentElement.classList.remove('has-error');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s\-\+\(\)]+$/.test(phone);
}

// Показать сообщение формы
function showFormMessage(form, message, type) {
    // Удалить предыдущие сообщения
    const oldMessage = form.querySelector('.form-message');
    if (oldMessage) oldMessage.remove();
    
    // Создать новое сообщение
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 5px;
        text-align: center;
        color: white;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
    `;
    
    form.insertBefore(messageDiv, form.firstChild);
    
    // Автоматически скрыть через 5 секунд
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.5s';
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// Инициализация галереи
function initGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(this.src.replace('/100/', '/600/'));
        });
    });
}

// Лайтбокс для изображений
function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // Закрытие лайтбокса
    lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        setTimeout(() => lightbox.remove(), 300);
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Обновление года в футере
function updateCopyrightYear() {
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Анимации при прокрутке
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Инициализация сетки товаров (для страницы products.html)
function initProductGrid() {
    const productGrid = document.querySelector('.product-grid');
    
    if (!productGrid) return;
    
    // Данные товаров (в реальном приложении это бы загружалось с сервера)
    const products = [
        { id: 1, name: 'Intel Core i7-13700K', price: 38990, category: 'Процессоры', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop' },
        { id: 2, name: 'AMD Ryzen 9 7950X', price: 52990, category: 'Процессоры', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d3?w=300&h=200&fit=crop' },
        { id: 3, name: 'NVIDIA RTX 4090', price: 199990, category: 'Видеокарты', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=200&fit=crop' },
        { id: 4, name: 'AMD RX 7900 XTX', price: 119990, category: 'Видеокарты', image: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=300&h=200&fit=crop' },
        { id: 5, name: 'ASUS ROG Strix Z790', price: 34990, category: 'Материнские платы', image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300&h=200&fit=crop' },
        { id: 6, name: 'Kingston Fury 32GB', price: 8990, category: 'Оперативная память', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=200&fit=crop' },
        { id: 7, name: 'Samsung 980 Pro 2TB', price: 12990, category: 'SSD', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop' },
        { id: 8, name: 'Corsair RM850x', price: 13990, category: 'Блоки питания', image: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=300&h=200&fit=crop' },
        { id: 9, name: 'Noctua NH-D15', price: 8990, category: 'Кулеры', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=200&fit=crop' },
        { id: 10, name: 'Fractal Design Meshify 2', price: 15990, category: 'Корпуса', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop' },
        { id: 11, name: 'ASUS ProArt 4K', price: 45990, category: 'Мониторы', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop' },
        { id: 12, name: 'Logitech MX Keys', price: 8990, category: 'Периферия', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop' }
    ];
    
    // Очистить сетку
    productGrid.innerHTML = '';
    
    // Создать элементы товаров
    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Создание карточки товара
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="card-img">
        <div class="card-content">
            <span class="category-badge">${product.category}</span>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-price">${product.price.toLocaleString()} ₽</p>
            <div class="card-actions">
                <button class="btn btn-secondary add-to-cart" data-id="${product.id}">В корзину</button>
                <button class="btn btn-outline view-details" data-id="${product.id}">Подробнее</button>
            </div>
        </div>
    `;
    
    // Добавить обработчики событий
    const addToCartBtn = card.querySelector('.add-to-cart');
    const viewDetailsBtn = card.querySelector('.view-details');
    
    addToCartBtn.addEventListener('click', () => addToCart(product.id));
    viewDetailsBtn.addEventListener('click', () => showProductDetails(product.id));
    
    return card;
}

// Добавление в корзину
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Показать уведомление
    showNotification('Товар добавлен в корзину!');
    
    // Обновить счетчик корзины
    updateCartCount();
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Обновить счетчик корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Инициализация формы заказа
function initOrderForm() {
    const orderForm = document.querySelector('#order-form');
    if (!orderForm) return;
    
    // Установить значения по умолчанию
    const defaultValues = {
        'customer-name': 'Иван Иванов',
        'customer-email': 'ivan@example.com',
        'customer-phone': '+79991234567',
        'delivery-address': 'г. Москва, ул. Примерная, д. 10',
        'product-quantity': '1',
        'order-comment': 'Просьба упаковать товар аккуратно'
    };
    
    Object.entries(defaultValues).forEach(([name, value]) => {
        const field = orderForm.querySelector(`[name="${name}"]`);
        if (field) field.value = value;
    });
    
    // Динамический расчет цены
    const quantityInput = orderForm.querySelector('[name="product-quantity"]');
    const priceElement = orderForm.querySelector('.order-total-price');
    
    if (quantityInput && priceElement) {
        const basePrice = 153970;
        
        quantityInput.addEventListener('input', function() {
            const total = basePrice * parseInt(this.value);
            priceElement.textContent = total.toLocaleString() + ' ₽';
        });
    }
    
    // Обработка отправки формы
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собрать данные формы
        const formData = new FormData(this);
        const orderData = {};
        
        formData.forEach((value, key) => {
            orderData[key] = value;
        });
        
        // Добавить информацию о корзине
        orderData.cart = JSON.parse(localStorage.getItem('cart') || '[]');
        orderData.orderDate = new Date().toISOString();
        orderData.orderId = 'ORD-' + Date.now();
        
        // Отправить на сервер (имитация)
        simulateServerSubmission(orderData, this);
    });
}

// Инициализация контактной формы
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;
    
    // Установить значения по умолчанию
    const defaultValues = {
        'contact-name': 'Алексей Петров',
        'contact-email': 'alexey@example.com',
        'contact-phone': '+79998887766',
        'contact-message': 'Интересует информация о наличии товаров и условиях доставки.'
    };
    
    Object.entries(defaultValues).forEach(([name, value]) => {
        const field = contactForm.querySelector(`[name="${name}"]`);
        if (field) field.value = value;
    });
}

// Имитация отправки на сервер
function simulateServerSubmission(data, form) {
    // Показать индикатор загрузки
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Имитация задержки сервера
    setTimeout(() => {
        // В реальном приложении здесь был бы fetch или XMLHttpRequest
        
        console.log('Данные для отправки на сервер:', data);
        
        // Показать сообщение об успехе
        showFormMessage(form, 'Заказ успешно оформлен! Номер заказа: ' + data.orderId, 'success');
        
        // Очистить корзину
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Восстановить кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Очистить форму (кроме значений по умолчанию)
        setTimeout(() => {
            form.reset();
            initOrderForm(); // Восстановить значения по умолчанию
        }, 1000);
        
    }, 2000);
}

// Обновление состояния формы
function updateFormState(form) {
    const totalFields = form.querySelectorAll('input, textarea, select').length;
    const filledFields = Array.from(form.querySelectorAll('input, textarea, select'))
        .filter(field => field.value.trim().length > 0).length;
    
    const progress = (filledFields / totalFields) * 100;
    
    // Обновить индикатор прогресса, если он есть
    const progressBar = form.querySelector('.form-progress');
    if (!progressBar) {
        const bar = document.createElement('div');
        bar.className = 'form-progress';
        bar.style.cssText = `
            height: 4px;
            background: #ddd;
            margin: 1rem 0;
            border-radius: 2px;
            overflow: hidden;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.className = 'form-progress-fill';
        progressFill.style.cssText = `
            height: 100%;
            background: var(--accent-color);
            width: ${progress}%;
            transition: width 0.3s ease;
        `;
        
        bar.appendChild(progressFill);
        form.insertBefore(bar, form.firstChild);
    } else {
        const progressFill = progressBar.querySelector('.form-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }
}

// Динамическая фильтрация товаров
function filterProducts(category) {
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(card => {
        const cardCategory = card.querySelector('.category-badge').textContent;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Сортировка товаров
function sortProducts(criteria) {
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.querySelectorAll('.card'));
    
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.card-price').textContent.replace(/\D/g, ''));
        const priceB = parseInt(b.querySelector('.card-price').textContent.replace(/\D/g, ''));
        
        if (criteria === 'price-low') return priceA - priceB;
        if (criteria === 'price-high') return priceB - priceA;
        return 0;
    });
    
    products.forEach(card => productGrid.appendChild(card));
}

// Инициализация всех функций при загрузке
window.addEventListener('load', function() {
    // Обновить счетчик корзины
    updateCartCount();
    
    // Добавить CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .btn-outline {
            background: transparent;
            border: 2px solid var(--secondary-color);
            color: var(--secondary-color);
        }
        
        .btn-outline:hover {
            background: var(--secondary-color);
            color: white;
        }
        
        .category-badge {
            display: inline-block;
            background: #e8eaf6;
            color: var(--secondary-color);
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .card-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .cart-badge {
            background: #e74c3c;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: -5px;
            right: -5px;
        }
    `;
    document.head.appendChild(style);
    
    // Добавить бейдж корзины
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        cartBtn.style.position = 'relative';
        cartBtn.appendChild(badge);
        updateCartCount();
    }
});
