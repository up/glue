/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

describe("glue.ajax.js > > > > > ", function () {
  
  describe("glue.ajax()", function() {
    it("HTML", function () {
    
      glue.ajax('html/ajax/test.htm', {
        dataType: 'html',
        success: function( data ) {
          expect(data).toEqual('<div>TEST</div>');
        }
      });

    });
  
    it("XML", function () {
    
      glue.ajax('html/ajax/test.htm', {
        dataType: 'xml',
        success: function( data ) {
          expect(typeof data).toEqual('object');
        }
      });

    });
  
    it("JSON", function () {
    
      glue.ajax('html/ajax/test.json.php', {
        dataType: 'json',
        success: function( data ) {
          expect(data.one).toEqual(1);
        }
      });

    });
  
    it("SCRIPT", function () {
    
      glue.ajax('html/ajax/test.js', {
        dataType: 'script',
        success: function() {
          expect(the_answer).toEqual(42);
        }
      });

    });
    
    it("Error callback", function () {
    
      glue.ajax('html/ajax/test33.htm', {
        dataType: 'html',
        error: function(msg) {
          expect(msg).toBe('ERROR');
        }
      });

    });
  
  });

  describe("glue.get()", function() {
    it("Get data", function () {
    
      glue.get('html/ajax/test.htm', function( data ) {
        expect(data).toEqual('<div>TEST</div>');
      });
    
    });

  });

  describe("glue.post()", function() {
    it("Post data", function () {
    
      glue.post("html/ajax/test.php", 'user=Bill', function(data){
        expect(data).toEqual('Bill');
      });    
    
    });
  });

  describe("glue.getScript", function() {
    it("Load script", function () {
    
      glue.getScript('html/ajax/test.js', function() {
        expect(the_answer).toEqual(42);
      });
    
    });
  });

  describe("glue(form).serialize()", function() {
    it("Serialize form values'", function () {
      glue('body').append('<form id="serialize"><input id="user" name="user" type="text" value="Bill" /></form>');
    
      var data = glue('body form#serialize').serialize();
      expect(data.user).toEqual('Bill');
      glue('#serialize').remove();
    });
  });
    
});
