/*jslint browser:true */
/*global describe:true, it:true, expect:true, glue:true */

describe("glue.misc.js > > > > > ", function () {

  describe("glue(x).times()", function() {
    it("Repeat functions x times", function () {
    
      var result = 0;
      glue(4).times(function(index){
        result+=index;
      });
    
      expect(result).toBe(6);

    });
  });
      
  describe("glue.escapeURL()", function() {
    it("Escape URL", function () {
      
      var escapedURL = glue.escapeURL('~!@#$%^&*(){}[]=:/,;?+\'"\\');

      expect(escapedURL).toBe("~!%40%23%24%25%5E%26*()%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B'%22%5C");

    });
  });
      
  describe("glue.escapeHTML()", function() {
    it("Escape HTML", function () {
      
      var escapedHTML = glue.escapeHTML('<h1>&</h1>');

      expect(escapedHTML).toBe("&lt;h1&gt;&amp;&lt;/h1&gt;");

    });
  });
      
  describe("glue.uniqueId()", function() {
    it("Create unique Id", function () {
      
      var uniqueId = glue.uniqueId('id-');

      expect(uniqueId).toBe("id-1");

    });
  });
      
  describe("glue.random()", function() {
    it("Create random number between given min and max values", function () {
      
      var number = glue.random(100, 200);

      expect(number).toBeGreaterThan(99);
      expect(number).toBeLessThan(201);

    });
  });
      
  describe("glue.defer()", function() {
    it("Invoking a function until the current call stack has cleared", function () {
      
      // bad!!
			glue.defer(function(){
        var xxx = 'yyy';
        expect(xxx).toBe('yyy');
      });
      
    });
  });
	
  describe("glue.lazy()", function() {
    it("Lazy invoking a function", function () {
      
      // bad!!
      glue(2000).lazy(function(){
        var xxx = 'yyy';
        expect(xxx).toBe('yyy');
      });
      
    });
  });	
      
});
