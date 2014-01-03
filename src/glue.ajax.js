/*jslint browser:true */
/*global XMLHttpRequest:true */

(function(glue) {
  'use strict';
  
  function ajax(url, options){
    if (glue.isPlainObject(url)) {
      options = url;
      url = options.url;
    } else {
      options = options || {};
    }
    var http = new XMLHttpRequest(),
      empty = function(){},
      dataObjectToPOSTString = function(){
        var result = '';
        for(var prop in options.data) {
          if(prop !== '') {
            result+= '&' + prop + '=' + options.data[prop];            
          }
        }
        return result.substring(1);
      },
      type = options.type || "GET",
      data = options.data ? dataObjectToPOSTString() : '',
      async = options.async || true,
      success = options.success || empty,
      dataType = options.dataType || 'text',
      error = options.error || empty,
      charset = '',
      finished = false;
    if (http.overrideMimeType) {
      charset = 'charset=x-user-defined';
      if(dataType === 'json') {
        http.overrideMimeType( "text/plain; " + charset);
      } else if(dataType === 'xml') {
        http.overrideMimeType( "text/xml; " + charset);
      } 
    }
    
    if(dataType === 'script') {
      glue.getScript(url, success);
    } else {
      http.open(type, url, async);
      if(type === 'POST') {
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      } 
      http.onreadystatechange = function() {
        /* istanbul ignore if */
        if (http.readyState === 4) {
          // continue only if HTTP status is "OK"
          if (http.status === 200) {
            try {
              if(dataType === 'text' || dataType === 'html') {           
                success(http.responseText);           
              } else if (dataType === 'xml') {
                success(http.responseXML);           
              } else if (dataType === 'json') {
                success(JSON.parse(http.responseText));          
              } 
              return;
            }
            catch (e) {
              // display error message
              //alert("Error reading the response: " + e.toString());
            }
          }
          else {
            // display status message
            //alert("There was a problem retrieving the data:\n" + http.statusText);
            if(!finished){
              finished = true;
              error('ERROR');      
            }
          }
        }        
      };
      http.send(data);
    }  
  }
  
  function get(url, callback){
    return ajax({
      url: url,
      success: callback
    });      
  }

  function post(url, data, callback){
    return ajax({
      url: url,
      type: "POST",
      data: data,
      success: callback
    });
  }

  function getScript(url, callback){
    var head = document.head || glue("head")[0] || document.documentElement,
      script = document.createElement("script");
      
    script.async = true;
    script.src = url;
    script.onload = script.onreadystatechange = function() {
      script.onload = script.onreadystatechange = null;
      // Remove the script
      if ( script.parentNode ) {
        script.parentNode.removeChild( script );
      }
      // Dereference the script
      script = null;
      if(callback) {
        callback();        
      }
    };
    head.insertBefore( script, head.firstChild );
  }

  function serialize(context) {
    var s = {};
    // [].forEach.call(context[0].getElementsByTagName('input'), function(el) {
//       s[el.name] = el.value;
//     });
    glue(context[0]).find('input').each(function(el) {
      s[el.name] = el.value;
    });
    return s;
  }

  glue.ajax = function(url, options) {
    return ajax(url, options);
  };
  
  glue.get = function(url, callback){
    return get(url, callback);
  };
  
  glue.post = function(url, data, callback){
    return post(url, data, callback);
  };
  
  glue.getScript = function(url, callback){
    return getScript(url, callback);
  };
  
  glue.fn.serialize = function() {
    return serialize(this);
  };
    
}(glue));
