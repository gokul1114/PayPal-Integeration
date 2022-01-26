import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors"


const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
 const client =  new MongoClient(MONGO_URL);
 await client.connect()
 return client
}

const client = await createConnection();



app.post("/savePaymentDetails",async(req,resp) => {
    const body = req.body;
    console.log(body)
    const data = await client.db('Transactions').collection('payments').insertOne(body);
    resp.send({message : "data added successfully"})
})

app.get("/",(req,resp)=>{
    resp.send("Hello World")
})

app.listen(9000,() => {console.log("server started")})
