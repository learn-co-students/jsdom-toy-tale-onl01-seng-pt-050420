let addToy = false;
let toyCollection = document.getElementById("toy-collection")
const toyURL = "http://localhost:3000/toys"

let div = document.createElement('div')
  div.className = "card"

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

fetch(toyURL)
.then(response => response.json())
.then(toy => toyCard(toy))


function toyCard(toy){
  toy.forEach(function element(el){
 
  let h2 = document.createElement('h2')
  h2.innerHTML = el.name
  let image = document.createElement('img')
   image.src = el.image
       
  div.appendChild(h2)
  div.appendChild(image)
  
  toyCollection.append(div)
  toyLikes(el)
})
}

function toyLikes(like){
  let pTag = document.createElement('p')
  let likeBtn = document.createElement("button")
  likeBtn.className = "like-btn"
  likeBtn.innerHTML = "Like <3"
  div.append(likeBtn, pTag)
  
  let likeCount = 0

  likeBtn.addEventListener("click", function (){
    
     let newCount = likeCount +=1
     pTag.innerText = `${newCount} likes`
    // console.log(likeCount)
  })
  
  div.appendChild(pTag)
}
let toyData = {
  "name": name,
  "toyImage": ""
}

let submitToy = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(toyData)

}
fetch(toyURL, submitToy)
.then(resp => resp.json())
.then(newToy => toyCard(newToy))
.catch(error => console.log(error.message))