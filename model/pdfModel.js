import { Schema, model } from 'mongoose';

const pdfSchema = new Schema({
    name: { type: String, required: true },
    pdf: { type: Buffer, required: true }
});

const Pdf = model("Pdf", pdfSchema);

export default Pdf;
