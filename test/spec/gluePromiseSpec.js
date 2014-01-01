/*jslint browser:true */
/*global describe:true, it:true, expect:true, glue:true */

describe("glue.promise.js ..............................................................", function () {

  var xxx = 0;
  
  function wait(delay) {
    xxx = delay;
      var promise = glue.promise();
      setTimeout(function() {
          promise.done(null, delay);
      }, delay);
      return promise;
  }

  wait(2)
  .then(
      function(err, delay) {
          return wait(delay + 2);
      }
  );

  describe("glue.promise()", function() {
    it("Initialize new promise", function () {
          
      expect(xxx).toBe(4);  
          
    });
  });
            
});
