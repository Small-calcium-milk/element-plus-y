import{d as g,ad as h,h as b,ae as k,D as r,o as v,c as w,I as o,w as s,m as a,a as m,k as x}from"./framework.ipPE9Npu.js";const F={class:"m-4"},C=x("p",null,"设置最小密码长度4，最大密码长度12",-1),B=g({__name:"length",setup(R){const i=h({ruleFormRef:b(),form:{password:"111111111111,"}}),{ruleFormRef:n,form:d}=k(i),f=e=>{e&&e.validate(t=>{if(t)console.log("submit!");else return console.log("error submit!"),!1})},c=e=>{e&&e.resetFields()};return(e,t)=>{const l=r("el-button"),u=r("el-form-item"),_=r("YPasswordStrength");return v(),w("div",F,[C,o(_,{ref_key:"ruleFormRef",ref:n,model:a(d),"label-width":"120px",fieldsOptions:{minLength:4,maxLength:12}},{default:s(()=>[o(u,null,{default:s(()=>[o(l,{type:"primary",onClick:t[0]||(t[0]=p=>f(a(n)))},{default:s(()=>[m(" 确定 ")]),_:1}),o(l,{onClick:t[1]||(t[1]=p=>c(a(n)))},{default:s(()=>[m("重置")]),_:1})]),_:1})]),_:1},8,["model"])])}}});export{B as default};
