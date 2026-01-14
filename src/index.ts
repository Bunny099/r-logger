import express, { json } from "express";
import { prismaDb } from "../lib/db";
import cors from "cors"
const app = express();
app.use(cors())
app.use(json())

app.post("/request", async (req, res) => {
  try {
    const { type, payload, status } = await req.body;
    if (!type || !payload || !status) {
      return res.status(400).json({ message: "All fields are required!" })
    }
    const response = await prismaDb.request.create({
      data: {
        type, payload, status
      }
    })
    if (response) {
      return res.status(500).json({ message: "Db creation failed!" })
    }
    return res.status(201).json({ response, message: "Success!" })
  } catch (e) {
    return res.status(500).json("Server failed!")
  }

});
app.get("/request:id", (req,res) => { });
app.patch("/request/:id/status", async (req, res) => { })
app.get("/request", (req, res) => { });

app.listen(3000, () => {
  console.log("port is running on 3000")
});
