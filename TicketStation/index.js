
  
  ////////// CREATE EVENTS ////////////

// events array
 const eventsArray = [
  {
    "dateTime": "2023-08-31T10:30",
    "description": "Promoting local Jozi art",
    "id": "1",
    "location": "Johannesburg",
    "name": "Art Expo Johannesburg",
    "remainingTickets": 150,
    "standardTicket": 250,
    "vipTicket": 500,
    "image": "./images/1.jpg"
  },
  {
    "dateTime": "2023-09-01T12:00",
    "description": "Showcasing Sowetos graffitti artists",
    "id": "2",
    "location": "Soweto",
    "name": "ArtTech Showcase",
    "remainingTickets": 100,
    "standardTicket": 150,
    "vipTicket": 300,
    "image": "./images/2.jpg"
  },
  {
    "dateTime": "2023-09-21T10:00",
    "description": "Empowering local artists and their creations",
    "id": "3",
    "location": "Durban",
    "name": "Artist Empowerment Expo",
    "remainingTickets": 180,
    "standardTicket": 180,
    "vipTicket": 350,
    "image": "./images/3.jpg"
  },
  {
    "dateTime": "2023-10-15T09:00",
    "description": "Exploring the fusion of e-commerce and art",
    "id": "4",
    "location": "Pretoria",
    "name": "E-Commerce Art Symposium",
    "remainingTickets": 220,
    "standardTicket": 200,
    "vipTicket": 400,
    "image": "./images/4.jpg"
  },
  {
    "dateTime": "2023-10-30T11:30",
    "description": "Connecting artists for networking and collaboration",
    "id": "5",
    "location": "Port Elizabeth",
    "name": "Art Connect Expo",
    "remainingTickets": 130,
    "standardTicket": 180,
    "vipTicket": 350,
    "image": "./images/5.jpg"
  },
  {
    "dateTime": "2023-11-26T10:30",
    "description": "Discussing innovation and investment in the art world",
    "id": "6",
    "location": "Bloemfontein",
    "name": "Art Investment Forum",
    "remainingTickets": 160,
    "standardTicket": 220,
    "vipTicket": 450,
    "image": "./images/6.jpg"
  }
];

// Store eventsArray in local storage
localStorage.setItem('eventsArray', JSON.stringify(eventsArray));


// create event class

class Event {
  constructor(id, image, name, description, dateTime, location, standartdTicket, vipTicket, remainingTickets) {
      this.id = id;
      this.image = image;
      this.name = name;
      this.description = description;
      this.dateTime = dateTime;
      this.location = location;
      this.standartdTicket = standartdTicket;
      this.vipTicket = vipTicket;
      this.remainingTickets = remainingTickets;
      }
  };

  ////////// CREATE NEW EVENT FROM USER DATA ////////////

  // get details from form and create object

  document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("submitBtn").addEventListener("click", function () {
    const eventData = {
      id: document.getElementById("id").value,
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      dateTime: document.getElementById("dateTime").value,
      location: document.getElementById("location").value,
      standardTicket: parseFloat(document.getElementById("standardTicket").value),
      vipTicket: parseFloat(document.getElementById("vipTicket").value),
      remainingTickets: parseInt(document.getElementById("remainingTickets").value),
       image: document.getElementById("imageURL").value
    };

    // get the array from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('eventsArray')) || [];

    // create new Event object
    let event = new Event(
      eventData.id,
      eventData.image,
      eventData.name,
      eventData.description,
      eventData.dateTime,
      eventData.location,
      eventData.standardTicket,
      eventData.vipTicket,
      eventData.remainingTickets
    );

    // add event to events array
    storedEvents.push(event);

    // Update the array in localStorage
    localStorage.setItem('eventsArray', JSON.stringify(storedEvents));

    // Clear the input fields
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dateTime").value = "";
    document.getElementById("location").value = "";
    document.getElementById("standardTicket").value = "";
    document.getElementById("vipTicket").value = "";
    document.getElementById("remainingTickets").value = "";
    document.getElementById("imageURL").value = "";

    // check if new data is added to array
    console.log("Submit button clicked");
    console.log(storedEvents);
});
});





  ////////// DISPLAY EVENTS ////////////

  // SELECT ELEMENTS
