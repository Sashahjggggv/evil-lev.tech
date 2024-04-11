// init type of page (class on body)
let pageType = ''

// message before redir to prev
let windowNotReady = document.querySelector('.message-page-not-ready');

// redir to prev page
function toPreviousPage() {
  windowNotReady.classList.add('active')
  function redirectToPreviousPage() {
    setTimeout(function() {
      // Go back to the previous page in the browser's history
      window.history.back();
    }, 5000); // == 5s
  }
  redirectToPreviousPage()
}

// remove blocks
function removeBlocks(currentStage) {
  let blocksForRemoveing = document.querySelector('alex-remove-' + currentStage)
  blocksForRemoveing.classList.add('block-removed');
}

// redir to prev page
function showPageForThisStage(currentStage) {
  let showForStageOf = 'alex-start-'
  if (pageType !== showForStageOf + currentStage || pageType !== showForStageOf + (currentStage - 10 ) || pageType !== showForStageOf + (currentStage - 20 ) || pageType !== showForStageOf + (currentStage - 30 ) || pageType !== showForStageOf + (currentStage - 40 ) || pageType !== showForStageOf + (currentStage - 50 ) || pageType !== showForStageOf + (currentStage - 60 ) || pageType !== showForStageOf + (currentStage - 70 )) {
    toPreviousPage()
  }
}

// Listen message from alex.rv.ua
window.addEventListener('message', function (event) {
  console.log('eveln.origin is ' + event.origin)
  if (event.origin == 'https://alex.rv.ua') {
    // push data of stage every time when message recived
    showPageForThisStage(event.data)
    removeBlocks(event.data)
    console.log(event.data + ' - message from alex.rv.ua')
  }
});