



document.addEventListener("DOMContentLoaded", function(event) {


  var domainInput = document.getElementById('domain-input');

  var submitButton = document.getElementById('submit-button');

  var resultMsg = document.getElementById('result-msg');

  var xhr = new XMLHttpRequest();

  const checkDomain = function(domain) {
    switchToUnknown();
    xhr.open('GET', '/check?domain='+domain);
    xhr.send(null);
  };


  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === 4) {
      if (xhr.status === 200){
        var res = JSON.parse(xhr.responseText);
        if(res.affected){
          //alert("domain "+res.domain+" is affected");
          switchToAffected();

        }else{
          switchToNotAffected();
        }
      }

    }
  };

  function addClass(elements, myClass) {

    // if there are no elements, we're done
    if (!elements) { return; }

    // if we have a selector, get the chosen elements
    if (typeof(elements) === 'string') {
      elements = document.querySelectorAll(elements);
    }

    // if we have a single DOM element, make it an array to simplify behavior
    else if (elements.tagName) { elements=[elements]; }

    // add class to all chosen elements
    for (var i=0; i<elements.length; i++) {

      // if class is not already found
      if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {

        // add class
        elements[i].className += ' ' + myClass;
      }
    }
  }

  function removeClass(elements, myClass) {

    // if there are no elements, we're done
    if (!elements) { return; }

    // if we have a selector, get the chosen elements
    if (typeof(elements) === 'string') {
      elements = document.querySelectorAll(elements);
    }

    // if we have a single DOM element, make it an array to simplify behavior
    else if (elements.tagName) { elements=[elements]; }

    // create pattern to find class name
    var reg = new RegExp('(^| )'+myClass+'($| )','g');

    // remove class from all chosen elements
    for (var i=0; i<elements.length; i++) {
      elements[i].className = elements[i].className.replace(reg,' ');
    }
  }

  switchToAffected = function(){
    resetState();
    resultMsg.innerHTML = "This domain is affected";
    removeClass(resultMsg, "hidden");
    addClass(document.body, "affected-state");

  };

  switchToNotAffected = function(){
    resetState();
    addClass(document.body, "not-affected-state");
    resultMsg.innerHTML = "This domain is not affected";
    removeClass(resultMsg, "hidden");


  };

  switchToUnknown = function(){
    resetState();
    addClass(document.body, "unknown-state");
    removeClass(resultMsg, "hidden");
    addClass(resultMsg, "hidden");

  };

  resetState = function () {
    removeClass(document.body, "affected-state");
    removeClass(document.body, "not-affected-state");
    removeClass(document.body, "unknown-state");
    addClass(resultMsg, "hidden");
  };


  domainInput.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      checkDomain(domainInput.value);
      return false;
    }
  };

  submitButton.onclick = function (e) {
    e.preventDefault();
    checkDomain(domainInput.value);
  }


});




