import { renderAlerts } from "./alert.mjs";
import { renderCartCount } from "./utils.mjs";
import{loadHeaderFooter} from "./utils.mjs"
 
function handleSearch(event) {
    event.preventDefault(); 
    const searchInput = document.querySelector('#search').value.trim();
    
    if (searchInput) {
      window.location.href = `product-listing/index.html?search=${encodeURIComponent(searchInput)}`;
    }
  }
  const searchForm = document.querySelector('#search');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

loadHeaderFooter();
renderAlerts();
renderCartCount();