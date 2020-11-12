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

  function submitData(toyName, toyImg, toyLikes)
  {
    const formData = {
      name: toyName,
      img: toyImg,
      likes: toyLikes
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    return fetch("http://localhost:3000/toys", configObj)
      .then(function(resp) {
        return resp.json();
      })
      .then(function(object) {
        for (let key in object)
        {
          let div = document.createElement("div").setAttribute("class", "card");
          let h2 = document.createElement("h2");
          let img = document.createElement("img");
          let p = document.createElement("p");
          let btn = document.createElement("button");
          Object.assign(img, {
            className: "toy-avatar",
            src: object["image"]
          })
          btn.setAttribute("class", "lik-btn");
          h2.innerHTML = object["name"];
          p.innerHTML = object["likes"];
          div.appendChild(h2);
          div.appendChild(img);
          div.appendChild(p);
          div.appendChild(btn);
          document.body.appendChild(div);
        } 
      })
  }

});
