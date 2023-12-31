console.log("hi js");
import productView from "./productView.js";
import categoryView from "./categoryView.js";
// console.log(Storage.getAllCategories());
document.addEventListener("DOMContentLoaded", (e) => {
  categoryView.setApp();
  productView.setAPP();
  // console.log(categoryView);
  // console.log(productView);
  categoryView.createCategoryList();
  productView.createProductList(productView.products);
});
