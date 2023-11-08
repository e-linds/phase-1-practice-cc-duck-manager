fetch("http://localhost:3000/ducks")
.then(r => r.json())
.then(data => {

    const duckOne = data[0]

            document.querySelector("#duck-display-name").textContent = duckOne.name
            document.querySelector("#duck-display-image").src = duckOne.img_url
            document.querySelector("#duck-display-likes").textContent = `${duckOne.likes} likes`



    data.forEach((duck) => {
        currentDuck = duck

        const duckImg = document.createElement("img")
        duckImg.src = duck.img_url
        document.querySelector("#duck-nav").append(duckImg)

        duckImg.addEventListener("click", (e) => {
            e.preventDefault()

            document.querySelector("#duck-display-name").textContent = duck.name
            document.querySelector("#duck-display-image").src = duck.img_url
            document.querySelector("#duck-display-likes").textContent = `${duck.likes} likes`

        } 
        )

    })
    
    //event listener for like button. Currently likes only update when on the page, and do not persist when you click away. 
    //need to create a god variable - will come back to this 
const likes_btn = document.querySelector("#duck-display-likes")
likes_btn.addEventListener("click", (e) => {
    e.preventDefault()
    let currentLikes = parseInt(likes_btn.textContent)
    currentLikes = currentLikes + 1

    likes_btn.textContent = `${currentLikes} likes`
    console.log(currentLikes)
})


//event listener for new duck form
const form = document.querySelector("#new-duck-form")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const newDuckName = e.target["duck-name-input"].value
    const newDuckImg = e.target["duck-image-input"].value
    const newDuckLikes = 0

    document.querySelector("#duck-display-name").textContent = newDuckName
    document.querySelector("#duck-display-image").src = newDuckImg
    document.querySelector("#duck-display-likes").textContent = `${newDuckLikes} likes`

    const duckImg = document.createElement("img")
        duckImg.src = newDuckImg
        document.querySelector("#duck-nav").append(duckImg)

    fetch(`http://localhost:3000/ducks`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": newDuckName,
            "img_url": newDuckImg,
            "likes": 0
        })
    })
    form.reset()
})


})
