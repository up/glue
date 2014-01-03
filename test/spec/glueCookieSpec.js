/*jslint browser:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

describe("glue.cookie.js > > > > > ", function () {

  afterEach(function () {
    //glue.removeCookie('foo');
  });

  describe("glue.cookie()", function() {
    it("Set cookie without options", function () {
      
      glue.cookie('foo1', 'foobar1');
      var value = glue.cookie('foo1');
   
      expect(value).toBe('foobar1');

    });
    
    it("Set cookie with options", function () {
      glue.cookie('foo2', 'foobar2', {
        expires: 1,
        path: '/'
      });
      var value = glue.cookie('foo2');
   
      expect(value).toBe('foobar2');

    });
    
    it("Set cookie with empty key", function () {
      var value = glue.cookie('');
   
      expect(value).toBe('undefined');

    });
    
    it("Set cookie with expires string (create session cookie)", function () {
      // How check if session cookie?
      glue.cookie('foo2', 'foobar2', {
        expires: 1,
        path: '/',
        domain: location.host
      });
      var value = glue.cookie('foo2');
   
      expect(value).toBe('foobar2');

    });
    
    it("Get all cookies as plain object", function () {
      var value = JSON.stringify(glue.cookie()).replace(/\s+/g, '');
      var object = { foo1 : 'foobar1', foo2 : 'foobar2' };
   
      expect(value).toEqual(JSON.stringify(object));
    });
    
    it("Get cookie", function () {
      var value = glue.cookie('foo1');
   
      expect(value).toBe('foobar1');
    });
  });
      
  describe("glue.removeCookie()", function() {
    it("Remove cookie", function () {

      expect(glue.removeCookie('foo1')).toBe(false);

    });
		
    it("Remove cookie", function () {

      expect(glue.removeCookie('nonexists')).toBe(false);

    });
 });
      
});
