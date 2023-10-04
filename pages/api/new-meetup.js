//POST/api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://aman:tRIorAzsa3kKIB61@cluster0.8254iar.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meeupsCollection = db.collection("meetups");
    const result = await meeupsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "meetup inserted successufully!" });
  }
}
export default handler;
