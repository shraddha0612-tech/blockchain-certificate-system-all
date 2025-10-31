
import React, {useState} from 'react';
export default function Issue(){
  const [name,setName]=useState('');
  const [course,setCourse]=useState('');
  const [inst,setInst]=useState('');
  const [date,setDate]=useState('');
  const [message,setMessage]=useState('');

  const submit = async ()=>{
    if(!name||!course||!inst||!date){ setMessage('fill all fields'); return; }
    setMessage('This lite demo prepares the payload. To issue on-chain deploy the contract and call issueCertificate via backend or MetaMask signer.');
    alert('Demo: payload prepared. Follow README to deploy & issue on-chain.');
  };

  return (<div>
    <h2>Issue Certificate (Lite)</h2>
    <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
    <input placeholder="Course" value={course} onChange={e=>setCourse(e.target.value)} />
    <input placeholder="Institute" value={inst} onChange={e=>setInst(e.target.value)} />
    <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
    <button onClick={submit}>Create (Demo)</button>
    <div className="card">{message}</div>
  </div>);
}
