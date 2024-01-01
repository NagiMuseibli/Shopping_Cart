// ! Variables

const cartBtn = document.querySelector(".cart-btn");
const clearBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productsDom = document.querySelector("#products-dom");
// console.log(productsDom);
let cart = [];
let buttonsDOM = [];

class Products {
    async getProducts() {
        try {
            let result = await fetch("https://659306f9bb12970719904f34.mockapi.io/productss")
            let data = await result.json();
            let products = data;
            // console.log(products);
            return products;

        } catch (error) {
            console.log(error);
        }
    }
}

class UI {
    displayProducts(products) {
        // console.log(products);
        let result = "";

        products.forEach(item => {
            result += `
            <div class="col-lg-4 col-md-6">
                <div class="product">
                    <div class="product-image">
                        <img src="${item.image}" alt="product">
                    </div>
                    <div class="product-hover">
                        <span class="product-title">${item.title}</span>
                        <span class="product-price">${item.price}</span>
                        <button class="btn-add-to-cart" data-id="${item.id}">
                            <i class="fas fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
            `});

        productsDom.innerHTML = result;
    }

    getBagButtons() {
        const buttons = [...document.querySelectorAll(".btn-add-to-cart")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.setAttribute("disabled", "disabled");
                button.opacity = .3;
            } else {
                button.addEventListener("click", event => {
                    event.target.disabled = true;
                    event.target.style.opacity = "0.3";
                    // * get product from products
                    let cartItem = { ...Storage.getProduct(id), amount: 1 }
                    // * add product to cart
                    cart = [...cart, cartItem];
                    // * save cart in localStorage
                    Storage.saveCart(cart);
                    // * save cart values
                    this.saveCartValues(cart);
                    // * display cart item
                    this.addCartItem(cartItem);
                    // * Show the cart
                    this.showCart();
                })
            }
        });

    }

    saveCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerHTML = parseFloat(tempTotal.toFixed(2));
        cartItems.innerHTML = itemsTotal;
    }

    addCartItem(cartItem) {
        const li = document.createElement('li');
        li.classList.add("cart-list-item");
        li.innerHTML = `
            <div class="cart-left">
                <div class="cart-left-image">
                    <img src="${cartItem.image}" alt="product" />
                </div>
                <div class="cart-left-info">
                    <a class="cart-left-info-title" href="#">${cartItem.title}</a>
                    <span class="cart-left-info-price">$ ${cartItem.price}</span>
                </div>
            </div>
            <div class="cart-right">
                <div class="cart-right-quantity">
                    <button class="quantity-minus" data-id="${cartItem.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${cartItem.amount}</span>
                    <button class="quantity-plus" data-id="${cartItem.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-right-remove">
                    <button class="cart-remove-btn" data-id="${cartItem.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartContent.appendChild(li);
    }

    showCart() {
        cartBtn.click();
    }

}

class Storage {
    static savePoducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }

    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const ui = new UI();

    const products = new Products();
    products.getProducts()
        .then((products) => {
            ui.displayProducts(products);
            Storage.savePoducts(products);
        }).then((buttons) => {
            ui.getBagButtons();
        })


})