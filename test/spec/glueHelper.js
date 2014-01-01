/*jslint browser:true, plusplus:true, todo: true, devel:true */
/*global describe:true, it:true, expect:true, glue:true, glue:true */

function getNumberOfBodyChilden(){
  var body = document.getElementsByTagName('body')[0];
  return body.childNodes.length;
}

function appendElement(name){
  var body = document.getElementsByTagName('body')[0];
  var p = document.createElement('p');
  p.className = name;
  p.innerHTML = name;
  body.appendChild(p);
}

function apiToNameArray(){
  var api = glue(),
    arr = [];
  for(var item in api) {
    arr.push(item);
  }
  return arr;
}

var jasmineExtensions = {
  glueSpies: {},
  spyOnEvent: function(element, eventName) {
    var control = {
      triggered: false
    };
    element.on(eventName, function() {
      control.triggered = true;
    });
    jasmineExtensions.glueSpies[element[eventName]] = control;
  }
};
 
var spyOnEvent = jasmineExtensions.spyOnEvent;
 
beforeEach(function() {
  this.addMatchers({
    toHaveBeenTriggered: function() {
      var control = jasmineExtensions.glueSpies[this.actual];
      return control.triggered;
    }
  });
});




