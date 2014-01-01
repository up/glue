/*global setTimeout:true*/

(function(glue){
  'use strict';
  
  function template(tmpl, data) {
    var re = new RegExp("{{\\s*([a-z0-9_$][\\.a-z0-9_]*)\\s*}}", "gi");

    return function(data) {
      return tmpl.replace(re, function(placeholder, path) {
        
        var parts = path.split("."),
            len = parts.length,
            i = 0,
            html = data;
            
        for ( ; i < len; ++i) {
          html = html[parts[i]];

          if (html === undefined) {
            throw "glue.template: '" + parts[i] + "' not found in " + placeholder;
          }

          if (i === len - 1) {
            return html;
          }
        }
        
      });
    };
    
  }
  
  /**
   PUBLIC ∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼∼
  */
    
  glue.template = function(tmpl, data) {
    return template(tmpl, data);
  };
 
}(glue));
