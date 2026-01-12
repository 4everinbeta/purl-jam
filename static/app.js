// Product grid setup
const assetBase = window.PURL_JAM_ASSET_BASE || "/static/";
const products = [
  {
    id: "pj-001",
    name: "Riverstone Merino",
    price: 28,
    color: "sage",
    fiber: "wool",
    description: "Cloud-soft merino with gentle stretch for everyday knits.",
    image: `${assetBase}references/products/products_1_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-002",
    name: "Sunlit Linen Blend",
    price: 24,
    color: "cream",
    fiber: "cotton",
    description: "Breathable linen-cotton blend with a relaxed drape.",
    image: `${assetBase}references/products/products_12_minimal_yarn_product_photo.jpg`,
  },
  {
    id: "pj-003",
    name: "Alpine Alpaca",
    price: 32,
    color: "neutrals",
    fiber: "wool",
    description: "Warm alpaca with a soft halo for cozy winter layers.",
    image: `${assetBase}references/products/products_8_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-004",
    name: "Willow DK",
    price: 22,
    color: "sage",
    fiber: "wool",
    description: "Balanced DK weight with a calm sage hue.",
    image: `${assetBase}references/products/products_2_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-005",
    name: "Harbor Tweed",
    price: 30,
    color: "neutrals",
    fiber: "wool",
    description: "Textured tweed blend for structured knits.",
    image: `${assetBase}references/products/products_3_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-006",
    name: "Cloud Loft",
    price: 34,
    color: "cream",
    fiber: "wool",
    description: "Airy alpaca blend with a soft, cloudlike bloom.",
    image: `${assetBase}references/products/products_4_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-007",
    name: "Drift Sock",
    price: 20,
    color: "neutrals",
    fiber: "acrylic",
    description: "Durable sock yarn with subtle speckles.",
    image: `${assetBase}references/products/products_5_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-008",
    name: "Meadow Cotton",
    price: 18,
    color: "cream",
    fiber: "cotton",
    description: "Soft cotton for tees, tanks, and baby knits.",
    image: `${assetBase}references/products/products_6_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-009",
    name: "Mist Mohair",
    price: 26,
    color: "sage",
    fiber: "wool",
    description: "Featherlight mohair laceweight for layered texture.",
    image: `${assetBase}references/products/products_7_yarn_skein_product_photography.jpg`,
  },
  {
    id: "pj-010",
    name: "Studio Notions Kit",
    price: 20,
    color: "neutrals",
    fiber: "acrylic",
    description: "Stitch markers and organizers for tidy projects.",
    image: `${assetBase}references/textures/textures_3_yarn_texture_close_up.jpg`,
  },
  {
    id: "pj-011",
    name: "Maple Needles",
    price: 26,
    color: "cream",
    fiber: "wool",
    description: "Warm-touch needles with balanced control.",
    image: `${assetBase}references/lifestyle/lifestyle_4_knitting_hands_natural_light.jpg`,
  },
  {
    id: "pj-012",
    name: "Minimalist Hooks",
    price: 18,
    color: "sage",
    fiber: "acrylic",
    description: "Lightweight hooks with a smooth glide.",
    image: `${assetBase}references/lifestyle/lifestyle_11_crochet_hands_neutral_tones.jpg`,
  },
];

// Navigation
const mobileToggle = document.getElementById("mobile-toggle");
const navLinks = document.getElementById("nav-links");

mobileToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("is-open");
});

// Search functionality
const navSearch = document.getElementById("nav-search");
const featuredGrid = document.getElementById("featured-products");
const shopGrid = document.getElementById("shop-products");

// Filters
const colorFilters = document.getElementById("color-filters");
const fiberFilters = document.getElementById("fiber-filters");
let activeColors = new Set();
let activeFibers = new Set();

const createFilterChip = (label, group, set) => {
  const button = document.createElement("button");
  button.className = "filter-chip";
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", () => {
    if (set.has(label)) {
      set.delete(label);
      button.classList.remove("active");
    } else {
      set.add(label);
      button.classList.add("active");
    }
    renderProducts();
  });
  group.appendChild(button);
};

["sage", "cream", "neutrals"].forEach((color) => createFilterChip(color, colorFilters, activeColors));
["wool", "cotton", "acrylic"].forEach((fiber) => createFilterChip(fiber, fiberFilters, activeFibers));

const matchesFilters = (product, query) => {
  const search = query.trim().toLowerCase();
  const inSearch =
    product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search);
  const colorOk = activeColors.size === 0 || activeColors.has(product.color);
  const fiberOk = activeFibers.size === 0 || activeFibers.has(product.fiber);
  return inSearch && colorOk && fiberOk;
};

const createProductCard = (product) => {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <div class="product-body">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="cart-item-row">
        <span class="price">$${product.price}</span>
        <button class="button button-secondary" data-view="${product.id}">View</button>
      </div>
      <button class="button" data-add="${product.id}">Add to Cart</button>
    </div>
  `;
  return card;
};

const renderProducts = () => {
  const query = navSearch?.value || "";
  const filtered = products.filter((product) => matchesFilters(product, query));

  if (featuredGrid) {
    featuredGrid.innerHTML = "";
    filtered.slice(0, 6).forEach((product) => featuredGrid.appendChild(createProductCard(product)));
  }

  if (shopGrid) {
    shopGrid.innerHTML = "";
    filtered.forEach((product) => shopGrid.appendChild(createProductCard(product)));
  }

  bindProductActions();
};

navSearch?.addEventListener("input", renderProducts);

// Cart functionality
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartCount = document.getElementById("cart-count");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryTotal = document.getElementById("summary-total");
const cartCheckout = document.getElementById("cart-checkout");

const SHIPPING = 6;
const CART_KEY = "purljam-cart";

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

const formatMoney = (value) => `$${value.toFixed(2)}`;

const updateTotals = (cart) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartSubtotal.textContent = formatMoney(subtotal);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  summarySubtotal.textContent = formatMoney(subtotal);
  summaryTotal.textContent = formatMoney(subtotal + SHIPPING);
};

