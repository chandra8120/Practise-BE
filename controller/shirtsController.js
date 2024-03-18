import Shirt from "../model/shirtModel.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const shirtController = {
    createShirt: [
        upload.single("image"),
        async (req, res) => {
            try {
                const { name, price, link } = req.body;
                const image = req.file.buffer.toString("base64");

                // Validate required fields
                if (!image || !name || !price || !link) {
                    return res.status(400).json({ message: "All fields are required" });
                }

                // Create and save the new shirt
                const newShirt = new Shirt({ image, name, price, link });
                const savedShirt = await newShirt.save();
                res.status(200).json({ message: "Successfully added the data", savedShirt });
            } catch (error) {
                console.error('Error adding shirt:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    ],
    getAllShirts: async (req, res) => {
        try {
            const getData = await Shirt.find();
            res.status(200).json(getData); // Changed status code to 200 OK
        } catch (error) {
            console.error('Error getting all shirts:', error);
            res.status(500).json({ error: "Failed to get the data" });
        }
    }
};

export default shirtController;
