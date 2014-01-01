/*
 *  See https://github.com/stackp/promisejs
 */

(function(glue) {

  function Promise() {
    this.callbacks = [];
  }

  Promise.prototype.then = function(func, context) {
    var p;
    if (this.isdone) {
      p = func.apply(context, this.args);
    } else {
      p = new Promise();
      this.callbacks.push(function() {
        var res = func.apply(context, arguments);
        if (res && typeof res.then === 'function') {
          res.then(p.done, p);
        }
      });
    }
    return p;
  };

  Promise.prototype.done = function() {
    this.args = arguments;
    this.isdone = true;
    for (var i = 0; i < this.callbacks.length; i++) {
      this.callbacks[i].apply(null, arguments);
    }
    this.callbacks = [];
  };

  glue.promise = function() {
    return new Promise();
  };

})(glue);
