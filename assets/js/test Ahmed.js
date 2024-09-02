let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let index;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
let dataPro;
// save localStorage
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

// create product
submit.onclick = () => {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100) {
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[index] = newPro;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "#a00d02";
}

// read
function showData() {
  let table = "";
  console.log(dataPro)
  dataPro.map((el, i) => {
    table += `
            <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">update</button></td>
              <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>`;
  });
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()">delete All</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  index = i;
  submit.innerHTML = "Update";
  mode = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  showData();
  search.value = "";
}

function searchData(value) {
  let table = "";
  dataPro.filter((el, i) => {
    if (searchMood === "title") {
      dataPro[i].title.toLowerCase().includes(`${value.toLowerCase()}`)
        ? (table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
      </tr>`)
        : showData();
    } else {
      dataPro[i].category.toLowerCase().includes(`${value.toLowerCase()}`)
        ? (table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
      </tr>`)
        : showData();
    }
  });
  document.getElementById("tbody").innerHTML = table;
}

// clean data
