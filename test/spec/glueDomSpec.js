/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

describe("glue.dom.js ..............................................................", function() {

  describe("glue(..).remove()", function() {
    it("Remove elements", function() {
      var count_pre, count_post;
      appendElement('remove');
      count_pre = getNumberOfBodyChilden();
      glue('body p.remove').remove();
      count_post = getNumberOfBodyChilden();

      expect(count_pre - 1).toEqual(count_post);
    });
  });
  
  describe("glue(..).append()", function() {
    it("Append elements to other elements", function() {
      glue('body').append('<p class="append">append</p>');
      var body = document.getElementsByTagName('body')[0];
      var className = body.lastChild.className;

      expect(className).toEqual("append");

      glue('body p.append').remove();
    });
  });
  
  describe("glue(..).prepend()", function() {
    it("Prepend elements to other elements", function() {
      glue('body').prepend('<p class="prepend">prepend</p>');
      var body = document.getElementsByTagName('body')[0];
      var className = body.firstChild.className;

      expect(className).toEqual("prepend");

      glue('body p.prepend').remove();
    });
  });

  describe("glue(..).css()", function() {

    it("Get CSS property", function() {
      glue('body').append('<p class="css" style="position:absolute">css</p>');
      var position = glue('body p.css').css('position');

      expect(position).toEqual("absolute");

      glue('body p.css').remove();
    });

    it("Set single CSS property", function() {
      glue('body').append('<p class="css">css</p>');
      glue('body p.css').css('position', 'absolute');
      var position = glue('body p.css').css('position');

      expect(position).toEqual("absolute");

      glue('body p.css').remove();
    });

    it("Set multiple CSS properties", function() {
      glue('body').append('<p class="css">css</p>');
      glue('body p.css').css({
        'position': 'absolute',
        'display': 'none'
      });
      var position = glue('body p.css').css('position');
      var display = glue('body p.css').css('display');

      expect(position + ' ' + display).toEqual("absolute none");

      glue('body p.css').remove();
    });

    it("Set CSS property to none exist element", function() {
      var noneExistElement = glue('body dl').css('display');
      expect(noneExistElement.length).toBe(0);
    });

    /*
		describe("Only for increasing Code Coverage in non msie browser!!", function() {

      it(" Simulate IEs currentStyle", function() {
        glue.isTest = true;
        document.documentElement.currentStyle = [];
        Element.prototype.currentStyle = [];
        Element.prototype.currentStyle.position = 'dummy';
        glue('body').append('<p class="ie"></p>');
        var position = glue('body p.ie').css('position');
        expect(position).toBe('dummy');
        glue.isTest = false;
        glue('body p.ie').remove();
      });

      it("Simulate IEs currentStyle (float)", function() {
        glue.isTest = true;
        document.documentElement.currentStyle = [];
        Element.prototype.currentStyle = [];
        glue('body').append('<p class="ie"></p>');
        var position = glue('body p.ie').css('float');
        expect(position).toBe(null);
        glue.isTest = false;
        glue('body p.ie').remove();
      });

      it(" Simulate IEs currentStyle (with '-' property)", function() {
        glue.isTest = true;
        document.documentElement.currentStyle = [];
        Element.prototype.currentStyle = [];
        glue('body').append('<p class="ie"></p>');
        var backgroundImage = glue('body p.ie').css('background-image');
        expect(backgroundImage).toBe(null);
        glue.isTest = false;
        glue('body p.ie').remove();
      });

    });
		*/

  });
  
  describe("glue(..).html()", function() {

    it("Get node content", function() {
      glue('body').append('<p class="html">markup</p>');
      var html = glue('body p.html').html();

      expect(html).toEqual("markup");

      glue('body p.html').remove();
    });

    it("Set node content", function() {
      glue('body').append('<p class="html"></p>');
      glue('body p.html').html('markup');
      var html = glue('body p.html').html();

      expect(html).toEqual("markup");

      glue('body p.html').remove();
    });
  
  }); 

  describe("glue(..).attr()", function() {

    it("Get element attribute value", function() {
      glue('body').append('<p class="html" title="markup">markup</p>');
      var title = glue('body p.html').attr('title');

      expect(title).toEqual("markup");

      glue('body p.html').remove();
    });

    it("Set element attribute value", function() {
      glue('body').append('<p class="html">markup</p>');
      glue('body p.html').attr('title', 'markup');
      var title = glue('body p.html').attr('title');

      expect(title).toEqual("markup");

      glue('body p.html').remove();
    });

  });
  
  describe("glue(..).hide()", function() {

    it("Hide element", function() {
      glue('body').append('<p class="hide">hide</p>');
      glue('body p.hide').hide();
      var display = glue('body p.hide').css('display');

      expect(display).toEqual("none");

      glue('body p.hide').remove();
    });

  });

  describe("glue(..).show()", function() {

    it("Show element", function() {
      glue('body').append('<p class="show" style="display:none">show</p>');
      glue('body p.show').show();
      var display = glue('body p.show').css('display');

      expect(display).toEqual("block");

      glue('body p.show').remove();
    });

  });

  describe("glue(..).toggle()", function() {

    it("Toggle element", function() {
      glue('body').append('<p class="toggle">toggle</p>');
      glue('body p.toggle').toggle();
      var display1 = glue('body p.toggle').css('display');
      glue('body p.toggle').toggle();
      var display2 = glue('body p.toggle').css('display');

      expect(display1 + display2).toEqual("noneblock");

      glue('body p.toggle').remove();
    });

  });

  describe("glue(..).find()", function() {

    it("'this' is a selector string", function() {
      glue('body').append('<p class="find">FIND</p>');
      var html = glue('body').find('p.find').html();
      expect(html).toEqual("FIND");
      glue('body p.find').remove();
    });

    it("'this' is an element object'", function() {
      glue('body').append('<div><p id="find">FIND</p></div>');
      var body = document.getElementsByTagName('body')[0];
      var html = glue(body).find('p#find').html();
      expect(html).toEqual("FIND");
      glue('body p#find').remove();
    });

  });

  describe("glue.parseHTML()", function() {
    it("Create DOM element from string", function() {
      var domObject = glue.parseHTML('<p/>');
      var objectType = Object.prototype.toString.call(domObject);
      expect(objectType).toEqual("[object HTMLParagraphElement]");

    });
  });
  
});
