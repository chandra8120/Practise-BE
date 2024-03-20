// backend/controllers/pdfController.js
import Pdf from "../model/pdfModel.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pdfController = {
    createPdf: [
        upload.single('pdf'), // Invoking multer middleware to handle file upload
        async (req, res) => {
            try {
                // Check if file is included in the request
                if (!req.file) {
                    return res.status(400).json({ message: 'PDF file is required' });
                }

                // Extract other data from the request body
                const { name } = req.body;

                // Create a new PDF document
                const newPdf = new Pdf({
                    name: name,
                    pdf: req.file.buffer // Assuming req.file.buffer contains the file data
                });

                // Save the PDF document to the database
                await newPdf.save();

                // Respond with success message
                res.status(201).json({ message: 'PDF created successfully' });
            } catch (error) {
                // Handle errors
                console.error("Error creating PDF:", error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    ],
    getAllPdfs: async (req, res) => {
        try {
            // Retrieve all PDFs from the database
            const pdfs = await Pdf.find();

            // Send the PDFs as a response
            res.status(200).json(pdfs);
        } catch (error) {
            // Handle errors
            console.error("Error fetching PDFs:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getPdf: async (req, res) => {
        try {
            // Retrieve PDF by ID from the request parameters
            const pdfId = req.params.id;
            const pdf = await Pdf.findById(pdfId);

            // If PDF is not found
            if (!pdf) {
                return res.status(404).json({ message: 'PDF not found' });
            }

            // Send the PDF file as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.send(pdf.pdf); // Assuming pdf.pdf contains the Buffer data of the PDF
        } catch (error) {
            // Handle errors
            console.error("Error fetching PDF:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
export default pdfController;
