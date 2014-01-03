/*jslint browser:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

describe("glue.utilities.js > > > > > ", function () {

  describe("glue.extend()", function() {
    it("Merge the contents of two or more objects together into the first object.", function () {
      var one = {
        a: 1,
        b: 2,
        c: {
          d: 3
        }
      };

      var two = {
        a: 4,
        c: {
          d: 5,
          e: 6
        },
        f: 7
      };

      var merged = glue.extend(one, two);        
    
      expect(JSON.stringify(merged)).toEqual('{"a":4,"b":2,"c":{"d":5,"e":6},"f":7}');

    });
  });
  
  describe("glue.each()", function() {
    it("Iterate over plain object", function () {
      var obj = {
        text1:'Hello ',
        text2:'World!'
      };
      var result = '';
 
      glue.each(obj, function(key, value) {
        result+= value;
      });    
      expect(result).toEqual('Hello World!');
    });

    it("Iterate over array", function () {
      var arr = [
        'Hello ', 'World!'
      ];
      var result = '';
 
      glue.each(arr, function(index, item) {
        result+= item;
      });    
      expect(result).toEqual('Hello World!');
    });

  });
  
  describe("glue.has()", function() {
    it("Check if object has a key", function () {
      var obj = { a:0 };
      var has =   glue.has(obj, 'a');

      expect(has).toBeTruthy();
    });
    
    it("Check if object has NOT a key", function () {
      var obj = { a:0 };
      var has =   glue.has(obj, 'b');

      expect(has).toBeFalsy();
    });
    
  });
      
  describe("glue.isPlainObject()", function() {
    it("Check if object is a plain Object with 'glue.isPlainObject()'", function () {
      var obj = {
        a: 1,
        b: ['a', 'b']
      };
      var isPlainObject = glue.isPlainObject(obj);
      expect(isPlainObject).toBeTruthy();
    });
    
    it("Check if object is NOT a plain Object", function () {
      var obj = ['a', 'b'];
      var isPlainObject = glue.isPlainObject(obj);
      expect(isPlainObject).toBeFalsy();
    });
  });
  
  describe("glue.isEmptyObject()", function() {
    it("Check if object is an empty plain object", function () {
      var obj = {};
      var isEmptyObject = glue.isEmptyObject(obj);
      expect(isEmptyObject).toBeTruthy();
    });
    
    it("Check if object is NOT an empty plain object", function () {
      var obj = { a: 1 };
      var isEmptyObject = glue.isEmptyObject(obj);
      expect(isEmptyObject).toBeFalsy();
    });
  });
    
  describe("glue.isString()", function() {
    it("Check if object is a string", function () {
      var str = 'abc def';
      var isString = glue.isString(str);
      expect(isString).toBeTruthy();
    });
    
    it("Check if object is NOT a string", function () {
      var str = 123456;
      var isString = glue.isString(str);
      expect(isString).toBeFalsy();
    });
  });
      
  describe("glue.isNumeric()", function() {
    it("Check if object is numeric", function () {
      var num = 123456;
      var isNumeric = glue.isNumeric(num);
      expect(isNumeric).toBeTruthy();
    });
    
    it("Check if object is NOT numeric", function () {
      var num = 'abc def';
      var isNumeric = glue.isNumeric(num);
      expect(isNumeric).toBeFalsy();
    });
  });
      
  describe("glue.isNumeric()", function() {
    it("Check if object is numeric", function () {
      var num = 123456;
      var isNumeric = glue.isNumeric(num);
      expect(isNumeric).toBeTruthy();
    });
    
    it("Check if object is NOT numeric", function () {
      var num = 'abc def';
      var isNumeric = glue.isNumeric(num);
      expect(isNumeric).toBeFalsy();
    });
  });
      
  describe("glue.isNull()", function() {
    it("Check if object is Null", function () {
      var val = null;
      var isNull = glue.isNull(val);
      expect(isNull).toBeTruthy();
    });
    
    it("Check if object is NOT Null", function () {
      var val = 1;
      var isNull = glue.isNull(val);
      expect(isNull).toBeFalsy();
    });
  });
      
  describe("glue.isBoolean()", function() {
    it("Check if object is a boolean", function () {
      var bool = true;
      var isBoolean = glue.isBoolean(bool);
      expect(isBoolean).toBeTruthy();
    });
    
    it("Check if object is NOT a boolean", function () {
      var bool = 'abc def';
      var isBoolean = glue.isBoolean(bool);
      expect(isBoolean).toBeFalsy();
    });
  });
      
  describe("glue.isFunction()", function() {
    it("Check if object is a function", function () {
      var fn = function(){};
      var isFunction = glue.isFunction(fn);
      expect(isFunction).toBeTruthy();
    });
    
    it("Check if object is NOT a function", function () {
      var fn = {};
      var isFunction = glue.isFunction(fn);
      expect(isFunction).toBeFalsy();
    });
  });
          
  describe("glue.isMobile()", function() {
    it("Check if the current browser is mobile device browser", function () {
      var isMobile = glue.isMobile();
      expect(isMobile).toBeFalsy();
    });
    
  });
          
});
