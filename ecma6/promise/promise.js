(function () {
  'use strict';

  var promiseCount = 0;
  var log = document.getElementById('log');

  function testPromise() {
    var thisPromiseCount = ++promiseCount;

    var log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Started (<small>Sync code started</small>)<br>');

    // We make a new promise: we promise the string 'result' (after waiting 3s)
    var p1 = new Promise(
      // The resolver function is called with the ability to resolve or
      // reject the promise
      function(resolve, reject) {
        log.insertAdjacentHTML('beforeend', thisPromiseCount +
          ') Promise started (<small>Async code started</small>)<br>');
        // This only is an example to create asynchronism
        window.setTimeout(
          function() {
            // We fulfill the promise!
            resolve(thisPromiseCount);
            // We reject the promise!
            //reject(thisPromiseCount);
          }, Math.random() * 2000 + 1000);
      });

    // We define what to do when the promise is fulfilled
    // but we only call this if the promise is resolved/fulfilled
    p1.then(
      // Just log the message and a value
      function(val) {
        log.insertAdjacentHTML('beforeend', val + ') Promise fulfilled 1 (<small>Async code terminated</small>)<br>');
        return val;
      })
      .catch(
      // Rejected promises are passed on by Promise.prototype.then(onFulfilled)
      function(reason) {
        log.insertAdjacentHTML('beforeend', 'Handle rejected promise 1 (' + reason + ') here <br>');
        return reason;
      })
      .then(
      function(val) {
        // val, value coming from line 36. Because a fulfilled promise was handled the next promise
        // resolves to the return value of the called handler. If there is no return in line 36, here, val would be
        // undefined :(

        // val, value coming from line 42. If there is no return in line 42, here, val would be undefined :(
        log.insertAdjacentHTML('beforeend', val + ') Promise fulfilled 2 (<small>Async code terminated</small>)<br>');
      })
      .catch(
      function(reason) {
        // It is never used because the return value from catch goes to the onFulfilled callback in line 45 :(
        log.insertAdjacentHTML('beforeend', 'Handle rejected promise 2 (' + reason + ') here <br>');
      }
    );

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
      ') Promise made (<small>Sync code terminated</small>)<br>');
  }

  if ('Promise' in window) {
    var btn = document.getElementById('btn');
    btn.addEventListener('click', testPromise);
  }
  else {
    log.innerHTML = 'Live example not available as your browser does not support the <code>Promise</code> interface.';
  }

}());
