let addToy = false;
let glyphStates = {
  "♡": "♥",
  "♥": "♡"
};

let colorStates = {
  "red" : "",
  "": "red"
};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()
  toyForm.addEventListener('submit', submitData)
  
});

function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => renderToys(json));
}

function renderToys(toys) {
  const toyCollection = document.querySelector("#toy-collection");
  toys.forEach(toy => {
    const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    toyCollection.appendChild(h2)
    const img = document.createElement('img')
    img.src = toy.image
    img.setAttribute("class", 'toy-avatar')
    toyCollection.appendChild(img)
    const p = document.createElement('p')
    p.innerHTML = toy.likes + " " + 'Likes'
    toyCollection.appendChild(p)
    const button = document.createElement('button')
    button.innerHTML = "like " + '♡'
    button.setAttribute('class', 'like-btn')
    button.addEventListener('click', function(){
      element = p;
      beforeLike(toy)
    })
    toyCollection.appendChild(button)
  })
}

function createToy(e){
  submitData().then
}

function submitData(e){
  e.preventDefault();
  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
          name: e.target[0].value, 
          image: e.target[1].value,
          likes: 0
          })
  };

    return fetch("http://localhost:3000/toys/", configObj)
      .then(function(response) {
      return response.json();
      })
      .then(function(object) {
      // console.log(object);
      renderToys(object)
      })
      .catch(function(error) {
          alert("Your data did not load");
          console.log(error.message);
          document.body.innerHTML = error.message
        });
};


function beforeLike(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`)
  .then(resp => resp.json())
  .then(data => {
    like(data)
  })
}

function like(toy){
  let parsed = parseInt(toy.likes);
  let newNumberOfLikes = parsed + 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newNumberOfLikes
    })
  })
  .then(resp => resp.json())
  .then(data => {
     element.innerHTML = `${newNumberOfLikes}` + " " + "Likes";
     console.log(newNumberOfLikes)
     console.log(toy)
    })
}



function likeCallback(e) {
  let heart = e.target;
  mimicServerCall()
    .then(function(serverMessage){
      alert("You notified the server!");
      alert(serverMessage);
      heart.innerText = glyphStates[heart.innerText];
      heart.style.color = colorStates[heart.style.color];
    })
    .catch(function(error) {
      alert("Something went wrong!");
    });
}