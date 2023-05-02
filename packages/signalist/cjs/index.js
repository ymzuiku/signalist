"use strict";var b=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames,v=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var I=(t,n,e)=>n in t?b(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,F=(t,n)=>{for(var e in n||(n={}))w.call(n,e)&&I(t,e,n[e]);if(v)for(var e of v(n))N.call(n,e)&&I(t,e,n[e]);return t};var X=(t,n)=>{var e={};for(var r in t)w.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(t!=null&&v)for(var r of v(t))n.indexOf(r)<0&&N.call(t,r)&&(e[r]=t[r]);return e};var $=(t,n)=>{for(var e in n)b(t,e,{get:n[e],enumerable:!0})},q=(t,n,e,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of L(n))!w.call(t,o)&&o!==e&&b(t,o,{get:()=>n[o],enumerable:!(r=G(n,o))||r.enumerable});return t};var K=t=>q(b({},"__esModule",{value:!0}),t);var it={};$(it,{EmptyArray:()=>c,For:()=>V,If:()=>k,computed:()=>H,context:()=>d,effect:()=>u,isSignal:()=>m,safeId:()=>B,signal:()=>h,signalJSX:()=>p,signalStorage:()=>et,useInitStorage:()=>rt,useSignal:()=>ot});module.exports=K(it);var d=[];function u(t){let n=()=>{d.push(n);try{t()}finally{d.pop()}};n()}var c=[];var _=0,z=Number.MAX_SAFE_INTEGER-9e5,R=0;function B(){return _+=1,_>z&&(_=0,R+=1),R+""+_}function m(t){return typeof t=="function"&&t.__signal}function h(t){let n=new Set,e=()=>{let o=d[d.length-1];return o&&n.add(o),e.value};return e.value=t,e.__signal=!0,new Proxy(e,{set:function(o,g,a){if(g==="value"){o.value=a;for(let f of n)f()}return!0}})}function H(t){let n=()=>(n.value=t(),n.value);return n.value=t(),n.__signal=!0,n}var S=require("react");var Q={value:!0,className:!0};function A(t,n,e){!t||(n==="children"?t.textContent=e:n==="value"?requestAnimationFrame(()=>{t.value=e}):n==="style"?Object.assign(t.style,e):Q[n]?t[n]=e:typeof e=="string"||typeof e=="number"?t.setAttribute(n,e):typeof e=="boolean"?e?t.setAttribute(n,""):t.removeAttribute(n):t[n]=e)}var U=Symbol("signal.element"),W=new Set(["$$typeof","key","ref","_owner","_store","_self","_source","_signal","_signalComponent"]);function j(t){let n=[];for(let e=0;e<t.length;e++)Array.isArray(t[e])?n=n.concat(j(t[e])):n.push(t[e]);return n}var Y=t=>{let n=!1;return[j(t).map(r=>m(r)?(n=!0,p(r())):p(r)),n]},Z=t=>j(t).map(e=>m(e)?e():e);function p(t){if(!t||t._signalComponent)return t;let J=t,{props:n,ref:e}=J,r=X(J,["props","ref"]);if(!n)return t;let o=typeof t.type,g=o==="object"&&typeof t.type.render=="function";if(o!=="string"&&!g)return t;let a=F({},n),f=[],l,C=null;return Object.keys(n).forEach(s=>{let i=n[s];if(i!=null&&!W.has(s)){if(s==="children")if(Array.isArray(i)){let[y,E]=Y(i);E&&f.push(()=>{let D=Z(i);A(l,s,D.join(""))}),a.children=y;return}else if(m(i)){f.push(()=>{let E=i();A(l,s,E)});let y=i();m(y)?a.children=y():a.children=i()}else a.children=p(i);m(i)&&(f.push(()=>{let y=i();l&&A(l,s,y)}),a[s]=i())}}),u(()=>{f.forEach(s=>s())}),f.length&&(C=s=>{l=s,e&&e(s)}),F({_signalComponent:U,props:a,ref:C||e},r)}function V({each:t,children:n}){let[e,r]=(0,S.useState)(t()),o=(0,S.useRef)({});if((0,S.useMemo)(()=>{u(()=>{r(t())})},c),e&&e.length)return e.map(n).map((g,a)=>{let f=g.key||a,l=o.current[f];return l||(o.current[f]=p(g),o.current[f])})}var x=require("react");function k({value:t,children:n}){let[e,r]=(0,x.useState)(!!t());(0,x.useMemo)(()=>{typeof t=="function"&&u(()=>{r(t())})},c);let o=(0,x.useMemo)(()=>p(n),[c]);return e?o:null}var O=require("react");function tt(t){if(typeof window=="undefined")return;let n=localStorage.getItem(t);if(!!n)try{return JSON.parse(n).j}catch(e){return}}function nt(t,n){typeof window!="undefined"&&localStorage.setItem(t,JSON.stringify({j:n}))}var P=[],T=0;function et(t,n){let e=h(n);return P.push({signal:e,key:t}),u(()=>{let r=e();T&&(T===2&&nt(t,r),T===1&&(T=2))}),e}function rt(){(0,O.useEffect)(()=>{typeof window!="undefined"&&(T=1,P.forEach(t=>{let n=tt(t.key);t.signal.value=n===void 0?t.signal.value:n}))},c)}var M=require("react");function ot(t){return(0,M.useRef)(h(t)).current}
