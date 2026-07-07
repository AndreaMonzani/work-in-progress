(function(){
'use strict';
var root=document.documentElement;
var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function clamp(v,min,max){return Math.min(Math.max(v,min),max)}
function updateAmbient(){if(reduceMotion)return;var x=window.innerWidth*.5,y=window.innerHeight*.35,tx=x,ty=y,s=0,ts=0,tick=false;function render(){x+=(tx-x)*.06;y+=(ty-y)*.06;s+=(ts-s)*.08;root.style.setProperty('--x',((x/window.innerWidth)*100).toFixed(2)+'%');root.style.setProperty('--y',((y/window.innerHeight)*100).toFixed(2)+'%');root.style.setProperty('--scroll',(s*.12).toFixed(2)+'px');if(Math.abs(tx-x)>.1||Math.abs(ty-y)>.1||Math.abs(ts-s)>.1)requestAnimationFrame(render);else tick=false}function ask(){if(!tick){tick=true;requestAnimationFrame(render)}}window.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;ask()},{passive:true});window.addEventListener('scroll',function(){ts=window.scrollY||window.pageYOffset;ask()},{passive:true});window.addEventListener('resize',function(){tx=clamp(tx,0,window.innerWidth);ty=clamp(ty,0,window.innerHeight);ask()});ask()}
function initCursor(){var c=document.querySelector('.cursor');if(!c||reduceMotion)return;var x=0,y=0,cx=0,cy=0;window.addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;c.classList.add('cursor--visible')});function raf(){cx+=(x-cx)*.2;cy+=(y-cy)*.2;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(raf)}raf()}
document.addEventListener('DOMContentLoaded',function(){updateAmbient();initCursor()});
})();
