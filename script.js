// ! Variables

const cartBtn = document.querySelector(".cart-btn");
const clearBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productsDom = document.querySelector("#products-dom");
console.log(productsDom);

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
}

class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    products.getProducts()
        .then((products) => {
            ui.displayProducts(products);
        })
})