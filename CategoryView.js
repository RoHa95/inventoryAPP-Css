import Storage from "./Storage.js";
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category-btn");
const categorySelect = document.querySelector("#product-category");
const addCategoryFormBtn = document.querySelector(".add-category-btn");
const categoryForm = document.querySelector("#category-form");
const cancelBtn = document.querySelector("#cancel-add-category-form");
class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    addCategoryFormBtn.addEventListener("click", (e) =>
      this.addCategoryForm(e)
    );
    cancelBtn.addEventListener("click", (e) => this.cancelAddCategory(e));
    this.categories = [];
    this.products = [];
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    console.log(title, description);
    // update DOM
    this.createCategoryList();
    addCategoryFormBtn.classList.remove("hidden");
    categoryForm.classList.add("hidden");
  }
  createCategoryList() {
    this.categories = Storage.getAllCategories();
    let result = `<option class="category-select-option" value="">
        Select a Category
      </option>`;
    this.categories.forEach(
      (c) =>
        (result += `{
       <option class="category-select-option" value=${c.id}>
      ${c.title}
    </option>}`)
    );
    categorySelect.innerHTML = result;
    console.log(this.categories);
  }
  addCategoryForm(e) {
    e.preventDefault();
    addCategoryFormBtn.classList.add("hidden");
    categoryForm.classList.remove("hidden");
  }
  cancelAddCategory(e) {
    e.preventDefault();
    addCategoryFormBtn.classList.remove("hidden");
    categoryForm.classList.add("hidden");
  }
}
export default new CategoryView();
