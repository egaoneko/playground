!function(){"use strict";var r=0;function n(){for(var t="#",r=0;r<6;r++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}var t=window.pg={};t.graphics={},t.graphics.three={},t.util={},t.utils={},t.utils.image={},t.utils.math={},t.graphics.three.three=$pg$graphics$three$three,t.util.getUid=function(t){return t._uid||(t._uid=++r)},t.utils.image.getRandomDummyImages=function(t,r,e){if("number"!=typeof t||"number"!=typeof r||"number"!=typeof e)throw new TypeError("Must be params number");for(var i="https://dummyimage.com/"+t+"x"+r+"/",u=[],a=0;a<e;a++)u.push(i+n().slice(1));return u},t.utils.image.getRandomHexColor=n,t.utils.math.randomInt=function(t,r){return Math.floor(Math.random()*(r-t+1)+t)}}();
//# sourceMappingURL=example.js.map
