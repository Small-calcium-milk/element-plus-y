import{d as m,h as p,ad as u,ae as c,D as f,o as _,c as y,k as s,I as i,m as e,F as V}from"./framework.ipPE9Npu.js";const k={class:"m-4"},R=s("p",null,"全选子集 默认递归",-1),h={class:"m-4"},v=s("p",null,"全选子集 不递归",-1),b=m({__name:"isDeepSelect",setup(D){p([]);const d=u({formRef:null,refData:[],form:{a:"12",b:[12],c:"12"},formOptions:{users:[{id:1,title:"名称1",children:[{id:12,title:"名称1-1",children:[{id:120,title:"名称1-1"},{id:130,title:"名称1-2"}]},{id:13,title:"名称1-2"}]},{id:2,title:"名称2"}]},type:"",temp:{}}),{formRef:r,form:t,formOptions:a}=c(d);return(N,o)=>{const n=f("y-cascader");return _(),y(V,null,[s("div",k,[R,i(n,{ref_key:"formRef",ref:r,modelValue:e(t).a,"onUpdate:modelValue":o[0]||(o[0]=l=>e(t).a=l),options:e(a).users,props:{multiple:!0},isKeyNumber:!0,dataType:"String"},null,8,["modelValue","options"])]),s("div",h,[v,i(n,{ref_key:"formRef",ref:r,modelValue:e(t).c,"onUpdate:modelValue":o[1]||(o[1]=l=>e(t).c=l),options:e(a).users,props:{multiple:!0},isKeyNumber:!0,dataType:"String",isDeepSelect:!1},null,8,["modelValue","options"])])],64)}}});export{b as default};