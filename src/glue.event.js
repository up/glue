/*jslint browser:true */

(function(glue, doc){
  'use strict';
  
  //Cross-browser super-type event handler https://gist.github.com/dciccale/5521816
  function addEventHandler(action, eventType, domElement, callback) {
    /* istanbul ignore else */
    var method;
    if(document.addEventListener){
      method = {
        on: 'addEventListener', 
        off: 'removeEventListener'
      }[action];
      domElement[method](eventType, callback, false);      
    } else {
      method = {
        on: 'attachEvent', 
        off: 'detachEvent'
      }[action];
      domElement[method](action + eventType, function () { 
        callback.apply(domElement, arguments); 
      });      
    }
  }
  
  function triggerEvent (eventType, obj) { 
      var evt;
      /* istanbul ignore else - */
      if (document.createEvent) { 
          evt = document.createEvent("Events"); 
          evt.initEvent(eventType, true, true); 
          obj.dispatchEvent(evt); 
      } 
      else if (document.createEventObject) {
          evt = document.createEventObject(); 
          obj.fireEvent('on' + eventType, evt); 
      } 
      obj = null;
  } 
    
  function ready(context, callback) {
    /* istanbul ignore else - because jasmine starts with onload event */
    if(/c/.test(doc.readyState)) {
      callback();
    } else {
      glue(doc).on('DOMContentLoaded', callback);
    }
    return context;
  }

  function on(context, eventType, callback) {
    return context.each(function () {
      addEventHandler('on', eventType, this, callback);
    });
  }

  function off(context, eventType, callback) {
    return context.each(function () {
      addEventHandler('off', eventType, this, callback);
    });
  }

  function trigger(context, eventType) {
    return context.each(function () {
      triggerEvent (eventType, this);
    });
  }

  glue.fn.extend({
    
    ready: function (callback) {
      return ready(this, callback);
    },
    
    on: function (eventType, callback) {
      return on(this, eventType, callback);
    },
    
    off: function (eventType, callback) {
      return off(this, eventType, callback);
    },
    
    trigger: function (eventType) {
      trigger(this, eventType);
    }
    
  });
  
}(glue, document));
