function confirm(){
	var info = document.getElementById("aqi-input").value;
	document.getElementById("aqi-display").innerHTML = info;
}
	document.getElementById("button").addEventListener("click", confirm, false);