/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-21 10:50:33
 * @version $Id$
 */

function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	}else if (element.attachEvent) {
		element.attachEvent("on" + event, listener)
	}else{
		element["on" + event] = listener;
	}
}

//遍历数组，针对每一个元素执行fn函数，并将数组元素和索引作为参数传递
function each(arr, fn) {
	for(var cur = 0; cur < arr.length; cur++) {
		fn(arr[cur], cur);
	}
}
//接下来就是创建一个页面加载完成时执行的函数，并在其中的对象中创建应该有的所有方法
window.onload = function() {
	var container = document.getElementById("container");
	var buttonList = document.getElementsByTagName("input");
	var queue = {
		str: [],
		leftPush: function(num) {
			this.str.unshift(num);
			this.paint();
		},
		//以上是左侧插入的方法
		rightPush: function(num) {
			this.str.push(num);
			this.paint();
		},
		//以上是右侧插入的方法
		isEmpty: function() {
			return (this.str.length == 0);
		},
		//检查数组是否为空数组
		leftPop: function() {
			if(!this.isEmpty()) {
				alert(this.str.shift());
				this.paint();
			}
			else{
				alert("The queue is already empty!")//这是弹出左侧数字并删除的方法
			}
		},
		rightPop: function() {
			if(!this.isEmpty()) {
				alert(this.str.pop())
				this.paint();
			}else{
				alert("The queue is already empty!"); //这是右侧显示数字弹出并删除最后一项的方法
			}
		},
		paint: function() {
			var str = "";
			each(this.str, function(items) {
				str += ("<div>" + parseInt(items) + "</div>")
			});
			container.innerHTML = str;
			addDivDelEvent();
		},
		deleteID: function(id) {
			console.log(id);
			this.str.splice(id, 1);
			this.paint();
		}
	}
	//接下来为每一个div元素绑定删除函数
	function addDivDelEvent() {
		for(var cur = 0; cur < queue.str.length; cur++) {
			addEvent(container.childNodes[cur], "click",function(cur) {
				return function() {return queue.deleteID(cur)};
			}(cur));
		}
	}
	//为四个按钮绑定函数
	addEvent(buttonList[1], "click", function(){
		var input = buttonList[0].value;
		if((/^[0-9]+$/).test(input)) {
			queue.leftPush(input);
		}
		else{
			alert("Please enter an interget!");
		}
	})
	addEvent(buttonList[2], "click", function() {
		var input = buttonList[0].value;
		if((/^[0-9]+$/).test(input)) {
			queue.rightPush(input);
		}else{
			alert("Please enter an interget!");
		}
	})

	addEvent(buttonList[3], "click", function() {queue.leftPop()});
	addEvent(buttonList[4], "click", function() {queue.rightPop()});
}