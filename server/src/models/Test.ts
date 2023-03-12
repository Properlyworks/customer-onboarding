import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TestSchema = new Schema({
    test : String
})

const Test = mongoose.model("Test", TestSchema);

export default Test;