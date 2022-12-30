const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion , ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

//dbname =  task_manager   pass = !Y@MHrp@JTc5YKv
//TasksManager - TaskCollection

const uri ="mongodb+srv://task_manager:dR0jad0YKMP8Fqi8@cluster0.2mvagza.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {

     const TaskCollection = client.db("TasksManager").collection("TaskCollection")
    
     //find all task by eamil

     app.get("/task/:email" , async(req,res)=>{
        const email = req.params.email;
        const query = {
            email : email
        }
        const cursor = TaskCollection.find(query);
        const result = await cursor.toArray();
        res.send(result)
     })

    //post a task

    app.post("/task", async(req,res)=>{
        const task = req.body;
        const task_name = task.name;
        const email = task.email;
        const img = task.img;
        const taskInfo = {
            task_name,
            email,
            status:false,
            img
        }

        const result = await TaskCollection.insertOne(taskInfo);
        res.send(result)
    })

    //delete 

    app.delete("task/:id" , async(req,res)=>{
        const deleteId = req.params.id;
        const filter ={
            _id: ObjectId(deleteId)
        }
        const result = TaskCollection.deleteOne(filter);
        res.send(result)
    })




  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log("server is running");
});
