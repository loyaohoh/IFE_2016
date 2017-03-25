/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-22 12:35:36
 * @version $Id$
 */

window.onload = function() {
	var btns = document.querySelectorAll("button"),
		lin = btns[0],
		rin = btns[1],
		lout = btns[2],
		rout = btns[3],
		messBtn = btns[4],
		bubbleBtn = btns[5],
		selectionBtn = btns[6],
		insertionBtn = btns[7],
		queue = document.querySelector("ul");

	addHandle(lin, "click", leftIn);
	addHandle(rin, "click", rightIn);
	addHandle(lout, "click", leftOut);
	addHandle(rout, "click", rightOut);
	addHandle(queue, "click", deleteEle);
	addHandle(messBtn, "click", function() {
		init(queue, lin);
	})
	addHandle(bubbleBtn, "click", function() {
		bubbleSort(queue);
	})
	addHandle(selectionBtn, "click", function() {
		selectionSort(queue);
	})
	addHandle(insertionBtn, "click", function() {
		insertionSort(queue);
	});
	init(queue, lin);
}

function leftIn() {
	var queue = document.querySelector("ul"),
		input = document.querySelector("input"),
		newEle = document.createElement("li"),
		oldEle = queue.querySelectorAll("li")[0],
		temp;

	if (!(temp = transValue(input))) {
		return false;
	} 
	newEle.style.height = temp +"px";
	if(queue.querySelectorAll("li").length >= 60) {
		alert("队列已经到达上限");
	}else if(!oldEle) {
		queue.appendChild(newEle);
	}else {
		queue.insertBefore(newEle, oldEle);
	}
	input.value = "";
};

function rightIn() {
	var newEle = document.createElement("li"),
		queue = document.querySelector("ul"),
		input = document.querySelector("input"),
		temp;

		if(!(temp = transValue(input))) {
			return false;
		}
		newEle.style.height = temp + "px";
		if(queue.querySelectorAll("li").length >= 60) {
			alert("队列满了");
		}
		else {
			queue.appendChild(newEle);
		}
		input.value = "";
}

function rightOut() {
	var queue = document.querySelector("ul"),
		oldEle = queue.lastChild;

		if(!oldEle) {
			alert("队列空了")
		}
		else {
			alert(oldEle.offsetHeight);
			queue.removeChild(oldEle);
		}
}

function leftOut() {
	var queue = document.querySelector("ul"),
		oldEle = queue.querySelectorAll("li")[0];

		if(!oldEle) {
			alert("队列是空的")
		}
		else {
			alert(oldEle.offsetHeight);
			queue.removeChild(oldEle);
		}
}

function deleteEle(event) {
	var queue = document.querySelector("ul"),
		oldEle = getTarget(event);

		if(oldEle.tagName == "LI") {
			queue.removeChild(oldEle);
		}
}

/*The number of elements in queue*/

function transValue(input) {
	var result = parseInt(input.value.replace(/\D/g,""), 10);
	if(result > 100 || result < 10) {
		input.value = "必须为10-100整数";
		return false;
	}
	return result;
}

function swap(eleOne, eleTwo) {
	var temp = eleOne.offsetHeight;
	eleOne.offsetHeight = eleTwo.offsetHeight;
	eleOne.style.height = eleTwo.offsetHeight + "px";
	eleTwo.offsetHeight = temp;
	eleTwo.style.height = temp + "px";
}
/*如果只是相邻元素swap，可以使用下面的这个方法直接交换dom元素
但是考虑到非冒泡排序算法使用swap时不一定是交换相邻元素比如插入
元素，所以使用交换高度的方法，注意ele.style.offsetHeight和ele.style.height
都需要交换*/

function bubbleSort(queue) {
	var eles = queue.querySelectorAll("li"),
		len = eles.length, i, j = 0, delay = 50, timer;

		i = len - 1;
		timer = setInterval(function() {
			if(i < 1) {
				clearInterval(timer);
			}
			if(j == i) {
				--i;
				j = 0;
			}
			if(eles[j].offsetHeight > eles[j+1].offsetHeight) {
				swap(eles[j], eles[j+1]);
			}
			++j;
		}, delay)
};

function selectionSort(queue) {
	var eles = queue.querySelectorAll("li"),
		len = eles.length, i = 0, j = 1, min = 0, delay = 50, timer;

		timer = setInterval(function() {
			if(i == len -1) {
				clearInterval(timer);
			}
			if(j == len) {
				swap(eles[i],eles[min]);
				++i;
				min = i;
				j = i + 1;
			}
			if(eles[j] && eles[j].offsetHeight < eles[min].offsetHeight) {
				min = j;
			}
			++j;
		}, delay)
};

/*用两个变量控制循环*/
function insertionSort(queue) {
	var eles = queue.querySelectorAll("li"),
		len = eles.length,
		temp, i = 1, j =0, timer, delay = 100, outer = true, inner = false;
		timer = setInterval(function() {
			if(outer) {
				if(i == len) {
					clearInterval(timer);
					return ;
				}
				if(eles[i].offsetHeight < eles[i-1].offsetHeight) {
					temp = eles[i].offsetHeight;
					j = i-1;
					outer = false;
					inner = true;
				}
				else {
					i++;
				}
			}
			if(inner) {
				if(j<0 || eles[j].offsetHeight < temp) {
					eles[j+1].style.height = temp + "px";
					eles[j+1].offsetHeight = temp;
					i++;
					inner = false;
					outer = true;
				}
				else {
					eles[j+1].style.height = eles[j].style.height;
					eles[j+1].offsetHeight = eles[j].offsetHeight;
					j--;
				}
			}
		}, delay)
};