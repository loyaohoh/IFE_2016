/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-22 11:02:41
 * @version $Id$
 */

function addHandle(element, type, handle) {
	if(element.addEventListener) {
		element.addEventListener(type, handle, false);
	}else if(element.attachEvent) {
		element.attachEvent("on" + type, handle);
	}else{
		element["on" + type] = handle;
	}
}
/*get target from event*/

function getTarget(event) {
	event = event || window.event;
	return event.target || event.srcElement;
}
/*prevent default*/
function preventDefault(event) {
	if(element.preventDefault) {
		preventDefault = function(event) {
			event.preventDefault;
		}
	}
	else {
		preventDefault = function(event) {
			event.returnValue = false;
		}
	}
}

function init(queue, lin) {
	var input = document.querySelector("input");
	queue.innerHTML = "";
	for(var i = 0; i < 20; i++) {
		input.value = Math.floor(Math.random() * 90) + 10;
		lin.click();
	}
	input.value = "";
}
function trim(word) {
	return word.replace(/^\s+|\s+$/g, "");
}