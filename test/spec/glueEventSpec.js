/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

describe("glue.event.js ............................................................", function () {
  
  describe("glue(..).on()", function() {
    it("Attach an event handler function for one or more events to the selected elements.", function () {
      appendElement('select');
    
      var select = glue('body p.select');
    
      spyOnEvent(select, 'click');

      select.on('click', function(){});
      select.trigger('click');

      expect(select.click).toHaveBeenTriggered();
    
      glue('body p.select').remove();
    
    });
  });

  describe("glue(..).off()", function() {
    it("Remove an event handler.", function () {
      appendElement('select');
    
      var select = glue('body p.select');
    
      spyOnEvent(select, 'click');

      select.off('click');
      select.trigger('click');

      expect(select.click).toHaveBeenTriggered();
    
      glue('body p.select').remove();
    
    });
  });

  describe("glue(..).trigger()", function() {
    it("Trigger an event handler.", function () {
      appendElement('select');
    
      var select = glue('body p.select');
    
      spyOnEvent(select, 'click');

      select.on('click', function(){});
      select.trigger('click');

      expect(select.click).toHaveBeenTriggered();
    
      glue('body p.select').remove();
    
    });
  });

  describe("glue(document).ready(fn) / glue(fn)", function() {
    it("Specify a function to execute when the DOM is fully loaded.", function () {
      glue(document).ready(function(){
        window.dummy = 'ready';
      });
      expect(window.dummy).toEqual('ready');
    });
  });

});
