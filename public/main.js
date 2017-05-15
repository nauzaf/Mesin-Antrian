function call(){
	fetch('/api/call', {method: 'GET'})
	.then((res)=>res.json())
	.then(function(res) {
		console.log(res);
			document.getElementById('call').innerHTML="Antrian Nomor " + res.lastcall;
	})
}

function next(loket){
	fetch('/api/callnext/'+loket, {method: 'GET'})
	.then((res)=>res.json())
	.then(function(res) {
		if (res.lastcall=res.queque) {
			call();
			alert("Antrian Habis");
		}
		call();
	})
}

function addtoQueue(){
	fetch('/api/customer', {method: 'GET'})
	.then((res)=>res.json())
	.then(function(res) {
		console.log(res);
			document.getElementById('customerQ').innerHTML="Antrian anda : " + res.queque;
		document.getElementById('lastCall').innerHTML="Antrian Saat ini : " + res.lastcall;
	})
}

function updateView(current){
	document.getElementById('1').innerHTML=current[0];
	document.getElementById('2').innerHTML=current[1];
	document.getElementById('3').innerHTML=current[2];
	document.getElementById('4').innerHTML=current[3];
	document.getElementById('5').innerHTML=current[4];
	document.getElementById('6').innerHTML=current[5];
	document.getElementById('7').innerHTML=current[6];
	document.getElementById('8').innerHTML=current[7];
}