const eventsElements = document.querySelector(".event-grid");

function renderEvents() {
  console.log("hello")
  const storedEvents = JSON.parse(localStorage.getItem('eventsArray'));

  console.log(storedEvents)
  storedEvents.forEach((event) => {
    if (event.id <= 50000 ) {
      eventsElements.innerHTML += `
  <div class="event-card">
        <img src="${event.image}" alt="Event 1" class="startup-image">
        <div class="event-details">
          <h3>${event.name}</h3>
          <p>Date: ${event.dateTime}</p>
          <p>Entrance: R ${event.standardTicket}</p>
          <button class="buy" onclick="addToCart(${event.id})">Ticket</button>
        </div>
      </div>
          `;
    }
  });
}
renderEvents();





/////////////// CART ///////////////////


///////// select cart elements /////////
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");



// OPEN CART BUTTON
const openCartBtn = document.querySelector(".open-cart-btn");
const openSideCart = document.querySelector(".side-cart");
const closeSideCart = document.querySelector(".close-btn");

openCartBtn.addEventListener("click", openCart);
closeSideCart.addEventListener("click", closeCart);
// OPEN SIDE CART FUNCTION
function openCart() {
  openSideCart.classList.add("open");
}

// CLOSE SIDE CART FUNCTION
function closeCart() {
  openSideCart.classList.remove("open");
}

// CREATE CART ARRAY
let cartArray = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  //check if product exists in cart
  
  if (cartArray.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const storedEvents = JSON.parse(localStorage.getItem('eventsArray')) || [];
    const event = storedEvents.find((event) => event.id == id);
    console.log(event)

    cartArray.push({
      ...event,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// UPDATE CART
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cartArray));
}

// CALCULATE AND RENDER SUBTOTAL
function renderSubtotal() {
  
  let totalPrice = 0,
    totalItems = 0;

  cartArray.forEach((item) => {
    totalPrice += item.standardTicket * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): R ${totalPrice.toFixed(
    2
  )}`;
  totalItemsInCartEl.innerHTML = totalItems;

}


// REMOVE ITEM FROM CART
function removeItemFromCart(id) {
  cartArray = cartArray.filter((item) => item.id != id);

  updateCart();
}

// CHANGE NUMBER OF UNITS PER ITEM
function changeNumberOfUnits(action, id) {
  cartArray = cartArray.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id == id) {
      if (action == "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action == "plus") {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// RENDER CART ITEMS
function renderCartItems() {
  // CLEAR CART ELEMENT
  cartItemsEl.innerHTML = "";
  cartArray.forEach((item) => {
    cartItemsEl.innerHTML += `
      <div class="cart-item">
        <div class="remove-item" onclick="removeItemFromCart(${item.id})">x</div>
        <div class="item-info" >
         <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="unit-price">
          <h4>${item.name}</h4>
          <small>R</small>${item.standardTicket}
        </div>
        <div class="units">
          <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus quantity-btn" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
        </div>
      </div>
    `;
  });
}

// POP UP MODAL

const paymentModal = document.getElementById("paymentModal");
const modalSubtotal = document.getElementById("modalSubtotal");
const payButton = document.querySelector(".pay-btn");
const paymentStatus = document.getElementById("paymentStatus");
const closeModalButton = document.querySelector(".close-modal");

// Event listener for the "Checkout" button
const checkoutButton = document.querySelector(".checkout-btn");
checkoutButton.addEventListener("click", () => {
  modalSubtotal.textContent = subtotalEl.textContent;
  paymentModal.style.display = "block";
});

// Event listener for the "Pay" button inside the modal
payButton.addEventListener("click", () => {
  // Display payment status
  paymentStatus.style.display = "block";

  // Hide the "Pay" button
  payButton.style.display = "none";
});

// Event listener to close the modal
closeModalButton.addEventListener("click", () => {
  paymentModal.style.display = "none";
  paymentStatus.style.display = "none";
});



