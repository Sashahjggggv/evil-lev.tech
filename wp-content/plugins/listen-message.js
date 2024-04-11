// init type of page (class on body)
let pageType = ''
if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-20'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-30'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-40'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-50'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-60'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-70'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-80'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-90'
} if (document.body.classList.contains('alex-start-20')) {
  pageType = 'alex-start-100'
}

// message before redir to prev
let windowNotReady = document.querySelector('.message-page-not-ready');

// redir to prev page
function toPreviousPage() {
  windowNotReady.classList.add('active')
  setTimeout(function() {
    // Go back to the previous page in the browser's history
    window.history.back();
  }, 5000); // == 5s
}

// remove blocks
function removeBlocks(currentStage) {
  let blocksForRemoveing = document.querySelector('alex-remove-' + currentStage)
  blocksForRemoveing.classList.add('block-removed');
}

// redir to prev page
function showPageForThisStage(currentStage) {
  let showForStageOf = 'alex-start-'
  if (pageType == showForStageOf + currentStage) {
  } else {
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