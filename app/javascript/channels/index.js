// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

// const channels = require.context('.', true, /_channel\.js$/)
// channels.keys().forEach(channels)

document.addEventListener("DOMContentLoaded", function() {
    const testDiv = document.createElement('div')

    fetchShoes().then(renderShoes)

    let shoeHype;

    const shoeList = document.getElementById('list')
    const shoePage = document.getElementById('show-panel')

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
        shoeHype = shoe.hype_count

        let hypeCounter = document.createElement('h1')
        hypeCounter.innerText = shoeHype
        shoePage.appendChild(hypeCounter)

 
        
        hypeButton = document.createElement('button')
        hypeButton.innerText = 'Add Hype'
        hypeButton.addEventListener('click', function(e){ 

            hypeCounter.innerText = shoeHype++
        })
        shoePage.appendChild(hypeButton)
    }

    // function renderHype(e){
    //     console.log(e)
    //     shoeHype++

    // }









});