// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

// const channels = require.context('.', true, /_channel\.js$/)
// channels.keys().forEach(channels)

document.addEventListener("DOMContentLoaded", function() {
    const testDiv = document.createElement('div')

    function myFunction() {
        var createdShoe = document.getElementById("createshoe").target;
        document.getElementById("demo").innerHTML = createdShoe;
    }




});