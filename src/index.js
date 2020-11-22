let addToy = false;
const toys = [];

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const createBtn = document.querySelector(".add-toy-form .submit");
  const nameInput = document.querySelector(".add-toy-form input[name='name']");
  const imageInput = document.querySelector(".add-toy-form input[name='image']");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postToyData(nameInput.value, imageInput.value);
  })

  fetchToys();
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      object.forEach(function(toyElement) {
        createAndAppendCard(toyElement);
      })
    })
  ;
}

function postToyData(toyName, toyImage) {
  let formData = {
    "name": toyName,
    "image": toyImage,
    "likes": 0
  };
   
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
   
  fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
          return response.json();
      })
      .then(function(newToy) {
          toys.push(newToy);
          createAndAppendCard(newToy);
      })
      .catch(function(error) {
          alert("Bad things!");
          console.log(error.message);
      })
  ;
}

function createAndAppendCard(toy) {
  let card = document.createElement("DIV");
  card.setAttribute("class", "card");
  card.setAttribute("id", toy.id);

  let name = document.createElement("H2");
  name.textContent = toy.name;

  let avatar = document.createElement("IMG");
  avatar.setAttribute("src", toy.image);
  avatar.setAttribute("class", "toy-avatar");
  
  let likes = document.createElement("P");
  likes.textContent = toy.likes;

  let likeButton = document.createElement("BUTTON", { class: "like-btn"});
  likeButton.textContent = "Like!";
  likeButton.addEventListener("click", function() {
    fetchToyForPatching(toy.id);
  });

  card.appendChild(name);
  card.appendChild(avatar);
  card.appendChild(likes);
  card.appendChild(likeButton);

  let collection = document.querySelector("#toy-collection");
  collection.appendChild(card);
}

function fetchToyForPatching(toyId) {
  fetch("http://localhost:3000/toys/" + toyId)
    .then(function(response) {
      return response.json();
    })
    .then(function(toyObject) {
      patchToyData(toyObject);
    })
  ;
}

function patchToyData(toyObj) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": (toyObj.likes + 1)
    })
  };
   
  fetch("http://localhost:3000/toys/" + toyObj.id, configObj)
      .then(function(response) {
          return response.json();
      })
      .then(function(updatedToy) {
          updateCard(updatedToy);
      })
      .catch(function(error) {
          alert(error.message);
          console.log(error.message);
      })
  ;
}

function updateCard(toy) {
  let cardToUpdate = document.getElementById(toy.id);
  cardToUpdate.childNodes[2].textContent = toy.likes;
}
