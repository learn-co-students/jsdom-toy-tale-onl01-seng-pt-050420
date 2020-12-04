let addToy = false;
let divToyCollection = document.querySelector("#toy-collection")

function getToys() {
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
}

function postToy(toy_data) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((obj_toy) => {
    let new_toy = renderToys(obj_toy)
    divToyCollection.append(new_toy)
  })
}

function likes(event) {
  event.preventDefault()
  let moreLikes = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": moreLikes
    })
  })
  .then(res => res.json())
  .then((moreLikesObject => {
    event.target.previousElementSibling.innerText = `${moreLikes} likes`;
  }))
}

function renderToys(toy) {
  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let image = document.createElement("img")
  image.setAttribute("src", toy.image)
  image.setAttribute("class", "toy-avatar")

  let p = document.createElement("p")
  p.innerText = `${toy.likes} likes`

  let likeButton = document.createElement('button')
  likeButton.setAttribute("class", "like-btn")
  likeButton.setAttribute("id", toy.id)
  likeButton.innerText = "like"
  likeButton.addEventListener("click", (event) => {
    console.log(event.target.dataset);
    likes(event)
  })

  let divCard = document.createElement("div")
  divCard.setAttribute("class", "card")
  divCard.append(h2, image, p, likeButton)
  divToyCollection.append(divCard)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})