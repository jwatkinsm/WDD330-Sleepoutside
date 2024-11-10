const search = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");

searchButton.addEventListener("click", function(event){
  e.preventDefault();

  let searchValue = search.value;

  if (searchValue && searchValue.length > 0) {
    searchValue == searchValue.trim().toLowerCase();
    // redirect to the products page with the search query
    window.location.href = `product/index.html?search=${searchValue}`;
  } else {
    // do nothing
  }
});

clearButton.addEventListener("click", function(event) {
  search.value = "";
  search.focus();
});