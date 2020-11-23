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
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => iterateOverToys(toys))
});

function iterateOverToys(toys){
  for(const key in toys){
    console.log(toy["key"]);
  }
};

function createAndAppendToy(object){
  let toyCollection = document.getElementById("toy-collection");
  let toyCard = document.createElement("div");
  toyCard.classList.add("card");
  toyCard.innerText += `Name: ${object.name}, Likes: ${object.likes}`;
  let toyImage = document.createElement("img");
  toyImage.src = object.image;
  toyImage.style = "max-height: 100%; max-width: 100%"
  toyCollection.appendChild(toyCard);
  toyCard.appendChild(toyImage);
};