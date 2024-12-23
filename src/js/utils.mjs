import { doc } from "prettier";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get a parameter form the URL when we need to
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
// render product list
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// render with template
export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString= await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if(callback) {
      callback(data);
}}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerFunction = loadTemplate("/partials/header.html");
  const footerFunction = loadTemplate("/partials/footer.html");
  const header = document.querySelector("#header");
  const footer = document.querySelector("#footer");
  renderWithTemplate(headerFunction, header);
  renderWithTemplate(footerFunction, footer);
  renderCartCount();
  renderCartCount()
}
// Cart Icon Animation
export function startCartAnimation() {
  const cart = document.querySelector('.cart');
  cart.classList.add('animate');
}
export function stopCartAnimation() {
  const cart = document.querySelector('.cart');
  cart.classList.remove('animate');
}
//cart superscript
export function renderCartCount(){
  const cartCounter = document.getElementById('cart-count');
  const cartCount = getCartCount();
  //check if cart has items to toggle visibility
  if (cartCount > 0){
    showElement(cartCounter);
  }
  else{
    hideElement(cartCounter);
  }
  //populate the div w/ the count
  cartCounter.innerText = cartCount;
}
//hide and show superscript
export function showElement(element) {
  element.classList.add('visible');
  element.classList.remove('hidden');
}
export function hideElement(element) {
  element.classList.add('hidden');
  element.classList.remove('visible');
}
export function getCartCount() {
  const cart = getLocalStorage('so-cart');
  let cartCount = 0;
  if (cart !== null && cart !== undefined) {
    cartCount = cart.length;
  }
  return cartCount;
}
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function updateBreadcrumb(products = null) {
  const breadcrumb = document.querySelector(".breadcrumb-links");
  const category = getParam("category");
  if (category) {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const prev = document.createElement("li");
    prev.innerHTML = `<a href="/product-list/index.html?category=${category}">${capitalizedCategory} ></a>`;
    breadcrumb.appendChild(prev);
    const current = document.createElement("li");
    current.innerHTML = `<a href="#"> (${products.length}) items</a>`;
    breadcrumb.appendChild(current);
  }

  const product = getParam("product");
  if (product) {
    const prev = document.createElement("li");
    const capitalizedCategory = products.Category.charAt(0).toUpperCase() + products.Category.slice(1);
    prev.innerHTML = `<a href="/product-list/index.html?category=${products.Category}">${capitalizedCategory} ></a>`;
    breadcrumb.appendChild(prev);
    
    const productLink = document.createElement("li");
    productLink.innerHTML = `<a href="#">${products.NameWithoutBrand}</a>`;
    breadcrumb.appendChild(productLink);
  }
}

export function firstTimeVisitor() {
  if (!localStorage.getItem('visited')) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'registerModal';
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.innerHTML = '&times;';

    const heading = document.createElement('h2');
    heading.textContent = 'Welcome!';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Register now and enter our giveaway!';

    const registerButton = document.createElement('button');
    registerButton.id = 'registerButton';
    registerButton.textContent = 'Register Now';

    // Append elements to modal content
    modalContent.appendChild(closeSpan);
    modalContent.appendChild(heading);
    modalContent.appendChild(paragraph);
    modalContent.appendChild(registerButton);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Prepend modal to main element
    const main = document.querySelector('main');
    if (main) {
      main.prepend(modal);
    } else {
      document.body.prepend(modal);
    }

    // Display the modal
    modal.style.display = 'block';

    // Set localStorage to indicate the user has visited
    localStorage.setItem('visited', 'true');

    // Close modal on click of close button or outside the modal
    closeSpan.onclick = function() {
      modal.style.display = 'none';
    };

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }
}