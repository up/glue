# glueJS


Pluggable library with jQuery-like API

3.48KB gzipped (9.42KB uncompressed)

## glue.core.js
### glue(..)
Pass selector, element, number or function.
Return a collection of matched elements either found in the DOM based on passed argument(s) or ..
### glue.version
Get glue version
### glue.fn.extend()
Merge the contents of an object (with new api plugins) onto the glue prototype to provide new glue instance methods.
### glue(..).each()
Iterate over a glue object, executing a function for each matched element.
### glue(..).get()
Retrieve the DOM elements matched by the glue object.
### glue.getSelector()
Get current selector string.

## glue.utilities.js
### glue.extend()
Merge the contents of two objects together into the first object.
### glue.each()
Iterate over plain object or array.
### glue.has()
Check if object has a specific key
### glue.isString()
Determines whether its argument is a string.
### glue.isElement()
Determines whether its argument is a DOM element.
### glue.isBoolean()
Determines whether its argument is a boolean.
### glue.isNull()
Determines whether its argument is Null.
### glue.isNumeric()
Determines whether its argument is a number.
### glue.isArray()
Determine whether the argument is an array.
### glue.isFunction()
Determine if the argument passed is a Javascript function object.
### glue.isPlainObject()
Check to see if an object is a plain object (created using “{}” or “new Object”).
### glue.isEmptyObject()
Check to see if an object is empty (contains no enumerable properties).
### glue.isMobile()
Check to see if the browser is mobile device browser.

## glue.dom.js
### glue.fn.selectorify()
Get the selector for a given DOM element.

### glue.parseHTML()
Parses a string into an array of DOM nodes.
### glue(..).css()
Get the value of a style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.
### glue(..).html()
Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.
### glue(..).hide()
Hide the matched elements.
### glue(..).show()
Display the matched elements.
### glue(..).toggle()
Display or hide the matched elements.
### glue(..).attr()
Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
### glue(..).append()
Insert content, specified by the parameter, to the end of each element in the set of matched elements.
### glue(..).prepend()
Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
### glue(..).remove()
Remove the set of matched elements from the DOM.
### glue(..).find()
Get the descendants of each element in the current set of matched elements, filtered by a selector, glue object, or element.

## glue.event.js
### glue(..).ready(fn) alias glue(fn)
Specify a function to execute when the DOM is fully loaded.
### glue(..).on()
Attach an event handler function for one or more events to the selected elements.
### glue(..).off()
Remove an event handler.
### glue(..).trigger()
Execute all handlers and behaviors attached to the matched elements for the given event type.

## glue.ajax.js
### glue.ajax()
Perform an asynchronous HTTP (Ajax) request.
### glue.get()
Load data from the server using a HTTP GET request.
### glue.post()
Load data from the server using a HTTP POST request.
### glue.getScript()
Load a JavaScript file from the server using a GET HTTP request, then execute it.
### glue.fn.serialize()
Encode a set of form elements as a string for submission.

## glue.cookie.js
### glue.cookie()
Get cookie value or set new cookie. 
### glue.removeCookie()
Remove cookie.

## glue.misc.js
### glue.random()
Create random number between given min and max values
### glue.uniqueId()
Create unique Id.
### glue.defer()
Invoke a function until the current call stack has cleared
### glue.escapeURL()
Escape URL.
### glue.escapeHTML()
Escape URL.
### glue(..).times()
Repeat functions x times
### glue(..).lazy()
Lazy invokation of a function. Alias for setTimeout.

## glue.template.js
### glue.template()
Define and use a HTML template

## glue.promise.js
### glue.promise();
Initialize new Promise



