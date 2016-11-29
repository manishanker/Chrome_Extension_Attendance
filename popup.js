//DOMParser function code (optional)
/**
(function(DOMParser) {  
    "use strict";  
    var DOMParser_proto = DOMParser.prototype  
      , real_parseFromString = DOMParser_proto.parseFromString;

    // Firefox/Opera/IE throw errors on unsupported types  
    try {  
        // WebKit returns null on unsupported types  
        if ((new DOMParser).parseFromString("", "text/html")) {  
            // text/html parsing is natively supported  
            return;  
        }  
    } catch (ex) {}  

    DOMParser_proto.parseFromString = function(markup, type) {  
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {  
            var doc = document.implementation.createHTMLDocument("")
              , doc_elt = doc.documentElement
              , first_elt;

            doc_elt.innerHTML = markup;
            first_elt = doc_elt.firstElementChild;

            if (doc_elt.childElementCount === 1
                && first_elt.localName.toLowerCase() === "html") {  
                doc.replaceChild(first_elt, doc_elt);  
            }  

            return doc;  
        } else {  
            return real_parseFromString.apply(this, arguments);  
        }  
    };  
}(DOMParser));

*/

//This listener will just listen to messages. Message is sent from the getPagesSource
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var pageSource = request.source;
    parserDOM(pageSource, message);
  }
});

//Function to take page source and assign the month
function parserDOM(pageSource, message){
  var parser;
  parser = new DOMParser();
  doc = parser.parseFromString(pageSource, "text/html");
  var day = doc.getElementById("dtds").innerText;
  var name = doc.getElementsByClassName("header-name");

  document.getElementById('day_td').innerHTML = day;
  document.getElementById('name_td').innerHTML = name[0].innerText;

}


//Main function
function onWindowLoad() {

  chrome.tabs.executeScript(null, {file: "getPagesSource.js"}, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

//This is the starting point, message div is selected, next script getPagesSource is executed. 
window.onload = onWindowLoad;