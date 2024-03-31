// // Start Cart
// const closeBtn = document.querySelector(".close");
// const loading = document.querySelector(".loading");
// const shopBtn = document.querySelectorAll(".shop-btn");
// closeBtn.addEventListener("click", () => {
//   loading.style.display = `none`;
// });
// shopBtn.forEach((el) => {
//   el.addEventListener("click", () => {
//     loading.style.display = `block`;
//   });
// });

// Start Scrolling To Top
const scrolling = document.querySelector(".arrow");
const apperArrow = document.querySelector(".appear");
function scrollToTop(ar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= document.body.offsetTop + 300) {
      ar.classList.add("appear");
    } else {
      ar.classList.remove("appear");
    }
  });

  ar.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
scrollToTop(scrolling);
// End Scrolling To Top
// Open And Close Add To Cart
const cart = document.querySelector(".carts");
const closeCart = document.querySelector("#close-cart");
const closeProduct = document.querySelector(".close-cart");
const listProductHtml = document.querySelector(".box-product");
const cartBtn = document.querySelector(".btn-cart");
const boxProduct = document.querySelector(".box");
const listCartHtml = document.querySelector(".products");
const iconCartSpan = document.querySelector(".icon-cart-span");
const cartShopping = document.querySelector(".cart-shopping");
console.log(iconCartSpan);
let listProducts = [];
let carts = [];

cartShopping.addEventListener("click", () => {
  cart.classList.toggle("show");
});
closeCart.addEventListener("click", () => {
  cart.classList.remove("show");
});

const addDataInHtml = () => {
  listProductHtml.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let boxCol = document.createElement("div");
      boxCol.className = `col-6 col-md-4 col-lg-3 mb-4`;
      boxCol.dataset.id = `${product.id}`;
      boxCol.innerHTML = `
      <div class="box rounded overflow-hidden">
      <div class="pic border-bottom position-relative overflow-hidden" style="height: unset; width: unset;">
        <img class="mw-100" src="${product.image}" alt="" />
        <div class="">
          <div class="btn shop-btn btn-cart w-100 position-absolute start-0">
          Add To Cart
          </div>
          </div>
      </div>
      <div
        class="titles d-flex align-items-center justify-content-center gap-2 flex-column"
      >
        <a href="#" class="name-feature text-black">
          <p>${product.name}</p>
        </a>
        <div
        style="color: const(--first-color)"
        class="price d-flex gap-1"
      >
        <div class="price-one d-flex align-items-center gap-1 fw-bold">
          <span class="">EGP</span>
          <span>${product.price}</span>
        </div>
        <div style="font-size: 14px; text-decoration: line-through; color: var(--first-color);" class="price-one d-flex align-items-center gap-1">
          <span class="">EGP</span>
          <span>${product.price}</span>
        </div>
      </div>
        </div>
    </div>
      `;
      listProductHtml.appendChild(boxCol);
    });
  }
};

listProductHtml.addEventListener("click", (event) => {
  let clickPosition = event.target;
  if (clickPosition.classList.contains("btn-cart")) {
    let productId =
      clickPosition.parentElement.parentElement.parentElement.parentElement
        .dataset.id;
    cart.classList.add("show");
    addToCart(productId);
  }
});

const addToCart = (productId) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.productId == productId
  );
  if (carts.length <= 0) {
    carts = [
      {
        productId: productId,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      productId: productId,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHtml();
  addCartToMemorey();
};

const addCartToMemorey = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHtml = () => {
  listCartHtml.innerHTML = "";
  let totalQuantity = 0;

  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity += cart.quantity;

      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.productId
      );

      // Check if the product is found
      if (positionProduct !== -1) {
        let info = listProducts[positionProduct];
        let newCart = document.createElement("div");
        newCart.className = `item d-flex align-items-start gap-3`;
        newCart.dataset.id = cart.productId;

        newCart.innerHTML = `
          <div style="cursor: pointer; flex: 1;" class="product py-3 px-2 border-bottom d-flex justify-content-between">
            <a href="#" class="item d-flex align-items-start gap-3">
              <div class="pic">
                <img style="object-fit: cover; width: 100px; height: 80px;" src="${
                  info.image
                }" alt="" />
              </div>
              <div class="detail">
                <div class="name">
                  <span>${info.name}</span>
                </div>
                <div style="color: const(--first-color);" class="price d-flex gap-1">
                  <span>EGP</span>
                  <span>${info.price * cart.quantity}</span>
                </div>
              </div>
            </a>
            <div class="quantity d-flex gap-1">
              <span class="minus">-</span>
              <span class="fw-bold">${cart.quantity}</span>
              <span class="plus">+</span>
            </div>
          </div>
        `;

        listCartHtml.appendChild(newCart);
      }
    });
  }

  iconCartSpan.innerHTML = totalQuantity;
};

listCartHtml.addEventListener("click", (e) => {
  let positionClick = e.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let productId =
      positionClick.parentElement.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(productId, type);
  }
});

const changeQuantity = (productId, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.productId == productId
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;

      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemorey();
  addCartToHtml();
};

// Get Data From Json
fetch("../product.json")
  .then((response) => response.json())
  .then((data) => {
    listProducts = data;
    addDataInHtml();

    if (localStorage.getItem("cart")) {
      carts = JSON.parse(localStorage.getItem("cart"));
      addCartToHtml();
    }
  });
// End Add To Cart
