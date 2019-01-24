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
	vm.theta=randint(1,90*vm.p10);
}
function InitGame(){
	//show('div_game');
	gen();
	vm.life=vm.mxlife*vm.p10; vm.sc=0; vm.ans=''; vm.cans='white'; vm.flag=1;
}
function correct(){
	if (vm.flag) return;
	var dmg=Math.abs(vm.theta-vm.ans);
	if (dmg==0) return;
	var t=1;
	while (t*10<=dmg) t*=10;
	if (vm.ans<vm.theta) vm.ans+=t;
	else vm.ans-=t;
	setTimeout(correct,50);
}
function submit(){
	if (vm.ans=='' || !vm.life) return;
	if (isNaN(Number(vm.ans))) return;
	vm.ans=Math.round(Number(vm.ans)*vm.p10);
	vm.flag=0;
	var dmg=Math.abs(vm.ans-vm.theta);
	vm.sc+=Math.max(1,Math.round(vm.p10/Math.max(1,dmg)));
	if (dmg>=vm.p10/2) vm.life=Math.max(vm.life-dmg,0),vm.cans='red';
	else vm.life=Math.min(vm.life+vm.p10,vm.mxlife*vm.p10),vm.cans='green';
	setTimeout(correct);
}
function _HandleKey(n){
	if (vm.ps!='game') return;
	if (vm.flag){
		var c=String.fromCharCode(n);
		if ('0'<=c && c<='9' || c=='.') vm.ans+=c;
		else if (n==190) vm.ans+='.';
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