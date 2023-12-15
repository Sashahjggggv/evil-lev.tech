// let classMainPages = document.body.querySelector('.main');
// let classSecondPages = document.body.querySelector('.second');
// let classThirdPages = document.body.querySelector('.third');
// let windowNotReady = document.body.querySelector('.page-not-ready');
let header123 = document.querySelector('.header123')
header123.classList.add('none')
console.log('success.........')

// Listen for the 'message' event
window.addEventListener('message', function (event) {
  // Check the origin to ensure it's from the expected parent window
  if (event.origin === 'https://alex.rv.ua') {
    // Display the received message
    if (event.data == 20) {
      
    } if (event.data == 30) {

    } if (event.data == 50) {
      
    } if (event.data == 60) {
      
    } if (event.data == 70) {
      
    } if (event.data == 80) {
      
    } if (event.data == 90) {
      console.log('recived MESSAGE from parrent is 90')
    } if (event.data == 100) {
      
    }
  }
});