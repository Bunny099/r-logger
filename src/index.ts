import express, { json } from "express";
import { prismaDb } from "../lib/db";
import cors from "cors"

const app = express();
app.use(cors())
app.use(json())


app.get("/request", async (req, res) => {
  try {
    const response = await prismaDb.request.findMany();
    if (!response) {
      return res.status(500).json({ message: "No data found!" })
    }
    return res.status(200).json({ response, message: "Data find Successfully!" })
  } catch (e) {
    return res.status(500).json("Server error!")
  }
});

app.post("/request", async (req, res) => {
  try {
    const { type, payload, } = req.body;
    if (!type || !payload) {
      return res.status(400).json({ message: "All fields are required!" })
    }
    const response = await prismaDb.request.create({
      data: {
        type, payload
      }
    })
    if (!response) {
      return res.status(500).json({ message: "Db creation failed!" })
    }
    return res.status(201).json({ response, message: "Success!" })
  } catch (e) {
    return res.status(500).json("Server failed!")
  }

});

app.get("/request/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id required!" })
    }
    const response = await prismaDb.request.findFirst({ where: { id } });
    if (!response) {
      return res.status(404).json({ message: "No data found with this Id!" })
    }
    return res.status(200).json({ response, message: "Data found successfully!" })
  } catch (e) {
    return res.status(500).json({ message: "Server error!" })
  }

});

app.patch("/request/:id/status", async (req, res) => {
  try {
    const id = req.params.id;
    let state;
    if (!id) {
      return res.status(400).json({ message: "id field is missing!" })
    }
    const dbData = await prismaDb.request.findFirst({ where: { id } });
    //current state is pending ,here state = pending , we want pending->processing->completed : no reverse
    state = dbData?.status;
    if (state === "PENDING") {
      await prismaDb.request.update({ where: { id }, data: { status: "PROCESSING" } })
    } else if (state == "PROCESSING") {
      await prismaDb.request.update({ where: { id }, data: { status: "COMPLETED" } })
    } else {
      return res.status(409).json({ state, message: "All ready completed !" })
    }

  } catch (e) {
    return res.status(500).json({ message: "Server error!" })
  }

})


app.listen(3000, () => {
  console.log("port is running on 3000")
});
