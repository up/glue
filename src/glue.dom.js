(function(win, doc, glue) {
  'use strict';

  function setStyles(collection, name, value) {
    collection.each(function(element) {
      element.style[name] = value;
    });
  }

  function getStyle(element, property) {
    var propertyValue, re = /(\-([a-z]){1})/g;

    // Support both camelCase and dashed property names
    property = property.replace(/([A-Z])/g, '-glue1').toLowerCase();

    /* istanbul ignore else */
    if (win.getComputedStyle /* && !glue.isTest*/) {
      propertyValue = win.getComputedStyle(element, null).getPropertyValue(property);
    } else if (doc.documentElement.currentStyle) {
      if (property === 'float') {
        property = 'styleFloat';
      }
      if (re.test(property)) {
        property = property.replace(re, function() {
          return arguments[2].toUpperCase();
        });
      }
      propertyValue = element.currentStyle[property] ? element.currentStyle[property] : null;
    }
    return propertyValue;
  }

  function createXPath(node, path) {
    var sibling, len, details = '',
        name, selectorString;
    path = path || [];

    function isElement(obj) {
      return obj.nodeType === 1;
    }

    /* istanbul ignore else - */
    if (node.parentNode) {
      path = createXPath(node.parentNode, path);
    }

    /* istanbul ignore else - */
    if (node.previousSibling) {
      len = 1;
      sibling = node.previousSibling;
      do {
        if (isElement(sibling) && sibling.nodeName === node.nodeName) {
          len++;
        }
        sibling = sibling.previousSibling;
      } while (sibling);
      if (len === 1) {
        len = null;
      }
    } else if (node.nextSibling) {
      sibling = node.nextSibling;
      do {
        if (isElement(sibling) && sibling.nodeName === node.nodeName) {
          len = 1;
          sibling = null;
        } else {
          len = null;
          sibling = sibling.previousSibling;
        }
      } while (sibling);
    }

    if (isElement(node)) {
      name = node.nodeName.toLowerCase();
      /* istanbul ignore else - */
      if (node.id) {
        details = "#" + node.id;
      } else if (node.className) {
        details = "." + node.className;
      } else if (len !== null) {
        details = ":nth-of-type(" + len + ")";
      }
      path.push(name + details);
    }
    return path;
  }
  
  function css(context, property, value){
    var collection = context,
        isString = glue.isString(property),
        isObject = glue.isPlainObject(property),
        prop;

    /* istanbul ignore else */
    if (!collection.length || (!isString && !isObject)) {
      return context;
    } else if (isString) {
      if (value === undefined) {
        return getStyle(context[0], property);
      } else {
        setStyles(collection, property, value);
      }
    } else if (isObject) {
      for (prop in property) { /* istanbul ignore else */
        if (property.hasOwnProperty(prop)) {
          setStyles(collection, prop, property[prop]);
        }
      }
    }  
    return context;      
  }

  function html(context, htmlString) {
    if (htmlString) {
      context.each(function(element) {
        this.innerHTML = htmlString;
      });
      return context;
    } else {
      return context[0].innerHTML;
    }        
  }

  function createSelector(context, selector){
    return createXPath(context).join(' ').substring(5) + ' ' + selector;
  }

  function parseHTML(element){
    var div = doc.createElement('div');
    div.innerHTML = element;
    return div.firstChild;      
  }

  function toggleDisplay(context, status){
    var display = 'display', none = 'none';
    if(status) {
      context.css(display, status);
      return context;      
    } else {
      if (context.css(display) === none) {
        context.css(display, 'block');
      } else {
        context.css(display, none);
      }
      return context;
      
    }
  }

	function attr(context, name, value) {
    if (!value) {
      return context[0].getAttribute(name);
    } else {
      context[0].setAttribute(name, value);
      return context;
    }
	}

	function append(context, elementString){
    var domObject = glue.parseHTML(elementString);
    context[0].appendChild(domObject);
    return context;
	}

	function prepend(context, elementString){
    var domObject = glue.parseHTML(elementString),
        parent = context[0];
    parent.insertBefore(domObject, parent.firstChild);
    return context;
	}

	function remove(context) {
    context.each(function() {
      var parent = this.parentNode;
      parent.removeChild(this);
    });
    return context;				
	}

	function find(context, selector){
    var baseSelector = glue.getSelector();
    if (glue.isString(selector) && glue.isString(baseSelector)) {
      return glue(baseSelector + ' ' + selector);
    } else {
      return glue(context.selectorify(selector));
    }				
	}

  glue.fn.selectorify = function(selector) {
    return createSelector(this, selector);
  };

  glue.parseHTML = function(element) {
    return parseHTML(element);
  };

  glue.fn.extend({

    css: function(property, value) {
      return css(this, property, value);
    },

    html: function(htmlString) {
      return html(this, htmlString);
    },

    hide: function() {
      return toggleDisplay(this, 'none');
    },

    show: function() {
      return toggleDisplay(this, 'block');
    },

    toggle: function() {
      return toggleDisplay(this);
    },

    attr: function(name, value) {
			return attr(this, name, value);
    },

    append: function(elementString) {
			return append(this, elementString);
    },

    prepend: function(elementString) {
			return prepend(this, elementString);
    },

    remove: function() {
			return remove(this);
    },

    find: function(selector) {
			return find(this, selector);
    }

  });

}(window, document, glue));
