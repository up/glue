/**
 * @preserve glueJS v.0.7.1
 * | Pluggable js library with jQuery-like API
 * | github.com/up/glue
 * | 2013 Uli Preuss
*//* 
 * 
 * Support for IE8+ and modern browsers
 * and all CSS3 selectors (in IE8 only supported)
*/

/*jslint browser: true */
/*global glue: true */

(function (win, doc, selector) {
  "use strict";
  
  var args, api, arr = [], version = '0.7.0';
    
  function nodeListToArray(nodelist) {    
     var node,
       nodeArray = [],
       i = -1;
       
    while (!!(node = nodelist[++i])) {
      nodeArray[i] = node;
    }
    return nodeArray;
  }
  
  function factory(context, obj) {
    if(obj){
      selector = obj;
      if(glue.isNumeric(obj)) {
        arr.push.call(context, obj);        
      } else {
        if(glue.isElement(obj)){
          args = [obj];
        } else if (glue.isString(obj)) {
          try{
            args = nodeListToArray(doc.querySelectorAll(obj));            
          } catch(e) {
            args = [];
          }
        } else if(glue.isFunction(obj)) {
          glue(doc).ready(obj); 
        } else {
          args = [];
        } 
        arr.push.apply(context, args);
      }        
    }
  }
    
  function get(context, index) {
    if (!context.length) {
      return;
    } else if(index === null || index === undefined) {
      //return Array.prototype.splice.call(this);
      return [];
    } else if(index < 0) {
      return context[context.length + index];
    } 
    return context[index];
  }

  function each(context, callback){
    var collection = context, 
      len = collection.length,
      i = 0;
    for (; i < len; i+=1) {
      callback.call( collection[i], collection[i], i, collection);
    }
    return collection;
  }

  function extend(context, extentions){
    if ( extentions ) {
      extentions = glue.extend(context, extentions);
      glue.prototype = glue.fn = api.constructor.prototype = extentions;
    }        
  }

  function getSelector(){
    return selector;
  }

  api = {
    
    /*
     * constructor
     * obj: number, selector, dom element or function
     */
    constructor: function (obj) {
      factory(this, obj);
    },
    
    get: function (index) {
      return get(this, index);
    },
    
    extend: function(extentions) {  
      extend(this, extentions);
    },
    
    each: function (callback) {
      return each(this, callback);
    }
  };
  
  // Initialization
  win.glue = function (obj) {
    return new glue.prototype.constructor(obj);
  };

  // API Publishing
  glue.prototype = glue.fn = api.constructor.prototype = api;
  /* glue.isTest = false; */
  glue.version = version;
  glue.getSelector = getSelector;
    
}(window, document));
