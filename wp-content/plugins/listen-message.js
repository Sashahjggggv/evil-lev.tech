// Listen for the 'message' event
window.addEventListener('message', function (event) {
  // Check the origin to ensure it's from the expected parent window
  
  if (event.origin === 'https://alex.rv.ua') {
      // Display the received message
      const bodyElement = document.body;
      let classMainPages = bodyElement.querySelector(`.main`);
      let classSecondPages = bodyElement.querySelector('.second');
      let classThirdPages = bodyElement.querySelector('.third');
      let windowNotReady = bodyElement.querySelector('.page-not-ready');
      if (event.data == 20) {
        document.getElementsByClassName(".header123").classList.add('none')
      } if (event.data == 30) {

      } if (event.data == 50) {
        
      } if (event.data == 60) {
        
      } if (event.data == 70) {
        
      } if (event.data == 80) {
        
      } if (event.data == 90) {
        console.log('recived MESSAGE from parrent is 90')
        
      } if (event.data == 100) {
        
      } else {
        console.error('recived MESSAGE from parrent is NOT RIGHT. event.data is ', event.data)
      }
  }
});