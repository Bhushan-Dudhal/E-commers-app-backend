import mongoose from "mongoose";


export const database = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "Application" })
        .then(() => console.log('Database Connection Successfully ')
        ).catch((e) => console.log(`Error While Database Connection ${e}`)
        )
}