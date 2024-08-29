const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.5vcogtd.mongodb.net/?appName=job-portal-demo`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db("mernJobPortal");
        const jobCollections = db.collection("demoJobs");

        app.post("/post-job", async (req, res) => {
            try {
                const body = req.body;
                body.createAt = new Date();
                const result = await jobCollections.insertOne(body);
                res.status(result.insertedId ? 200 : 404).send(result.insertedId ? result : { message: "Cannot insert! Try again later", status: false });
            } catch (error) {
                console.error("Error posting job:", error);
                res.status(500).send({ message: "Server error", status: false });
            }
        });

        app.get("/all-jobs", async (req, res) => {
            try {
                const jobs = await jobCollections.find({}).toArray();
                res.send(jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                res.status(500).send({ message: "Server error", status: false });
            }
        });

        app.get("/all-jobs/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const job = await jobCollections.findOne({ _id: new ObjectId(id) });
                res.send(job);
            } catch (error) {
                console.error("Error fetching job by ID:", error);
                res.status(500).send({ error: error.message });
            }
        });

        app.get("/myJobs/:email", async (req, res) => {
            try {
                const jobs = await jobCollections.find({ postedBy: req.params.email }).toArray();
                res.send(jobs);
            } catch (error) {
                console.error("Error fetching jobs by email:", error);
                res.status(500).send({ error: error.message });
            }
        });

        app.delete("/job/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const result = await jobCollections.deleteOne({ _id: new ObjectId(id) });
                res.send(result);
            } catch (error) {
                console.error("Error deleting job:", error);
                res.status(500).send({ error: error.message });
            }
        });

        app.patch("/update-job/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const jobData = req.body;
                const result = await jobCollections.updateOne({ _id: new ObjectId(id) }, { $set: jobData }, { upsert: true });
                res.send(result);
            } catch (error) {
                console.error("Error updating job:", error);
                res.status(500).send({ error: error.message });
            }
        });

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });

        process.on('SIGINT', async () => {
            await client.close();
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectDB();
