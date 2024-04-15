//POST/api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const meeupsCollection = db.collection("meetups");
    const result = await meeupsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "meetup inserted successufully!" });
  }
}
export default handler;
