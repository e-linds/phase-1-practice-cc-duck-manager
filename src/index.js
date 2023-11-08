fetch("http://localhost:3000/ducks")
.then(r => r.json())
.then(data => {

    const duckOne = data[0]
    displayDuck(duckOne)

    data.forEach((duck) => {
        addtoDuckNav(duck)
     })
    

// event listener for likes button
const likes_btn = document.querySelector("#duck-display-likes")
likes_btn.addEventListener("click", (e) => {
    e.preventDefault()
    let currentLikes = parseInt(likes_btn.textContent)
    currentLikes = currentLikes + 1

    likes_btn.textContent = `${currentLikes} likes`
})


//event listener for new duck form
const form = document.querySelector("#new-duck-form")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const newDuck = {
        name: e.target["duck-name-input"].value,
        img_url: e.target["duck-image-input"].value,
        likes: 0
    }

    displayDuck(newDuck)

    addtoDuckNav(newDuck)

    fetch(`http://localhost:3000/ducks`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": newDuck.name,
            "img_url": newDuck.img_url,
            "likes": 0
        })
    })
    form.reset()
})

//helper function: display a duck's information
function displayDuck(variableDuck) {
    document.querySelector("#duck-display-name").textContent = variableDuck.name
    document.querySelector("#duck-display-image").src = variableDuck.img_url
    document.querySelector("#duck-display-likes").textContent = `${variableDuck.likes} likes`
}

//helper function: add to duck nav, includes event listener for when nav imgs are clicked
function addtoDuckNav(variableDuck) {
    const duckImg = document.createElement("img")
        duckImg.src = variableDuck.img_url
        document.querySelector("#duck-nav").append(duckImg)

        duckImg.addEventListener("click", (e) => {
            e.preventDefault()
            displayDuck(variableDuck)
        })
}

})
