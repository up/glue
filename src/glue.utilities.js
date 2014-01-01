// UTILIES

/*jslint browser:true*/

(function(glue){
  'use strict';
  
  function extend(object1, object2){
    for (var prop in object2) {
      /* istanbul ignore else */
      if(object2.hasOwnProperty(prop)) {
        try {
          // Property in destination object set; update its value.
          if (object2[prop].constructor === Object) {
            object1[prop] = extend(object1[prop], object2[prop]);
          } else {
            object1[prop] = object2[prop];
          }
        } catch(e) {
          // Property in destination object not set; create it and set its value.
          object1[prop] = object2[prop];
        }        
      }
    }
    return object1;
    
  }
  
  function each(obj, callback){
    var i;
    /* istanbul ignore else */
    if (glue.isArray(obj)) {
      for (i = 0; i < obj.length; i++) {
        callback(i, obj[i]);
      }
    } else if (glue.isPlainObject(obj)) {
      for (i in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(i)) {
          callback(i, obj[i]);
        }
      }
    }
    return obj;  
  }

  function has(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
  }

  function is(obj, type){
    if(type === 'Element') {
      return !!obj.nodeName;
    } else if(type === 'Null') {
      return obj === null;
    } else if(type === 'Empty') {
      for(var prop in obj) {
        /* istanbul ignore else */
        if(obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    } else {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';      
    }
  }
  
  function isMobile() {
    var re = new RegExp('android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini', 'i');
    return re.test(navigator.userAgent.toLowerCase());
  }

  // Merge the contents of two objects into the one object.
  glue.extend = function (object1, object2) {
    return extend(object1, object2);
  };
  
  glue.each = function(obj, callback) {
    return each(obj, callback);
  };
  
  glue.has = function(obj, key) {
    return has(obj, key);
  };

  glue.isString = function(obj){
    return is(obj, 'String');
  };
  
  glue.isElement = function(obj){
    return is(obj, 'Element');
  };
  
  glue.isBoolean = function(obj){
    return is(obj, 'Boolean');
  };
  
  glue.isNull = function(obj) {
    return is(obj, 'Null');
  };

  glue.isNumeric = function(obj){
    return is(obj, 'Number');
  };
  
  glue.isArray = function(obj){
    return is(obj, 'Array');
  };
  
  glue.isFunction = function(obj){
    return is(obj, 'Function');
  };
  
  glue.isPlainObject = function(obj){
    return is(obj, 'Object');
  };
  
  glue.isEmptyObject = function(obj){
    return is(obj, 'Empty');
  };
  
  glue.isMobile = function() {
    return isMobile();
  };
  
}(glue));