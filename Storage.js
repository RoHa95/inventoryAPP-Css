const products2 = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    quantity: 1,
    createdAt: "2023-12-28T15:02:54.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    quantity: 1,
    createdAt: "2023-12-28T15:02:54.411Z",
  },
];
const categories2 = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of application",
    createdAt: "2021-12-18T15:02:54.411Z",
  },
  {
    id: 2,
    title: "backend",
    description: "backend of application",
    createdAt: "2023-12-10T21:12:01.411Z",
  },
];
export default class Storage {
  static getAllCategories() {
    const categories = JSON.parse(localStorage.getItem("category20")) || [];
    const sortedCategories = categories.sort((a, b) => {
      new Date(a.createAt) > new Date(b.createAt) ? 1 : -1;
    });
    return sortedCategories;
  }
  static saveCategory(categoryToSave) {
    const categories = Storage.getAllCategories();

    const existedCategories = categories.find(
      (p) => p.id === categoryToSave.id
    );
    if (existedCategories) {
      existedCategories.title = categoryToSave.title;
      existedCategories.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createAt = new Date().toISOString();
      categories.push(categoryToSave);
    }
    localStorage.setItem("category20", JSON.stringify(categories));
  }
  static getAllProducts(sort = "newest") {
    const products = JSON.parse(localStorage.getItem("product20")) || [];
    return products.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createAt) < new Date(b.createAt) ? 1 : -1;
      } else if (sort === "oldest") {
        return new Date(a.createAt) > new Date(b.createAt) ? 1 : -1;
      }
    });
  }
  static saveProduct(productToSave) {
    const products = Storage.getAllProducts();
    const existedProducts = products.find((p) => p.id === productToSave.id);
    if (existedProducts) {
      existedProducts.title = productToSave.title;
      existedProducts.quantity = productToSave.quantity;
      existedProducts.category = productToSave.category;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createAt = new Date().toISOString();
      products.push(productToSave);
    }
    localStorage.setItem("product20", JSON.stringify(products));
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProduct = savedProducts.filter((p) => p.id != id);
    localStorage.setItem("product20", JSON.stringify(filteredProduct));
  }
}
