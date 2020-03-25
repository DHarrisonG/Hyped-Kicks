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
    const shoeForm = document.getElementById('shoe-form')
    shoeForm.style.visibility = "hidden"
    shoeForm.onsubmit = postShoe

    const addShoeBttn = document.getElementById('add-shoe-bttn')
    addShoeBttn.addEventListener('click', showShoeForm)

    const commentDiv = document.createElement('div')
    const commentForm = document.createElement('form')

    function fetchShoes(){
        return fetch('http://localhost:3000/shoes')
        .then(r => r.json())
    }

    function renderShoes(shoes){
        console.log(shoes.sort( shoe => {
            shoe.hype_count
        }))
        shoes.forEach(shoe => listShoes(shoe))
        // console.log(shoes)
    }

    function listShoes(shoe){
        const li = document.createElement('li')
        li.innerText = shoe.name
        li.setAttribute('data-id', shoe.id)
        li.addEventListener('click', fetchShoeData)
        shoeList.appendChild(li)
    }

    function showShoeForm(e){
        shoePage.innerText = ''
        shoeForm.style.visibility = "visible"
        console.log('Add Shoe Button Clicked')     
    }

    function postShoe(e){
        e.preventDefault();
        const name = e.target.name.value
        const desc = e.target.description.value
        const imgUrl = e.target.imgUrl.value
        fetch(`http://localhost:3000/shoes`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: name,
                description: desc,
                image_url: imgUrl,
                hype_count: 0
            })
        })
    }

    function fetchShoeData(e){
        shoeForm.style.visibility = "hidden"
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
        shoeImage.width = 600
        shoePage.appendChild(shoeImage)
        
        const hypeCounter = document.createElement('h3')
        hypeCounter.innerText = `HYPE POINTS: ${shoeHype}`
        hypeCounter.id = "hype-counter"
        shoePage.appendChild(hypeCounter)

        hypeButton = document.createElement('button')
        hypeButton.innerText = 'HYPE IT!'
        hypeButton.setAttribute('data-id', shoe.id)
        hypeButton.addEventListener('click', addHypePoints)
        shoePage.appendChild(hypeButton)

        const shoeDesc = document.createElement('p')
        shoeDesc.innerText = shoe.description
        shoePage.appendChild(shoeDesc)


        renderForm(shoeId)
        renderComments(shoe.comments)
    }

    function addHypePoints(e){
        const hypeCounter = document.getElementById('hype-counter')
        hypeCounter.innerText = `HYPE POINTS: ${++shoeHype}`
        patchShoeHype(e)
        
    }

    function patchShoeHype(e){
        console.log(e)
        const shoeId = e.target.dataset.id
        fetch(`http://localhost:3000/shoe/${shoeId}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hype_count: shoeHype
            })
        })
    }
    
    function renderForm(shoeId){
        commentForm.innerText = ''
        commentForm.setAttribute("data-id", shoeId )
        commentForm.innerHTML = 
        `
        <input type="text" placeholder="Add Name">
        <input type="text" placeholder="Add Comment">
        <input type="submit" id="whatever" value="Submit"/>
        `
        
        commentForm.addEventListener('submit', postComment)
        shoePage.appendChild(commentForm)
        
    }
    
    function renderComments(comments){
        commentDiv.innerText = ''
        console.log(comments)
        comments.reverse()
        const ul = document.createElement('ul')
        
        comments.forEach(comment => {
            const li = document.createElement('li')
            li.id = comment.id
            li.innerHTML = `<strong>${comment.name}</strong> - ${comment.content}`
            ul.appendChild(li)
        })
        
        commentDiv.appendChild(ul)
        shoePage.appendChild(commentDiv)
    }
    
    function reRenderShoe(shoeId){
        fetch(`http://localhost:3000/shoes/${shoeId}`)
        .then(r => r.json())
        .then(shoe =>{
            const comments = shoe.comments
            renderComments(comments)
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
        
        reRenderShoe(shoeId)
        
    }
    
});