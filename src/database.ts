import mongoose from "mongoose";

export default async function connect() {
    
    try {
       await mongoose.connect('mongodb://localhost/ts-practica');
       console.log(">> database conectada")
    } catch (error) {
        console.log(error, "Error en mongo")
    }
}