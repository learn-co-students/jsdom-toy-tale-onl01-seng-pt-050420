let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", e=>{
        e.preventDefault()
        submitToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then(function(rsp) {
    return rsp.json();
  })
  .then(function(obj){
    addToys(obj)
});

function addToys(toys){
  for (let toy of toys){
    getToyData(toy)
  }
}
 function addLike(buttton, id){
    buttton.addEventListener('click', (e)=>{
      let like = parseInt(e.target.previousElementSibling.innerText) + 1
        fetch(`http://localhost:3000/toys/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        11},
          body: JSON.stringify({
            "likes": like
          })
        })
          .then(res => res.json())
          .then(like_obj => {
          e.target.previousElementSibling.innerText = `${like} likes`;
          })
    } 
  )} 

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

    function getToyData(toy){
      const toyCollection = document.getElementById('toy-collection');
      const card = document.createElement("div")
      const h2 = document.createElement("h2")
      const img = document.createElement("img")
      const p = document.createElement("p")
      const button = document.createElement("button")
      card.className = "card"
        h2.innerText = toy.name
        img.src = toy.image
        img.className = "toy-avatar"
        p.innerHTML = `${toy.likes} likes`
        button.innerHTML = "like"
        let id = toy.id
        addLike(button, id)
     card.append(h2, img, p, button)  
     toyCollection.appendChild(card)
    }