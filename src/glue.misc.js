/*global setTimeout:true*/

(function(glue){
  'use strict';
  
	/* ### PRIVATE ### */

  function times(context, fn) {
    if(glue.isFunction(fn)) {
      for(var i = 0; i < context[0]; i++) {
        fn(i);
      }
    }
  }
  
  function lazy(context, fn) {
    if(glue.isFunction(fn)) {
      setTimeout(function(){
        fn();
      }, context[0]);
    }
  }
  
  // Defers invoking the function until the current call stack has cleared, similar to using setTimeout 
  // with a delay of 0. Useful for performing expensive computations or HTML rendering in chunks without 
  // blocking the UI thread from updating. If you pass the optional arguments, they will be forwarded on 
  // to the function when it is invoked. 
  
  function defer(fn) {
    if(glue.isFunction(fn)) {
      setTimeout(function(){
        fn();
      }, 0);
    }
  }
  
  function escapeURL(url) {
    if(glue.isString(url)) {
      return encodeURIComponent(url);
    }
  }
  
  function escapeHTML(html_string) {
    return html_string
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");  
  }
  
  var idCounter = 0;
	
  function uniqueId(prefix) {
    idCounter+=1;
    var id = idCounter + '';
    return prefix ? prefix + id : id;
  }

  function random (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	/* ### PUBLIC ### */

  glue.fn.extend({
    
    times: function(fn) {
      return times(this, fn);
    },
    
    lazy: function(fn) {
      return lazy(this, fn);
    }
        
  });
  
  glue.random = function(min, max) {
    return random(min, max);
  };
 
  glue.uniqueId = function(prefix) {
    return uniqueId(prefix);
  };
  
  glue.defer = function(fn) {
    return defer(fn);
  };
  
  glue.escapeURL = function(url) {
    return escapeURL(url);
  };
  
  glue.escapeHTML = function(html) {
    return escapeHTML(html);
  };
  
}(glue));
