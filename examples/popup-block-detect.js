const btn = document.querySelector('#btn');

btn.addEventListener('click', function () {
  const popupWindow = window.open('https://www.naver.com');
  setTimeout(() => {
    if (!hasPopupBlocker(popupWindow)) {
      return;
    }
    alert('Popup is blocked!');
  }, 100);
});

function hasPopupBlocker(poppedWindow) {
  let result = false;

  try {
    if (typeof poppedWindow === 'undefined') {
      // Safari with popup blocker... leaves the popup window handle undefined
      result = true;
    }
    else if (poppedWindow && poppedWindow.closed) {
      // This happens if the user opens and closes the client window...
      // Confusing because the handle is still available, but it's in a "closed" state.
      // We're not saying that the window is not being blocked, we're just saying
      // that the window has been closed before the test could be run.
      result = false;
    }
    else if (poppedWindow && poppedWindow.test) {
      // This is the actual test. The client window should be fine.
      result = false;
    }
    else {
      // Else we'll assume the window is not OK
      result = true;
    }

  } catch (err) {
    //if (console) {
    //    console.warn("Could not access popup window", err);
    //}
  }
  return result;
}