const renderCart = () => {
  const cart = getCart();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Your cart is calm and quiet. Add something from the yarn wall.";
    cartItems.appendChild(empty);
    updateTotals(cart);
    return;
  }

  cart.forEach((item) => {
    const product = products.find((entry) => entry.id === item.id);
    const entry = document.createElement("div");
    entry.className = "cart-item";
    entry.innerHTML = `
      <div class="cart-item-header">
        <img src="${product?.image || ""}" alt="${item.name}" />
        <div>
          <h4>${item.name}</h4>
          <p class="cart-meta">${product?.description || ""}</p>
        </div>
      </div>
      <div class="cart-item-row">
        <div class="qty-controls">
          <button type="button" data-qty="minus" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-qty="plus" data-id="${item.id}">+</button>
        </div>
        <div class="cart-item-actions">
          <span>${formatMoney(item.price * item.quantity)}</span>
          <button class="icon-button trash-button" data-remove="${item.id}" type="button" aria-label="Remove item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <path d="M9 7V5h6v2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <path
                d="M8 7l1 12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2l1-12"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M11 11v6M13 11v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    `;
    cartItems.appendChild(entry);
  });

  updateTotals(cart);
};

const openCart = () => {
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("is-active");
  overlay.hidden = false;
};

const closeCart = () => {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("is-active");
  setTimeout(() => {
    overlay.hidden = true;
  }, 200);
};

cartToggle?.addEventListener("click", openCart);
cartClose?.addEventListener("click", closeCart);
overlay?.addEventListener("click", closeCart);

cartCheckout?.addEventListener("click", () => {
  closeCart();
  document.querySelector("#checkout")?.scrollIntoView({ behavior: "smooth" });
});

const updateCartItem = (id, delta) => {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);
  if (!item) {
    return;
  }
  item.quantity += delta;
  if (item.quantity <= 0) {
    const index = cart.findIndex((entry) => entry.id === id);
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCart();
};

const removeCartItem = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  renderCart();
};

cartItems?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const qtyButton = target.closest("[data-qty]");
  if (qtyButton instanceof HTMLElement) {
    const id = qtyButton.dataset.id;
    if (qtyButton.dataset.qty === "plus" && id) {
      updateCartItem(id, 1);
    }
    if (qtyButton.dataset.qty === "minus" && id) {
      updateCartItem(id, -1);
    }
  }

  const removeButton = target.closest("[data-remove]");
  const removeId = removeButton instanceof HTMLElement ? removeButton.dataset.remove : null;
  if (removeId) {
    removeCartItem(removeId);
  }
});

const addToCart = (productId) => {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  saveCart(cart);
  renderCart();
  openCart();
};

// Modal for product details
const modal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

const openModal = (product) => {
  modalContent.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <div class="modal-actions">
      <h3 id="modal-title">${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price}</p>
      <label>
        Quantity
        <input type="number" min="1" value="1" class="modal-qty" />
      </label>
      <button class="button" data-modal-add="${product.id}">Add to Cart</button>
    </div>
  `;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const bindProductActions = () => {
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.add));
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = products.find((item) => item.id === button.dataset.view);
      if (product) {
        openModal(product);
      }
    });
  });
};

modalContent?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.dataset.modalAdd) {
    const qtyInput = modalContent.querySelector(".modal-qty");
    const qty = qtyInput ? Number(qtyInput.value) : 1;
    for (let i = 0; i < qty; i += 1) {
      addToCart(target.dataset.modalAdd);
    }
    closeModal();
  }
});

renderProducts();
renderCart();
