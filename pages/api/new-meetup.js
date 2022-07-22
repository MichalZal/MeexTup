// api/new-meetup
import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;


    const client = await MongoClient.connect('mongodb+srv://Miszka:123@cluster0.clrcle8.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db()
    const meetupsCollection = db.collection('meetups')

    const response = await meetupsCollection.insertOne(data)
    console.log(response)

    await client.close()

    await res.status(201).json({message: "Meetup inserted"})
  }
}

export default handler;