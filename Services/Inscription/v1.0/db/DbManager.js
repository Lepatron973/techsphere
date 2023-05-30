const {MongoClient, ObjectId} = require('mongodb');
module.exports = {
    DbManager : class {
        client;
        constructor(){
            this.client = new MongoClient(process.env.DB_URL);
            this.createDb();
        }
        save = async (user)=>{
            await this.client.connect();
            let db = this.client.db(process.env.DB_NAME)
            let collection = db.collection(process.env.COLLECTION)
            let result = await collection.insertOne(user);
            this.client.close();
            return result;
        }
        login = async (user)=>{
            await this.client.connect();
            let db = this.client.db(process.env.DB_NAME)
            let collection = db.collection(process.env.COLLECTION)
            let result = await collection.find({email:user.email}).toArray();
            this.client.close();
            return result;
        }

        createDb = async ()=>{
            await this.client.connect();
            let db = this.client.db(process.env.DB_NAME)
            let collection = db.collection(process.env.COLLECTION)
            let result = await collection.createIndex({"email":1},{unique:true})
            this.client.close();
            return result;
        }
    }
}