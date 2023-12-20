// init type of page
let pageType = 'none'
if (document.body.classList.contains('main-page')) {
  pageType = 'main-page'
} if (document.body.classList.contains('second-page')) {
  pageType = 'second-page'
} if (document.body.classList.contains('third-page')) {
  pageType = 'third-page'
}

// message before redir to prev
let windowNotReady = document.querySelector('.message-page-not-ready');

// redir to prev page
function toPreviousPage() {
  windowNotReady.classList.add('active')
  function redirectToPreviousPage() {
    setTimeout(function() {
      // Go back to the previous page in the browser's history
      window.history.back();
    }, 5000);
  }
  redirectToPreviousPage()
}

// remove blocks with class "classOfBlocks""
function removeBlocks(classOfBlocks) {
  document.querySelector(classOfBlocks).classList.add('block-removed');
}

// redir to prev page when class of body is 
function redirToPrewWhenBodyClassIs(bodyClass) {
  if (pageType == bodyClass) {
    toPreviousPage()
  }
}

// Listen message from alex.rv.ua
window.addEventListener('message', function (event) {
  // Check the origin to ensure it's from the expected parent window
  if (event.origin === 'https://alex.rv.ua') {
    // Display the received message
    if (event.data == 20) {
      if (pageType == 'main-page') {
        removeBlocks('hide-for-twenty-percent-stage')
      } if (pageType == 'second-page') {
        toPreviousPage()
      } if (pageType == 'third-page') {
        toPreviousPage()
      }
    } if (event.data == 30) {
      if (pageType == 'main-page') {
        removeBlocks('hide-for-thirty-percent-stage')
      } if (pageType == 'second-page') {
        toPreviousPage()
      } if (pageType == 'third-page') {
        toPreviousPage()
      }
    } if (event.data == 50) {
      if (pageType == 'main-page') {
        removeBlocks('hide-for-fifty-percent-stage')
      } if (pageType == 'second-page') {
        toPreviousPage()
      } if (pageType == 'third-page') {
        toPreviousPage()
      }
    } if (event.data == 60) {
      if (pageType == 'main-page') {
        // do nothing
      } if (pageType == 'second-page') {
        redirToPrewWhenBodyClassIs('hide-for-sixty-percent-stage')
      } if (pageType == 'third-page') {
        toPreviousPage()
      }
    } if (event.data == 70) {
      if (pageType == 'main-page') {
        // do nothing
      } if (pageType == 'second-page') {
        redirToPrewWhenBodyClassIs('hide-for-seventy-percent-stage')
      } if (pageType == 'third-page') {
        toPreviousPage()
      }
    } if (event.data == 80) {
      if (pageType == 'main-page') {
        // do nothing
      } if (pageType == 'second-page') {
        redirToPrewWhenBodyClassIs('hide-for-eighty-percent-stage')
      } if (pageType == 'third-page') {
        toPreviousPage()
      }
    } if (event.data == 90) {
      if (pageType == 'main-page') {
        // do nothing
      } if (pageType == 'second-page') {
        // do nothing
      } if (pageType == 'third-page') {
        redirToPrewWhenBodyClassIs('hide-for-ninety-percent-stage')
      }
    } if (event.data == 100) {
      if (pageType == 'main-page') {
        // do nothing
      } if (pageType == 'second-page') {
        // do nothing
      } if (pageType == 'third-page') {
        // do nothing
      }
    }
  }
});