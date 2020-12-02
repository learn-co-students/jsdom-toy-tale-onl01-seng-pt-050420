let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  applyAddToyButton();
  fetchToys();
});

function applyAddToyButton() {
  const addToyForm = document.getElementsByClassName("add-toy-form")[0]
  addToyForm.addEventListener("submit", createNewToy)
}

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    renderToys(json)
  });
}

function renderToys(toys) {
  const toyCollection = document.getElementById("toy-collection")
  toyCollection.innerHTML = ""
  toys.forEach(toy => {
    const card = document.createElement("div")
    card.className = "card";

    const toyName = document.createElement("h2")
    toyName.innerHTML = toy.name

    const toyImage = document.createElement("img")
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";

    const likes = document.createElement("p")
    likes.innerHTML = `${toy.likes} Likes`

    const likeButton = document.createElement("button");
    likeButton.innerHTML = "Like <3"
    likeButton.className = "like-btn"
    likeButton.addEventListener("click", function() {
      updateToyLikes(toy)
    })

    card.appendChild(toyName)
    card.appendChild(toyImage)
    card.appendChild(likes)
    card.appendChild(likeButton)
    toyCollection.appendChild(card)

  })
}

function updateToyLikes(toy) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      "likes": parseInt(toy.likes + 1)
    })
  }
  return fetch(`http://localhost:3000/toys/${toy.id}`, configObj).then(function(response) {
    return response.json()
  }).then(function(obj) {
    fetchToys()
  }).catch(function(err) {
    console.log('err', err.message)
  })
}

function createNewToy(e) {
  e.preventDefault();
  const formInputs = document.getElementsByClassName("input-text")

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      "name": formInputs[0].value,
      "image": formInputs[1].value,
      "likes": 0
    })
  }
  return fetch('http://localhost:3000/toys', configObj).then(function (response) {
    return response.json();
  }).then(function() {
    fetchToys();
  }).catch(function(err) {
    console.log('err', err.message)
  })

}