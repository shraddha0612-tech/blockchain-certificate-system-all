

import React, {useState} from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Used for QR Code display

// Helper function to simulate a fixed 32-byte hash for the demo
const generateDemoHash = (name, course, inst, date) => {
  // Simulates a deterministic bytes32 hash based on data length
  const dataString = `${name}${course}${inst}${date}`;
  return '0x' + (
    dataString.length > 5 ? 
    '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b' : 
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  ).substring(0, 66);
};


export default function Issue(){
  const [name,setName]=useState('');
  const [course,setCourse]=useState('');
  const [inst,setInst]=useState('');
  const [date,setDate]=useState('');
  const [message,setMessage]=useState('');
  const [certHash, setCertHash] = useState(null); // State for the generated hash

  const submit = async ()=>{
    if(!name||!course||!inst||!date){ 
      setMessage('Error: Please fill all fields.'); 
      setCertHash(null);
      return; 
    }

    // 1. Simulate Hash Generation
    const hash = generateDemoHash(name, course, inst, date);
    setCertHash(hash);

    // 2. Prepare Message
    setMessage(`Demo payload prepared. Certificate Hash: ${hash}. Scan the QR code below for verification. To issue on-chain, deploy the contract and call issueCertificate via backend or MetaMask signer.`);
  };

  const qrCodeValue = certHash 
    ? (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000') + '/verify/' + certHash 
    : '';

  return (<div>
    <h2>Issue Certificate (Lite)</h2>
    <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
    <input placeholder="Course" value={course} onChange={e=>setCourse(e.target.value)} />
    <input placeholder="Institute" value={inst} onChange={e=>setInst(e.target.value)} />
    <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
    <button onClick={submit}>Create & Get QR (Demo)</button>
    
    <div className="card">{message}</div>

    {certHash && certHash.length > 10 && (
      <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
        <h3>Verification QR Code</h3>
        <QRCodeSVG 
          value={qrCodeValue} 
          size={200} 
          level="H"
          bgColor="#ffffff"
          fgColor="#000000"
          style={{ height: "auto", maxWidth: "100%", width: "200px" }}
        />
        <p style={{fontSize: '10px', wordBreak: 'break-all'}}>{qrCodeValue}</p>
      </div>
    )}
  </div>);
}
