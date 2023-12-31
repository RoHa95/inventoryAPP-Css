import Storage from "./Storage.js";
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product-btn");
const searchInput = document.querySelector("#search-input");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProducts(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    this.products = [];
  }
  addNewProducts(e) {
    e.preventDefault();
    // console.log("hi product");
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;
    if (!title || !quantity || !category) return;
    Storage.saveProduct({ title, quantity, category });
    // console.log(title, quantity, category);
    //   update DOM
    this.createProductList(this.products);
  }
  setAPP() {
    const products = Storage.getAllProducts();
  }
  createProductList(products) {
    let result = ``;
    const savedProducts = Storage.getAllProducts();
    const productListContainer = document.querySelector("#product-list");
    savedProducts.forEach((p) => {
      const savedCategories = Storage.getAllCategories();
      console.log(savedCategories);
      const selectedCategories = savedCategories.find(
        (c) => c.id == p.category
      );
      console.log(selectedCategories);
      result += `<div class="product-detailes">
        <span class="product-list-title">${p.title}</span>
        <div class="product-item-detailes">
          <span class="time-tag">${new Date(p.createAt).toLocaleDateString(
            "fa-IR"
          )}</span>
          <span class="category-tag">${selectedCategories.title}</span>
          <span class="number-container">${p.quantity}</span>
          <button id="delete-btn" data-product-id = ${
            p.id
          } class="delete-tag">delete</button>
        </div>
      </div>`;
    });
    productListContainer.innerHTML = result;
    //delete product
    const deleteBtns = [...document.querySelectorAll("#delete-btn")];
    // console.log(deleteBtns);
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        const deletBtn = e.target.dataset.productId;
        Storage.deleteProduct(deletBtn);
        this.createProductList();
      });
    });
  }

  searchProducts(e) {
    const searchValue = e.target.value.trim().toLowerCase();
    const products = Storage.getAllProducts();
    const filteredProducts = products.find((p) => {
      p.title.toLowerCase().include(searchValue);
    });
    console.log(filteredProducts);
  }
}
export default new ProductView();
