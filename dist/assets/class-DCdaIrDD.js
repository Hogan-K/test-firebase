import{c,o as l,a as t}from"./index-BKur6sUv.js";const i=t("h1",null," class ",-1),m=t("div",null,[t("h2",null," My car ")],-1),h=[i,m],_={__name:"class",setup(u){class r{constructor(e,n){this[Symbol.for("height")]=e,this[Symbol.for("width")]=n,this[Symbol.for("name")]=null}static size(){return this[Symbol.for("height")]*this[Symbol.for("width")]}setCarName(e){this[Symbol.for("name")]=`我的車叫做${e}`}get nickname(){return this[Symbol.for("name")]}}class s extends r{changeColor(e){return this[Symbol.for("color")]=`${e}漆`}setCarName(e){super.setCarName(e)}get nickname(){if(super.nickname)return super.nickname;const e=this[Symbol.for("color")]+"的車";return super.setCarName(e),super.nickname}}const a=new s(20,10);return console.log(a),(o,e)=>(l(),c("div",null,h))}};export{_ as default};
