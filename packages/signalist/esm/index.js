var O=Object.defineProperty;var h=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var F=(t,n,e)=>n in t?O(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,_=(t,n)=>{for(var e in n||(n={}))j.call(n,e)&&F(t,e,n[e]);if(h)for(var e of h(n))C.call(n,e)&&F(t,e,n[e]);return t};var J=(t,n)=>{var e={};for(var r in t)j.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(t!=null&&h)for(var r of h(t))n.indexOf(r)<0&&C.call(t,r)&&(e[r]=t[r]);return e};var d=[];function l(t){let n=()=>{d.push(n);try{t()}finally{d.pop()}};n()}var c=[];var x=0,P=Number.MAX_SAFE_INTEGER-9e5,I=0;function k(){return x+=1,x>P&&(x=0,I+=1),I+""+x}function y(t){return typeof t=="function"&&t.__signal}function T(t){let n=new Set,e=()=>{let o=d[d.length-1];return o&&n.add(o),e.value};return e.value=t,e.__signal=!0,new Proxy(e,{set:function(o,m,a){if(m==="value"){o.value=a;for(let f of n)f()}return!0}})}function et(t){let n=()=>(n.value=t(),n.value);return n.value=t(),n.__signal=!0,n}import{useMemo as q,useRef as K,useState as z}from"react";var M={value:!0,className:!0};function v(t,n,e){!t||(n==="children"?t.textContent=e:n==="value"?requestAnimationFrame(()=>{t.value=e}):n==="style"?Object.assign(t.style,e):M[n]?t[n]=e:typeof e=="string"||typeof e=="number"?t.setAttribute(n,e):typeof e=="boolean"?e?t.setAttribute(n,""):t.removeAttribute(n):t[n]=e)}var D=Symbol("signal.element"),G=new Set(["$$typeof","key","ref","_owner","_store","_self","_source","_signal","_signalComponent"]);function A(t){let n=[];for(let e=0;e<t.length;e++)Array.isArray(t[e])?n=n.concat(A(t[e])):n.push(t[e]);return n}var L=t=>{let n=!1;return[A(t).map(r=>y(r)?(n=!0,p(r())):p(r)),n]},$=t=>A(t).map(e=>y(e)?e():e);function p(t){if(!t||t._signalComponent)return t;let w=t,{props:n,ref:e}=w,r=J(w,["props","ref"]);if(!n)return t;let o=typeof t.type,m=o==="object"&&typeof t.type.render=="function";if(o!=="string"&&!m)return t;let a=_({},n),f=[],u,E=null;return Object.keys(n).forEach(s=>{let i=n[s];if(i!=null&&!G.has(s)){if(s==="children")if(Array.isArray(i)){let[g,b]=L(i);b&&f.push(()=>{let R=$(i);v(u,s,R.join(""))}),a.children=g;return}else if(y(i)){f.push(()=>{let b=i();v(u,s,b)});let g=i();y(g)?a.children=g():a.children=i()}else a.children=p(i);y(i)&&(f.push(()=>{let g=i();u&&v(u,s,g)}),a[s]=i())}}),l(()=>{f.forEach(s=>s())}),f.length&&(E=s=>{u=s,e&&e(s)}),_({_signalComponent:D,props:a,ref:E||e},r)}function ht({each:t,children:n}){let[e,r]=z(t()),o=K({});if(q(()=>{l(()=>{r(t())})},c),e&&e.length)return e.map(n).map((m,a)=>{let f=m.key||a,u=o.current[f];return u||(o.current[f]=p(m),o.current[f])})}import{useMemo as N,useState as B}from"react";function _t({value:t,children:n}){let[e,r]=B(!!t());N(()=>{typeof t=="function"&&l(()=>{r(t())})},c);let o=N(()=>p(n),[c]);return e?o:null}import{useEffect as H}from"react";function Q(t){if(typeof window=="undefined")return;let n=localStorage.getItem(t);if(!!n)try{return JSON.parse(n).j}catch(e){return}}function U(t,n){typeof window!="undefined"&&localStorage.setItem(t,JSON.stringify({j:n}))}var X=[],S=0;function jt(t,n){let e=T(n);return X.push({signal:e,key:t}),l(()=>{let r=e();S&&(S===2&&U(t,r),S===1&&(S=2))}),e}function Ct(){H(()=>{typeof window!="undefined"&&(S=1,X.forEach(t=>{let n=Q(t.key);t.signal.value=n===void 0?t.signal.value:n}))},c)}import{useRef as W}from"react";function Rt(t){return W(T(t)).current}export{c as EmptyArray,ht as For,_t as If,et as computed,d as context,l as effect,y as isSignal,k as safeId,T as signal,p as signalJSX,jt as signalStorage,Ct as useInitStorage,Rt as useSignal};
