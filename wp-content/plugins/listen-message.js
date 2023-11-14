// Listen for the 'message' event
window.addEventListener('message', function (event) {
  // Check the origin to ensure it's from the expected parent window
  if (event.origin === 'https://alex.rv.ua') {
      // Display the received message
      alert('Received message in iframe: ' + event.data);
  }
});