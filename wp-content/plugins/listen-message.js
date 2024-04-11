// init type of page (class on body)
let pageType = ''
if (document.body.classList.contains('alex-start-20')) {
  pageType = 20
} if (document.body.classList.contains('alex-start-30')) {
  pageType = 30
} if (document.body.classList.contains('alex-start-40')) {
  pageType = 40
} if (document.body.classList.contains('alex-start-50')) {
  pageType = 50
} if (document.body.classList.contains('alex-start-60')) {
  pageType = 60
} if (document.body.classList.contains('alex-start-70')) {
  pageType = 70
} if (document.body.classList.contains('alex-start-80')) {
  pageType = 80
} if (document.body.classList.contains('alex-start-90')) {
  pageType = 90
}

// message before redir to prev
let windowNotReady = document.querySelector('.message-page-not-ready');

// redir to prev page
function toPreviousPage() {
  windowNotReady.classList.add('active')
  setTimeout(function() {
    // Go back to the previous page in the browser's history
    window.location.href = 'https://evil-lev.tech';
  }, 5000); // == 5s
}

// remove blocks
// function removeBlocks(currentStage) {
//   $('.alex-remove-' + currentStage).addClass('block-removed')
// }

// redir to prev page
function showPageForThisStage(currentStage) {
  if (pageType <= currentStage) {
    console.log('page viewed')
  } else {console.log('page redirect to main')}
}

// Listen message from alex.rv.ua
window.addEventListener('message', function (event) {
  if (event.origin == 'https://alex.rv.ua') {
    // push data of stage every time when message recived
    console.dir(event.data)
    showPageForThisStage(event.data)
    // removeBlocks(event.data)
  }
});