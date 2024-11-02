import{r as c,j as e}from"./react-DpEaTGvj.js";import{a as L}from"./react-redux-DOrOl4D1.js";import{G as p,i as U,o as _,T as o,B as s,p as h,k as u,q as B,r as $,F as y,u as v,v as b,M as x,w as D,b as z}from"./@mui-D6pazF8g.js";import{P as k,b as G,c as V,o as q,d as H}from"./index-Gc4YVrAH.js";import{L as P}from"./react-router-dom-utljeJSg.js";import{B as i}from"./react-toastify-C68LgtoO.js";import{a as J}from"./react-router-CtV_OVEe.js";import"./@babel-BSpAw9Ks.js";import"./use-sync-external-store-rswVQh-A.js";import"./clsx-B-dksMZM.js";import"./@emotion-C00rQ2ai.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./stylis-FDnFs_-n.js";import"./react-is-DcfIKM1A.js";import"./react-transition-group-C7fztySn.js";import"./react-dom-D1vaxf0J.js";import"./scheduler-CzFDRTuY.js";import"./react-otp-input-kFSZkYLf.js";import"./axios-DzWr6d29.js";import"./@reduxjs-DYPsSoVN.js";import"./redux-DITMfSWq.js";import"./immer-DqxjFn0G.js";import"./redux-thunk-ClJT1hhx.js";import"./redux-persist-T4x0BtfD.js";import"./@remix-run-BOUEh3jQ.js";function ve(){const R=L(),M=J(),[I,w]=c.useState(null),[S,W]=c.useState(null),[f,A]=c.useState([]),[N,T]=c.useState(""),[n,d]=c.useState({username:"",email:"",contactNumber:"",employeeID:"",organizationName:"",department:"",roleInRTMS:"",idCardPhoto:"",passportPhoto:""}),m=t=>{const{name:r,value:a,files:l,type:g}=t.target;g==="file"?(d(j=>({...j,[r]:l[0]})),r==="passportPhoto"?w(l[0].name):r==="idCardPhoto"&&W(l[0].name)):d(j=>({...j,[r]:a}))},E=async t=>{t.preventDefault();const r=new FormData;Object.entries(n).forEach(([a,l])=>{r.append(a,l)});try{const a=await G(r);if(a!=null&&a.success){const l=a==null?void 0:a.passportPhoto,g=a==null?void 0:a.idCardPhoto;R(V({username:n.username,email:n.email,contactNumber:n.contactNumber,employeeID:n.employeeID,organizationName:n.organizationName,department:n.department,roleInRTMS:n.roleInRTMS,passportPhoto:l||n.passportPhoto,idCardPhoto:g||n.idCardPhoto})),i.success(a.message),M("/otpsignup")}else i.error(a.message)}catch(a){console.error(a),i.error("Signup Failed")}},F=async()=>{try{const t=await q();if(t.success&&Array.isArray(t.data)){A(t.data);const r=n.organizationName;r&&C(r)}else i.error("Invalid organization data format")}catch{i.error("Failed to load organizations")}},C=async t=>{try{const a=await H({organizationName:t});a.success&&Array.isArray(a.data)?a.data.length===0?i.info("No departments found for the selected organization"):T(a.data[0].departments):(console.error("Expected array but got:",a),i.error("Invalid department data format"))}catch(r){console.error("Error fetching departments:",r),i.error("Failed to load departments")}},O=t=>{const r=t.target.value;d(a=>({...a,organizationName:r})),r&&C(r)};return c.useEffect(()=>{F()},[]),e.jsx(k,{className:"bgImg",showheader:"true",showfooter:"true",children:e.jsx(p,{container:!0,children:e.jsx(p,{item:!0,padding:2,width:600,children:e.jsx(U,{children:e.jsxs(_,{orientation:"vertical",children:[e.jsxs(p,{item:!0,pt:1,sx:{textAlign:"center"},children:[e.jsx(o,{variant:"h4",children:"Registration"}),e.jsx(o,{variant:"h6",color:"#800000",children:"Create a New Account"})]}),e.jsxs(p,{item:!0,px:4,alignItems:"center",children:[e.jsx("form",{onSubmit:E,children:e.jsxs(p,{item:!0,gap:"9px",style:{display:"flex",flexDirection:"column"},children:[e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx(h,{sx:{mr:1},fontSize:"large"}),e.jsx(u,{label:"Username",variant:"standard",name:"username",value:n.username,onChange:m,fullWidth:!0})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx(B,{sx:{mr:1},fontSize:"large"}),e.jsx(u,{fullWidth:!0,label:"Email",variant:"standard",name:"email",value:n.email,onChange:m})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx($,{sx:{mr:1},fontSize:"large"}),e.jsx(u,{fullWidth:!0,label:"Mobile",name:"contactNumber",variant:"standard",value:n.contactNumber,onChange:t=>{const r=t.target.value;r.startsWith("+91")?d(a=>({...a,contactNumber:r})):d(a=>({...a,contactNumber:`+91${r}`}))},placeholder:"+91 (Mobile Number)"})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx(h,{sx:{mr:1},fontSize:"large"}),e.jsx(u,{fullWidth:!0,label:"Employee ID",name:"employeeID",variant:"standard",value:n.employeeID,onChange:m})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx(h,{sx:{mr:1},fontSize:"large"}),e.jsxs(y,{fullWidth:!0,variant:"standard",children:[e.jsx(v,{id:"organization-label",children:"Organization"}),e.jsx(b,{labelId:"organization-label",name:"organizationName",value:n.organizationName,onChange:O,label:"Organization",children:Array.isArray(f)&&f.length>0?f.map(t=>e.jsx(x,{value:t.organizationName,children:t.organizationName},t._id)):e.jsx(x,{value:"",children:"No organizations available"})})]})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx(h,{sx:{mr:1},fontSize:"large"}),e.jsxs(y,{fullWidth:!0,variant:"standard",children:[e.jsx(v,{id:"department-label",children:"Department"}),e.jsx(b,{labelId:"department-label",name:"department",value:n.department,onChange:t=>{const r=t.target.value;d(a=>({...a,department:r}))},label:"Department",children:N.length>0?N.map(t=>e.jsx(x,{value:t.departmentName,children:t.departmentName},t._id)):e.jsx(x,{value:"",children:"No departments available"})})]})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx(h,{sx:{mr:1},fontSize:"large"}),e.jsxs(y,{fullWidth:!0,variant:"standard",children:[e.jsx(v,{children:"Role in RTMS"}),e.jsxs(b,{name:"roleInRTMS",value:n.roleInRTMS,onChange:m,label:"Role in RTMS",children:[e.jsx(x,{value:"manager",children:"Manager"}),e.jsx(x,{value:"employee",children:"Employee"})]})]})]}),e.jsxs(s,{sx:{display:"flex",flexDirection:"column",mb:2},children:[e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end",mb:2},children:[e.jsx(D,{sx:{mr:1},fontSize:"large"}),e.jsxs(z,{variant:"outlined",component:"label",fullWidth:!0,children:[e.jsx("input",{type:"file",accept:"image/*",name:"passportPhoto",onChange:m,hidden:!0}),I?e.jsx(o,{variant:"body2",color:"textSecondary",children:I}):e.jsx(o,{children:"Update Photo"})]})]}),e.jsxs(s,{sx:{display:"flex",alignItems:"flex-end",mb:2},children:[e.jsx(D,{sx:{mr:1},fontSize:"large"}),e.jsxs(z,{variant:"outlined",component:"label",fullWidth:!0,children:[e.jsx("input",{type:"file",accept:"image/*",name:"idCardPhoto",onChange:m,hidden:!0}),S?e.jsx(o,{variant:"body2",color:"textSecondary",children:S}):e.jsx(o,{children:"Upload ID Card"})]})]})]}),e.jsx(z,{variant:"contained",fullWidth:!0,type:"submit",children:"Next"})]})}),e.jsxs(p,{item:!0,textAlign:"center",mt:.5,children:[e.jsxs(o,{fontSize:"medium",children:["Already have an account?"," ",e.jsx(P,{to:"/",style:{textDecoration:"none",cursor:"pointer"},children:"Login"})]}),e.jsxs(o,{fontSize:"medium",children:["Have Registration?"," ",e.jsx(P,{to:"/Popup",style:{textDecoration:"none",cursor:"pointer"},children:"Check Status"})]})]})]})]})})})})})}export{ve as default};
