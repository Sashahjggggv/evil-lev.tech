let classMainPages = document.querySelector('.main-page');
let classSecondPages = document.querySelector('.second-page');
let classThirdPages = document.querySelector('.third-page');
let windowNotReady = document.querySelector('.message-page-not-ready');
console.log('20 20 20 20 20 20 20 20 20')

// Listen for the 'message' event
window.addEventListener('message', function (event) {
  // Check the origin to ensure it's from the expected parent window
  if (event.origin === 'https://alex.rv.ua') {
    // Display the received message
    if (event.data == 20) {
      console.log('20 20 20 20 20 20 20 20 20')
      if (classMainPages) {
        console.log('main-page')
      } if (classSecondPages) {
        console.log('second-page')
      } if (classThirdPages) {
        console.log('third-page')
      } else {
        console.error('page have NOT identifier')
      }
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