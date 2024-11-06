const search = document.querySelector("#searchinput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();

  let searchValue = search.value;

  if (searchValue && searchValue.length > 0) {
    searchValue == searchValue.trim().toLowerCase();
    // redirect to the products page with the search query
    window.location.href = `products/index.html?search=${searchValue}`;
  } else {
    // do nothing
  }
});

clearButton.addEventListener("click", () => {
  search.value = "";
  search.focus();
});