let thisDomain = 'https://evil-lev.tech'

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
} if (document.body.classList.contains('alex-start-100')) {
  pageType = 100
}

// message before redir to prev
let windowNotReady = document.querySelector('.message-page-not-ready');

// redir to prev page
let goHomeTimeout = undefined
function goHome() {
  windowNotReady.classList.add('active')
  goHomeTimeout = setTimeout(function() {
    // go home
    window.location.href = thisDomain;
  }, 10000); // == 10s
}
function stopGoingHome() {
  windowNotReady.classList.remove('active')
  clearTimeout(goHomeTimeout)
}

// redir to home page
function showPageForThisStage(currentStage) {
  if (pageType <= currentStage || pageType == 100) {
    stopGoingHome()
  } else {goHome()}
}

// remove blocks
function removeBlocks(currentStage) {
  if (document.getElementsByClassName('alex-remove-20').length) {
    document.getElementsByClassName('alex-remove-20').forEach((element) => element.classList.add("block-removed"))
  }
  // $('.alex-remove-' + currentStage).addClass('block-removed')
}

// Listen message from alex.rv.ua
window.addEventListener('message', function (event) {
  if (event.origin == 'https://alex.rv.ua') {
    // push data of stage every time when message recived
    showPageForThisStage(event.data)
    removeBlocks(event.data)
  }
});