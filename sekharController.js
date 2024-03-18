import Sekhar from "./sekharModel.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array("multipleImages"); // Assuming the field name is "multipleImages"

const sekharController = {
    createSekhar: async (req, res) => {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    console.error("Error uploading files:", err);
                    return res.status(500).json({ error: "Internal Server error" });
                }

                // Destructure req.body and req.files
                const { name } = req.body;
                const multipleImages = req.files.map(file => file.buffer.toString('base64'));

                // Create a new Sekhar instance with data
                const newSekhar = new Sekhar({
                    name,
                    multipleImages
                });

                // Save the Sekhar instance
                const savedSekhar = await newSekhar.save();

                res.status(201).json({ message: "Successfully added the data", savedSekhar });
            });
        } catch (error) {
            console.error("Error creating Sekhar:", error);
            res.status(500).json({ error: "Internal Server error" });
        }
    },
    getAllSekhars: async (req, res) => {
        try {
            // Retrieve all Sekhar documents from the database
            const allSekhars = await Sekhar.find();

            // Return the list of Sekhars as a JSON response
            res.status(200).json(allSekhars);
        } catch (error) {
            console.error("Error getting all Sekhars:", error);
            res.status(500).json({ error: "Internal Server error" });
        }
    }

};

export default sekharController;
