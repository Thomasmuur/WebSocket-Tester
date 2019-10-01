var socket;

function connect() {
  if (document.getElementById('websocket_url').value === '') return;
  socket = new WebSocket(document.getElementById('websocket_url').value);
  nextCode();
}

function nextCode() {
  // Connection opened
  socket.addEventListener('open', function (event) {
      showConsole('debug', 'Succesfully connected.');
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
      showConsole('debug', JSON.stringify(JSON.parse(event.data), null, 4))
  });

  // Listen for connection close
  socket.addEventListener('close', function (event) {
    showConsole('warn', 'Connection closed.')
  });

  socket.addEventListener('error', function (event) {
    showConsole('error', event)
  })
}

function showConsole(type, message) {
  var msg = document.createElement('span');
  msg.innerHTML = message;
  switch(type) {
    case 'debug':
    msg.classList.add('debug');
    break;
    case 'info':
    msg.classList.add('info');
    break;
    case 'warn':
    msg.classList.add('warn');
    break;
    case 'error':
    msg.classList.add('error');
    break;
  }
  document.getElementById('code_console').appendChild(msg);
  var breakline = document.createElement('br');
  document.getElementById('code_console').appendChild(breakline);
}
