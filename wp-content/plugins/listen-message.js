// init type of page (class on body)
let pageType = ''
if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-20'
} if (document.body.classList.contains('alex-start-30')) {
  pageType = 'alex-start-30'
} if (document.body.classList.contains('alex-start-40')) {
  pageType = 'alex-start-40'
} if (document.body.classList.contains('alex-start-50')) {
  pageType = 'alex-start-50'
} if (document.body.classList.contains('alex-start-60')) {
  pageType = 'alex-start-60'
} if (document.body.classList.contains('alex-start-70')) {
  pageType = 'alex-start-70'
} if (document.body.classList.contains('alex-start-80')) {
  pageType = 'alex-start-80'
} if (document.body.classList.contains('alex-start-90')) {
  pageType = 'alex-start-90'
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
function removeBlocks(currentStage) {
  let blocksForRemoveing = document.querySelector('alex-remove-' + currentStage)
  console.log(blocksForRemoveing)
  blocksForRemoveing[0].classList.add('block-removed');
}

// redir to prev page
function showPageForThisStage(currentStage) {
  let showForStageOf = 'alex-start-'
  console.log(pageType)
  if (pageType !== showForStageOf + currentStage || pageType !== '100') {
    toPreviousPage()
  }
}

// Listen message from alex.rv.ua
window.addEventListener('message', function (event) {
  if (event.origin == 'https://alex.rv.ua') {
    // push data of stage every time when message recived
    showPageForThisStage(event.data)
    removeBlocks(event.data)
  }
});