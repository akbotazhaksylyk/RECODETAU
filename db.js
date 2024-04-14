// const mongoose = require("mongoose");

// async function connectToDatabase() {
//     try {
//         await mongoose.connect("mongodb+srv://akbotazhaksy:kgSiwvYTiTxJonpS@cluster0.ltep08e.mongodb.net/qansha_ai?retryWrites=true&w=majority&appName=Cluster0");
//         console.log("Successfully connected to database!");
//     } catch (err) {
//         console.error("Database connection error: ", err);
//     }
// }

const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://akbotazhaksy:QilDxrZDdMUAgeiV@cluster0.pd0umxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Successfully connected to database!");
    } catch (err) {
        console.error("Database connection error: ", err);
    }
}

module.exports = connectToDatabase;