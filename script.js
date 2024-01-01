const cartBtn = document.querySelector(".cart-btn");
const clearBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelectorAll(".cart-items");
const cartTotal = document.querySelectorAll(".total-value");
const cartContent = document.querySelectorAll(".cart-list");
const productsDom = document.querySelectorAll(".products-dom");


class Products {
    async getProducts() {
        try {
            let result = await fetch("https://659306f9bb12970719904f34.mockapi.io/productss")
            let data = await result.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}

class UI {

}

class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const products = new Products();
    products.getProducts();
})