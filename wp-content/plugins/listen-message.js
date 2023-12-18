let pageType = 'none'
if (document.body.classList.contains('main-page')) {
  pageType = 'main-page'
} if (document.body.classList.contains('second-page')) {
  pageType = 'second-page'
} if (document.body.classList.contains('third-page')) {
  pageType = 'third-page'
}
let windowNotReady = document.querySelector('.message-page-not-ready');

function whenThirdPage() {
  windowNotReady.classList.add('active')
  function redirectToPreviousPage() {
    setTimeout(function() {
      // Go back to the previous page in the browser's history
      window.history.back();
    }, 5000);
  }
  redirectToPreviousPage()
}

// Listen message from alex.rv.ua
window.addEventListener('message', function (event) {
  // Check the origin to ensure it's from the expected parent window
  if (event.origin === 'https://alex.rv.ua') {
    // Display the received message
    if (event.data == 20) {
      console.log('20')
      if (pageType == 'main-page') {
        console.log('main-page')
      } if (pageType == 'second-page') {
        console.log('second-page')
      } if (pageType == 'third-page') {
        whenThirdPage()
      }
    } if (event.data == 30) {
      console.log('30')

    } if (event.data == 50) {
      console.log('50')
      
    } if (event.data == 60) {
      console.log('60')
      
    } if (event.data == 70) {
      console.log('70')
      
    } if (event.data == 80) {
      console.log('80')
      
    } if (event.data == 90) {
      console.log('90')

    } if (event.data == 100) {
      console.log('100')
    }
  }
});