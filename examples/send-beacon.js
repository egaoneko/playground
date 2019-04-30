const key = `smilecat-beacon-${new Date().toISOString().split('T')[0]}`;
const putsReqUrl = `https://putsreq.herokuapp.com/${key}`;
const putsReqInspectUrl = `${putsReqUrl}/inspect`;

document.querySelector('#inspect-link')
  .addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    location.href = putsReqInspectUrl;
  });

document.querySelector('#send-beacon-1')
  .addEventListener('click', () => {
    if (!('sendBeacon' in navigator)) {
      alert('Not support sendBeacon in this browser.');
    }

    sendBeacon(putsReqUrl, `Just sent by a beacon! @${new Date()}`);
  });

document.querySelector('#send-beacon-2')
  .addEventListener('click', () => {
    if (!('sendBeacon' in navigator)) {
      alert('Not support sendBeacon in this browser.');
    }

    window.addEventListener('beforeunload', function() {
      sendBeacon(putsReqUrl, `Sent by a beacon when beforeunload! @${new Date()}`);
    }, false);
  });

document.querySelector('#send-beacon-3')
  .addEventListener('click', () => {
    if (!('sendBeacon' in navigator)) {
      alert('Not support sendBeacon in this browser.');
    }

    window.addEventListener('unload', function() {
      sendBeacon(putsReqUrl, `Sent by a beacon when unload! @${new Date()}`);
    }, false);
  });

document.querySelector('#send-beacon-4')
  .addEventListener('click', () => {
    if (!('sendBeacon' in navigator)) {
      alert('Not support sendBeacon in this browser.');
    }

    window.addEventListener('pagehide', function() {
      sendBeacon(putsReqUrl, `Sent by a beacon when pagehide! @${new Date()}`);
    }, false);
  });

document.querySelector('#async-xmlhttprequest')
  .addEventListener('click', () => {
    window.addEventListener('beforeunload', function() {
      sendXMLHttpRequest(putsReqUrl, `Sent by a async XMLHttpRequest when beforeunload! @${new Date()}`, true);
    }, false);
  });

document.querySelector('#sync-xmlhttprequest')
  .addEventListener('click', () => {
    window.addEventListener('beforeunload', function() {
      sendXMLHttpRequest(putsReqUrl, `Sent by a sync XMLHttpRequest when beforeunload! @${new Date()}`, false);
    }, false);
  });

function sendBeacon(url, data) {
  navigator.sendBeacon(url, data);
}

function sendXMLHttpRequest(url, data, async) {
  const client = new XMLHttpRequest();
  client.open("POST", url, async);
  client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  client.send(data);
}
