let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
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
    const createBtn = document.querySelector('input[type="submit"]')
    createBtn.addEventListener("click", function(e) {
      let form = document.querySelector(".add-toy-form")
      let toyName = form.querySelector('input[name="name"]').value
      let toyImg = form.querySelector('input[name="image"]').value
      createToy(toyName, toyImg)
      e.preventDefault()
    })
  });
});
 

function createCard(name, image, likes) {
  let container = document.createElement('div')
  let header = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let button = document.createElement('button')

  container.className = "card"
  img.className = "toy-avatar"
  button.className = "like-btn"
  button.innerHTML = "Like <3"

  header.innerHTML = name
  img.src = image
  p.innerHTML = `${likes} likes`
  container.appendChild(header)
  container.appendChild(img)
  container.appendChild(p)
  container.appendChild(button)
  document.body.appendChild(container)


  button.addEventListener("click", function(e) {
    let toy = button.parentElement.querySelector("h2").innerHTML
    let likes = parseInt(button.parentElement.querySelector("p").innerHTML.split(" ")[0])
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likes += 1
      })
    }
    return fetch("http://localhost:3000/toys/:id", configObj)
      .then(resp => resp.json)
  })
}

function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(toy => createCard(toy.name, toy.image, toy.likes))
    })
}

function createToy(name, image) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  }
  return fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(toy => createCard(toy.name, toy.image, toy.likes))
}

function likeToy() {

}