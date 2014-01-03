/**
 * Basic implementation of promises
*/

(function(glue) {

  function Promise() {
    this.callbacks = [];
  }

  Promise.prototype = {
    
    then : function(func, context) {
      var fn;
      if (this.isdone) {
        fn = func.apply(context, this.args);
        this.isdone = false;
      } else {
        fn = new Promise();
        this.callbacks.push(function() {
          var fnc = func.apply(context, arguments);
          if (fnc && typeof fnc.then === 'function') {
            fnc.then(fn.done, fn);
          }
        });
      }
      return fn;
    },

    done : function() {
      this.args = arguments;
      this.isdone = true;
      for (var i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i].apply(null, arguments);
      }
      this.callbacks = [];
    }
    
  };
  

  /** PUBLIC ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼ */
    
  glue.promise = function() {
    return new Promise();
  };

  /** END PUBLIC ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼ */

})(glue);
