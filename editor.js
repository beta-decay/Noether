function decode(string) {
	return decodeURIComponent(escape(atob(unescape(string).replace(/-/g, "+").replace(/_/g, "/"))))
}

function encode(string) {
	return btoa(unescape(encodeURIComponent(string))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}


function getperma() {
	var lcode = document.getElementById("code").value;
	var linput = document.getElementById("input").value;
	var link = location.protocol + '//' + location.host + location.pathname + "?code=" + encode(lcode) + "&input=" + encode(linput);
	
	window.open(link);
}

function chars() {
	var codelen = document.getElementById("code").value.length;
	document.getElementById("ccount").innerHTML = codelen;
}

function clearText() {
	document.getElementById("code").value = "";
	document.getElementById("output").value = "";

	chars();
}

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

var rcode = getURLParameter("code");
var rinput = getURLParameter("input");

if (rcode !== null) {
	document.getElementById("code").value = decode(rcode);
}

if (rinput !== null) {
	document.getElementById("input").value = decode(rinput);
}

chars();
