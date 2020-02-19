(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{83:function(t,e,i){"use strict";i.r(e);var r=function(){};r.create=function(){var t=new Float32Array(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},r.fromValues=function(t,e,i,r){var n=new Float32Array(4);return n[0]=t,n[1]=e,n[2]=i,n[3]=r,n},r.transformMat4=function(t,e,i){var r=e[0],n=e[1],o=e[2],a=e[3];return t[0]=i[0]*r+i[4]*n+i[8]*o+i[12]*a,t[1]=i[1]*r+i[5]*n+i[9]*o+i[13]*a,t[2]=i[2]*r+i[6]*n+i[10]*o+i[14]*a,t[3]=i[3]*r+i[7]*n+i[11]*o+i[15]*a,t},r.perspectiveDivision=function(t,e){var i=e[0],r=e[1],n=e[2],o=e[3];return t[0]=i/o,t[1]=r/o,t[2]=n/o,t};var n=r,o=function(){};o.create=function(){var t=new Float32Array(3);return t[0]=0,t[1]=0,t[2]=0,t},o.fromValues=function(t,e,i){var r=new Float32Array(3);return r[0]=t,r[1]=e,r[2]=i,r};var a=o,s=function(){};s.create=function(){var t=new Float32Array(16);return t[0]=1,t[5]=1,t[10]=1,t[15]=1,t},s.multiply=function(t,e,i){var r=e[0],n=e[1],o=e[2],a=e[3],s=e[4],c=e[5],h=e[6],u=e[7],p=e[8],l=e[9],f=e[10],v=e[11],d=e[12],x=e[13],g=e[14],w=e[15],m=i[0],y=i[1],_=i[2],M=i[3],b=i[4],j=i[5],V=i[6],C=i[7],A=i[8],F=i[9],T=i[10],E=i[11],P=i[12],k=i[13],H=i[14],O=i[15];return t[0]=r*m+n*b+o*A+a*P,t[1]=r*y+n*j+o*F+a*k,t[2]=r*_+n*V+o*T+a*H,t[3]=r*M+n*C+o*E+a*O,t[4]=s*m+c*b+h*A+u*P,t[5]=s*y+c*j+h*F+u*k,t[6]=s*_+c*V+h*T+u*H,t[7]=s*M+c*C+h*E+u*O,t[8]=p*m+l*b+f*A+v*P,t[9]=p*y+l*j+f*F+v*k,t[10]=p*_+l*V+f*T+v*H,t[11]=p*M+l*C+f*E+v*O,t[12]=d*m+x*b+g*A+w*P,t[13]=d*y+x*j+g*F+w*k,t[14]=d*_+x*V+g*T+w*H,t[15]=d*M+x*C+g*E+w*O,t},s.perspective=function(t,e,i,r,n){var o,a=1/Math.tan(e/2);return t[0]=a/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=n&&n!==1/0?(o=1/(r-n),t[10]=(n+r)*o,t[14]=2*n*r*o):(t[10]=-1,t[14]=-2*r),t},s.orthographic=function(t,e,i,r,n,o,a){var s=1/(e-i),c=1/(r-n),h=1/(o-a);return t[0]=-2*s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(e+i)*s,t[13]=(n+r)*c,t[14]=(a+o)*h,t[15]=1,t};var c=s,h=function(){this._matrix=c.create()};h.prototype.getMatrix=function(){return this._matrix};var u=h,p=function(t){if("string"==typeof t&&(t=document.querySelector("#"+t)),!(t instanceof HTMLElement))throw"Container must be HTMLElment";this._initCanvas(t),this.x=0,this.y=0,this.near=0,this.far=1,this.models=[],this._scale=a.fromValues(1,1,1),this._rotate=a.create(),this._position=a.create(),this._projection=new u,this.updateViewMatrix()},l={width:{configurable:!0},height:{configurable:!0},scale:{configurable:!0},rotate:{configurable:!0},position:{configurable:!0},viewMatrix:{configurable:!0},projection:{configurable:!0}};l.width.get=function(){return this._width},l.height.get=function(){return this._height},l.scale.get=function(){return this._scale},l.scale.set=function(t){this._scale=t,this.updateViewMatrix()},l.rotate.get=function(){return this._rotate},l.rotate.set=function(t){this._rotate=t,this.updateViewMatrix()},l.position.get=function(){return this._position},l.position.set=function(t){this._position=t,this.updateViewMatrix()},l.viewMatrix.get=function(){return this._viewMatrix},l.viewMatrix.set=function(t){this._viewMatrix=t},l.projection.get=function(){return this._projection},l.projection.set=function(t){this._projection=t,this.render()},p.prototype.appendChild=function(t){this.models.push(t),this.render()},p.prototype.clearRenderer=function(){this.ctx.clearRect(0,0,this.width,this.height)},p.prototype.render=function(){var t=this;this.clearRenderer(),Array.isArray(this.models)&&this.models.forEach(function(e){return t.renderModel(e)})},p.prototype.renderModel=function(t){var e=this;if(t&&t.vertices){var i=this.viewMatrix,r=this.projection.getMatrix(),o=c.create();c.multiply(o,i,o),c.multiply(o,r,o);var s=t.vertices.map(function(i){var r=n.transformMat4(n.create(),i,t.matrix);console.log(r),console.log(o),n.transformMat4(r,r,o),console.log(r);var s=n.perspectiveDivision(a.create(),r),c=s[0],h=s[1],u=s[2],p=e.x,l=e.y,f=e.width,v=e.height,d=e.near,x=e.far;return a.fromValues(.5*f*c+(p+.5*f),v-(.5*v*h+(l+.5*v)),.5*(x-d)*u+.5*(x+d))});if(console.log(s),s.forEach(function(t){e.ctx.beginPath(),e.ctx.arc(t[0],t[1],5,0,2*Math.PI,!0),e.ctx.stroke()}),t.indexes)for(var h=t.indexes,u=h.length,p=0;p<u;p+=3){var l=s[h[p]],f=s[h[p+1]],v=s[h[p+2]];this.ctx.beginPath(),this.ctx.moveTo(l[0],l[1]),this.ctx.lineTo(f[0],f[1]),this.ctx.lineTo(v[0],v[1]),this.ctx.lineTo(l[0],l[1]),this.ctx.stroke()}}},p.prototype._initCanvas=function(t){this._width=t.clientWidth,this._height=t.clientHeight;var e=document.createElement("canvas");e.width=this.width,e.height=this.height,this.canvas=e,this.ctx=e.getContext("2d"),t.appendChild(e)},p.prototype.updateViewMatrix=function(){var t=c.create(),e=c.create();e[0]=this.scale[0],e[5]=this.scale[1],e[10]=this.scale[2],this.viewMatrix=c.multiply(t,e,t);var i=c.create();i[3]=this.position[0],i[7]=this.position[1],i[11]=this.position[2],this.viewMatrix=c.multiply(t,i,t),this.render()},Object.defineProperties(p.prototype,l);var f=p,v=function(t,e){for(var i=[],r=t.length,o=0;o<r;o+=3){var a=t[o],s=t[o+1],h=t[o+2];i.push(n.fromValues(a,s,h,1))}this.vertices=i,this.indexes=e,this.matrix=c.create()},d=function(t){function e(e,i,r,n){t.call(this),this.setMatrix(e,i,r,n)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setMatrix=function(t,e,i,r){c.perspective(this._matrix,t,e,i,r)},e}(u),x=function(t){function e(e,i,r,n,o,a){t.call(this),this.setMatrix(e,i,r,n,o,a)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setMatrix=function(t,e,i,r,n,o){c.orthographic(this._matrix,t,e,i,r,n,o)},e}(u),g=new f("container"),w=new v([.5,0,0,0,.5,0,-.5,0,0,0,-.5,0,.5,.5,0,.5,-.5,0,-.5,-.5,0,-.5,.5,0,.5,0,.5,0,.5,.5,-.5,0,.5,0,-.5,.5,.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,-.5,.5,.5,.5,0,-.5,0,.5,-.5,-.5,0,-.5,0,-.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5]),m=new d(45,g.width/g.height,.1,100),y=new x(-1,1,-1,1,.1,100);g.position=a.fromValues(0,0,-10),g.projection=m,g.appendChild(w),g.render();var _=(new dat.GUI).addFolder("Projection");_.add({projection:"perspective"},"projection",["perspective","orthographic"]).onFinishChange(function(t){g.projection="orthographic"===t?y:m}),_.open()}},[[83,0]]]);
//# sourceMappingURL=software-rendering.js.map