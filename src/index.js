let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault();
        submitToy(event.target);
        event.target.reset();
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
.then(function(response){
  return response.json();
})
.then(function(obj){
  addToys(obj)
});

function submitToy(toy){
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toy.name.value,
        "image": toy.image.value,
        "likes": 0
      })
    })
    .then(function(response){
      return response.json();
    })
    .then(function(obj){
      addToyData(obj)
    })
    .catch(function(error){
      alert(error.message);
    });
};

function addToyData(toy){
    const collection = document.getElementById('toy-collection');
    const card = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const button = document.createElement('button');

    card.className = "card";
        h2.innerText = toy.name;
        img.src = toy.image;
        img.className = "toy-avatar";
        p.innerText = `${toy.likes} Likes`;
        button.className = "like-btn";
        button.innerHTML = "Like";
        button.addEventListener('click', (e) =>{
          addLike(e)
        });
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    collection.appendChild(card);
};

function addToys(obj){
  const collection = document.getElementById('toy-collection');
  for(const toy of obj) {
    const card = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const button = document.createElement('button');

    card.className = "card";
        h2.innerText = toy.name;
        img.src = toy.image;
        img.className = "toy-avatar";
        p.innerText = `${toy.likes} Likes`;
        button.className = "like-btn";
        button.innerHTML = "Like";
        
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
    button.addEventListener('click', (e) =>{
      addLike(e)
    });
    collection.appendChild(card);
  }
};

function addLike(e){
  e.preventDefault()
  let like = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": like
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${like} likes`;
    }))
};