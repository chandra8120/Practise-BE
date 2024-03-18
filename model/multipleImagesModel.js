import { Schema, model } from 'mongoose';

const sekharSchema = new Schema({
    name: { type: String, required: true },
    multipleImages: [{ type: String, required: true }]
});

const Sekhar = model("Sekhar", sekharSchema);

export default Sekhar;
