// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

// const channels = require.context('.', true, /_channel\.js$/)
// channels.keys().forEach(channels)

document.addEventListener("DOMContentLoaded", function() {
    const testDiv = document.createElement('div')

    fetchShoes().then(renderShoes)

    let shoeHype;
    let comments

    const shoeList = document.getElementById('list')
    const shoePage = document.getElementById('show-panel')
    const commentDiv = document.createElement('div')
    const commentForm = document.createElement('form')


    function fetchShoes(){
        return fetch('http://localhost:3000/shoes')
        .then(r => r.json())
    }

    function renderShoes(shoes){
        shoes.forEach(shoe => listShoes(shoe))

    }

    function listShoes(shoe){
        const li = document.createElement('li')
        li.innerText = shoe.name
        li.setAttribute('data-id', shoe.id)
        li.addEventListener('click', fetchShoeData)
        shoeList.appendChild(li)
    }

    function fetchShoeData(e){
       shoeId = e.target.dataset.id
       fetch(`http://localhost:3000/shoes/${shoeId}`)
       .then(r => r.json())
       .then(shoe => showShoe(shoe))
    }

    function showShoe(shoe){
        console.log(shoe)
        comments = shoe.comments
        shoeHype = shoe.hype_count
        shoeId = shoe.id
        shoePage.innerText = ''

        const shoeName = document.createElement('h1')
        shoeName.innerText = shoe.name
        shoePage.appendChild(shoeName)
        
        const shoeImage = document.createElement('img')
        shoeImage.src = `${shoe.image_url}`
        shoePage.appendChild(shoeImage)
        
        const hypeCounter = document.createElement('h3')
        hypeCounter.innerText = `HYPE POINTS: ${shoeHype}`
        shoePage.appendChild(hypeCounter)

        hypeButton = document.createElement('button')
        hypeButton.innerText = 'HYPE IT!'
        hypeButton.addEventListener('click', function(e){ 
            hypeCounter.innerText = `HYPE POINTS: ${shoeHype++}`
        })
        shoePage.appendChild(hypeButton)

        const shoeDesc = document.createElement('p')
        shoeDesc.innerText = shoe.description
        shoePage.appendChild(shoeDesc)


        renderForm(shoeId)
        renderComments(shoe.comments)
    }

    function renderForm(shoeId){
        commentForm.innerText = ''
        commentForm.setAttribute("data-id", shoeId )
        commentForm.innerHTML = 
        `
        <input type="text" placeholder="Add Name">
        <input type="text" placeholder="Add Comment">
        <input type="submit" value="Submit"/>
        `
        
        commentForm.addEventListener('submit', postComment)
        shoePage.appendChild(commentForm)

    }

    function renderComments(comments){
        commentDiv.innerText = ''
        shoePage.appendChild(commentDiv)
        const ul = document.createElement('ul')
        commentDiv.appendChild(ul)

        comments.forEach(comment => {
        const li = document.createElement('li')
        li.id = comment.id
        li.innerHTML = `<strong>${comment.name}</strong> - ${comment.content}`
        ul.appendChild(li)
        })
    }

    function postComment(e){
        e.preventDefault()
        console.log(e)
        const name = e.target.elements[0].value
        const shoeComment = e.target.elements[1].value
        const shoeId = e.target.dataset.id
        
        fetch(`http://localhost:3000/comments`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                shoe_id: shoeId,
                name: name,
                content: shoeComment
            })
        })
    }


});