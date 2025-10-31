
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const INFURA_URL = process.env.INFURA_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(INFURA_URL);
const abi = [
  // Minimal ABI: functions and events used
  "function verifyCertificate(bytes32) view returns (tuple(string name,string course,string institute,uint256 date,address issuedBy,bool valid))",
  "event CertificateIssued(bytes32 indexed certHash, string name, string course, address indexed issuedBy)"
];
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

app.get("/verify/:hash", async (req, res) => {
  try {
    const h = req.params.hash;
    if (!h.startsWith("0x")) {
      return res.status(400).json({ error: "Please provide full bytes32 hash (0x...)" });
    }
    const cert = await contract.verifyCertificate(h);
    const result = {
      name: cert[0],
      course: cert[1],
      institute: cert[2],
      date: Number(cert[3]),
      issuedBy: cert[4],
      valid: cert[5]
    };
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to verify certificate" });
  }
});

app.get("/", (req, res) => res.send({ status: "backend running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on port", PORT));
