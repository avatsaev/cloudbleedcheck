



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

  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
  }

  function insertParam(key, value) {

    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) {
    x = kvp[i].split('=');

      if (x[0]==key) {
        x[1] = value;
        kvp[i] = x.join('=');
        break;
      }
    }

    if(i<0) kvp[kvp.length] = [key,value].join('=');

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
  }

  switchToAffected = function(){
    resetState();
    resultMsg.innerHTML = "This domain is affected<br>Close all active sessions for this service, change your passwords, and enable 2FA.";
    removeClass(resultMsg, "hidden");
    addClass(document.body, "affected-state");

  };

  switchToNotAffected = function(){
    resetState();
    resultMsg.innerHTML = "This domain is not affected";
    addClass(document.body, "not-affected-state");
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
      submitRquest();
      return false;
    }
  };

  submitButton.onclick = function (e) {
    e.preventDefault();
    submitRquest();
  };



  getInputDomain = function(){
      return domainInput.value
  };


  submitRquest = function(){

    if(getInputDomain().length) {

      checkDomain(getInputDomain());

      if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?domain='+getInputDomain();
        window.history.pushState({path:newurl},'',newurl);
      }

    }


  };

  var domainQueryParam = findGetParameter('domain');
  if (domainQueryParam){
    domainInput.value = domainQueryParam;
    submitRquest();
  }

});




