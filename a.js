function _(s){
	return document.getElementById(s);
}
function show(s){
	var a=_(s);
	a.style.display='block';
	setTimeout(function(){a.style.opacity=1;});
}
function init(){
	/*var a=document.getElementsByClassName('btn');
	for (var i=0; i<a.length; ++i) a[i].style.padding='10px';*/
	//show('div_menu');
}
function randint(a,b){
	return Math.floor(Math.random()*(b-a)+a+0.5);
}
function gen(){
	vm.theta=randint(1,90);
}
function InitGame(){
	//show('div_game');
	gen();
	vm.life=vm.mxlife; vm.rd=0; vm.ans=''; vm.cans='white';
}
function correct(){
	with (vm){
		if (ans<theta) ++ans;
		else if (ans>theta) --ans;
		var delta=Math.abs(ans-theta)
		if (ans!=theta) setTimeout(correct,delta<10?50:10);
		else{
			if (vm.life>0) ++vm.rd;
		}
	}
}
function submit(){
	if (vm.ans=='' || !vm.life) return;
	vm.flag=0;
	vm.ans=parseInt(vm.ans);
	var dmg=Math.abs(vm.ans-vm.theta);
	if (dmg>0) vm.life=Math.max(vm.life-dmg,0),vm.cans='red';
	else vm.life=Math.min(vm.life+1,vm.mxlife),vm.cans='green';
	setTimeout(correct);
}
function _HandleKey(n){
	if (vm.ps!='game') return;
	if (vm.flag){
		var c=String.fromCharCode(n);
		if ('0'<=c && c<='9') vm.ans+=c;
		else if (n==8) vm.ans=vm.ans.substring(0,vm.ans.length-1);
		else if (n==13) submit();
	}
	else{
		if (n==13 && vm.life>0){
			gen();
			vm.ans='';
			vm.cans='white';
			vm.flag=1;
		}
	}
}
function HandleKey(e){
	_HandleKey(e.keyCode);
}