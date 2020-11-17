let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {	
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  toyForm.addEventListener('submit', event => {
    event.preventDefault();
    postToy(event.target);
  })

  let toyCollection = document.getElementById("toy-collection");
  fetchToys();

  function fetchToys() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(json => {
        json.forEach(toy => {
          renderToy(toy)
        })
      })
  };

  function postToy(formData){
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({ 

        'name': formData.name.value,
        'image': formData.image.value,
        'likes': 0
      })
    }) 
    .then (resp => resp.json())
    .then (json => {
      renderToy(json)
    })
  };

  function renderToy(toy) {
    console.log(toy);
    let h2 = document.createElement('h2');
    h2.innerText = `${toy.id}. ${toy.name}`;

    let img = document.createElement('img');
    img.src = toy.image;
    img.className = "toy-avatar";

    let p = document.createElement('p');
    p.innerText = `${toy.likes}`;

    let btn = document.createElement('button');
    btn.className = 'like-btn';
    btn.id = toy.id;
    btn.innerText = 'Like <3'
    btn.addEventListener('click', addLike);


    let toyCard = document.createElement('div');
    toyCard.className = 'card'

    toyCard.append(h2, img, p, btn);
    console.log(toyCard);
    toyCollection.append(toyCard);
  };

  function addLike(e){
    e.preventDefault();
    let likes = parseInt(e.target.previousElementSibling.innerText++)


    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

      body: JSON.stringify({
        "likes": likes
      })
    });
  };
});