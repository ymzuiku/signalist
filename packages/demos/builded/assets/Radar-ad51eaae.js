import{r as p}from"./index-b140f2d2.js";import"https://cdn.jsdelivr.net/npm/perf-monitor@0.6.0/dist/index.js";function P(y={}){const{frames:t=50,speed:l=.0017,size:d=300,inset:h=3,parent:m=document.body}=y,M="http://www.w3.org/2000/svg",E=document.createTextNode(`
    .lagRadar-sweep > * {
      shape-rendering: crispEdges;
    }
    .lagRadar-face {
      fill: transparent;
    }
    .lagRadar-hand {
      stroke-width: 4px;
      stroke-linecap: round;
    }
  `);function o(s,r={},i=[]){const n=document.createElementNS(M,s);return Object.keys(r).forEach(a=>n.setAttribute(a,r[a])),i.forEach(a=>n.appendChild(a)),n}const R=Math.PI*2,e=d/2,c=e-h,w=o("path",{class:"lagRadar-hand"}),f=new Array(t).fill("path").map(s=>o(s)),b=o("svg",{class:"lagRadar",height:d,width:d},[o("style",{type:"text/css"},[E]),o("g",{class:"lagRadar-sweep"},f),w,o("circle",{class:"lagRadar-face",cx:e,cy:e,r:c})]);m.appendChild(b);let x,g=0,u={rotation:0,now:Date.now(),tx:e+c,ty:e};const v=(()=>{const n=120/Math.log(100);return function(a){return 120-Math.max(0,Math.min(n*Math.log(a/10),120))}})();function A(){const s=Date.now(),r=Math.min(R-l,l*(s-u.now)),i=(u.rotation+r)%R,n=e+c*Math.cos(i),a=e+c*Math.sin(i),k=r<Math.PI?"0":"1",O=`M${n} ${a}A${c} ${c} 0 ${k} 0 ${u.tx} ${u.ty}L${e} ${e}`,_=v(r/l);f[g%t].setAttribute("d",O),f[g%t].setAttribute("fill",`hsl(${_}, 80%, 40%)`),w.setAttribute("d",`M${e} ${e}L${n} ${a}`),w.setAttribute("stroke",`hsl(${_}, 80%, 60%)`);for(let $=0;$<t;$++)f[(t+g-$)%t].style.fillOpacity=1-$/t;g++,u={now:s,rotation:i,tx:n,ty:a},x=window.requestAnimationFrame(A)}return A(),function(){x&&window.cancelAnimationFrame(x),b.remove()}}const I=p.memo(function(t){let l=t.frames||20,d=t.size||100,h=Object.assign({},t,{frames:l,size:d}),m=p.useRef();return p.useLayoutEffect(()=>P(Object.assign({},h,{parent:m.current})),[h,m]),p.createElement("div",{ref:m})});export{I as default};
