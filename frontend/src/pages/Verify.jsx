
import React, {useState} from 'react';
import axios from 'axios';
export default function Verify(){
  const [hash,setHash]=useState('');
  const [res,setRes]=useState(null);

  const check = async ()=>{
    try {
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const r = await axios.get(`${url}/verify/${hash}`);
      setRes(r.data);
    } catch (err) {
      setRes({ error: err.response?.data?.error || 'Failed' });
    }
  };

  return (<div>
    <h2>Verify Certificate</h2>
    <input placeholder="Enter full bytes32 hash (0x...)" value={hash} onChange={e=>setHash(e.target.value)} />
    <button onClick={check}>Verify</button>
    {res && <div className="card"><pre>{JSON.stringify(res, null, 2)}</pre></div>}
  </div>);
}
