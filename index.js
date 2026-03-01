import express from "express"
import { MongoClient } from "mongodb"

const app = express()
const port = 5050

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const MONGO_URL ="mongodb://localhost:27017"
const client = new MongoClient(MONGO_URL)
const DB_NAME = "sohamdey-db"
let db

const connectMongo = async () => {
  await client.connect()
  db = client.db(DB_NAME)
  console.log("MongoDB connected")
}

connectMongo().catch((error) => {
  console.error("MongoDB connection failed:", error.message)
})


app.get('/getUsers',async(req,res)=>{
    if (!db) {
      return res.status(500).send("Database not connected")
    }

    const data= await db.collection('users').find({}).toArray();
    res.send(data);
})

app.post('/register', async(req, res) => {
  try {
    if (!db) {
      return res.status(500).send("Database not connected")
    }

    const name = req.body?.name?.toString().trim()
    const email = req.body?.email?.toString().trim()
    const password = req.body?.password?.toString().trim()

    if (!name || !email || !password) {
      return res.status(400).send("Please fill name, email and password")
    }

    const userobj = { name, email, password }

    const data= await db.collection('users').insertOne(userobj);
        
    console.log(data);
    console.log("data inserted in DB successfully");
    return res.status(201).send("User registered successfully")
  } catch (error) {
    console.error(error)
    return res.status(500).send("Failed to save user")
  }
})



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
