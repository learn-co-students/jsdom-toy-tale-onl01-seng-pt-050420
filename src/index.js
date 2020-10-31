let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys();

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit ran");
    const input = addToyForm.querySelectorAll("input")
    const submitData = {
      name: input[0].value,
      image: input[1].value,
      likes: 0
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(submitData)
    };

    fetch('http://localhost:3000/Toys', configObj)
      .then(res => res.json())
      .then(res => console.log(`toy added: ${res}`))
  });
  
  function getToys() {
    fetch('http://localhost:3000/Toys')
    .then(res => res.json())
    .then(toys => displayCards(toys))
  }
  

  function displayCards(toys) {
    const toyCollection = document.getElementById('toy-collection');
    for (const toy in toys) {
      const toyCard = makeCard(toys[toy]);
      toyCollection.append(toyCard);
    }
  };

  function makeCard(toy) {
      const toyCard = document.createElement("div");
      toyCard.className = "card";

      const id = document.createElement('p');
      id.style.display = "none";
      id.id = "toy-id";
      id.innerHTML = `${toy.id}`;
      toyCard.appendChild(id);

      const title = document.createElement('h2');
      title.appendChild(document.createTextNode(toy.name))
      toyCard.appendChild(title)

      const image = document.createElement('img');
      image.src = toy.image;
      image.className = "toy-avatar";
      toyCard.appendChild(image);

      const content = document.createElement('p');
      content.innerHTML = `${toy.likes} likes`;
      toyCard.appendChild(content);

      const cardButton = document.createElement('button');
      cardButton.className = "like-btn";
      cardButton.innerHTML = "Like";
      cardButton.addEventListener('click', (e) => {
        console.log('like clicked');
        addLike(toy);
      })
      toyCard.appendChild(cardButton);
      
      toyCard.appendChild(title);  

      return toyCard;
  };

  function addLike(toy) {
    const likeData = { "likes": toy.likes + 1};
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(likeData)
    }

    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(res => res.json())
      .then(res => console.log(`toy updated: ${res}`))
  };
});
