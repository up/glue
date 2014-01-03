/*jslint browser:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

describe("glue.core.js > > > > > ", function () {

  describe("glue(..)", function() {
    it("Pass selector", function () {
      appendElement('select');
    
      var nodeName = glue('body p.select')[0].nodeName.toUpperCase();
    
      expect(nodeName).toEqual('P');

      glue('body p.select').remove();
    });
    
    it("Pass number", function () {
    
      var obj = glue(4);
      expect(obj[0]).toBe(4);

    });
    
    it("Pass function", function () {
    
      glue(function(){
        window.dummy = 'ready-shortcut';
      });
      expect(window.dummy).toEqual('ready-shortcut');

    });
    
    it("Pass boolean (should do nothing)", function () {
    
      var bool = true;
      var obj = glue(bool);
      var objectType = typeof obj[0];
    
      expect(objectType).toBe('undefined');

    });

  });
  
  describe("glue.(..).get()", function() {
    
    it("Call without index", function () {
      var body = glue('body').get();

      expect(typeof body).toBe('object');
    });

    it("Call with index = 0", function () {
      var body = glue('body').get(0);
    
      expect(document.getElementsByTagName('body')[0]).toBe(body);
    });
    
    it("Call with index = -1", function () {
      var body = glue('body').get(-1);
    
      expect(document.getElementsByTagName('body')[0]).toBe(body);
    });
  
    it("Call not exist element", function () {
      var aside = glue('aside').get(0);
      expect(aside).toBe(undefined);
    });
    
  });

  describe("glue(..).each()", function() {
    
    it("Iterate over a glue object, executing a function for each matched element.", function () {
      appendElement('blah');
      appendElement('blah');
      appendElement('blah');
    
      var result = '';
      glue('body p.blah').each(function(){
        result+= this.innerHTML;
      });
    
      expect(result).toEqual('blahblahblah');

      glue('body p.blah').remove();
    });
  
  });
  
  describe("glue.fn.extend()", function() {
    
    it("Merge the contents of an object onto the glue prototype to provide new glue instance methods.", function () {
      glue.fn.extend({
        invisible : function() {
          return this.css('visibility', 'hidden');
        }
      });
    
      appendElement('each');
      glue('body p.each').invisible();
      var visibility = glue('body p.each').css('visibility');
    
      expect(visibility).toEqual('hidden');

      glue('body p.each').remove();
      
    });
  
    it("Prevent error if calling without vallue", function () {
      var api = apiToNameArray();
      var len1 = api.length;
      glue.fn.extend();
      var len2 = api.length;  
      
      expect(len1).toEqual(len2);
    });
  
  });
    
  describe("glue.getSelector()", function() {
    it("Get 'this' cached selector string", function () {
      var body = glue('body');
      var baseSelector = glue.getSelector();

      expect(baseSelector).toBe('body');
    });
  });
  
});
