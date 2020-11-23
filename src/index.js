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
});

document.addEventListener("DOMContentLoaded", () => {
  getToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })
});

function getToys(){
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
};

function renderToys(toy){
  let toyCollection = document.getElementById("toy-collection");

  let h2 = document.createElement("h2");
  h2.innerText = toy.name;

  let img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.setAttribute("class", "toy-avatar");

  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  divCard.append(h2, img, p);
  toyCollection.append(divCard);
};