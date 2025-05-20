import { Router } from "express";
import mongoose from "mongoose";
import cloudinary from "../cloudinary.js";
import { upload } from "../multer.js";
import streamifier from "streamifier"



const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
},
    { timestamps: true })
const Image = mongoose.model("Image", imageSchema)




export const imageRouter = Router();

//create images
imageRouter.post("/upload", upload.single("image"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { originalname, mimetype } = req.file;
        const createdAt = new Date();


        const stream = cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            async (error, result) => {
                if (error) {
                    console.log('Cloudinary upload error:', error);
                    return res.status(500).json({ error: error.message })
                }

                try {
                    const newImage = await new Image({
                        name: originalname,
                        imageUrl: result.secure_url,
                        type: mimetype,
                        createdAt,
                    })
                    await newImage.save()

                    res.status(201).json({
                        success: true,
                        message: "Image saved successfully!",
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                } catch (error) {
                    console.error('Database save error:', error);
                    res.status(500).json({ error: error.message });
                }
            }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (error) {
        console.log("unexpected error", error)
        res.status(500).json({ error: error.message });
    }
});

// get all images
imageRouter.get("/images", async(req, res) => {
try {
     const Images = await Image.find()
    res.status(200).json({
        success: true,
        Images: Images
    })
} catch (error) {
    res.status(400).json("Error fetching images:", error)
}

})
// updates the images
imageRouter.put("/images/:imageId", async(req, res) => {
    try {
        const { name }= req.body;
        const {imageId} =req.params;
        await Image.findByIdAndUpdate(imageId ,{name}, {new: true})
        res.status(200).json({
            success: true,
            message: "Image data updated successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Error occured while updating image data", error: error.message })
    }

})
// deletes images 
imageRouter.delete("/images/:imageId",async (req, res) => {
    try {
        const {imageId}= req.params;

    await Image.findByIdAndDelete(imageId)
    res.status(201).json({success: true,
        message: "Image deleted"
    })
    } catch (error) {
        res.status(500).json({ message: "Error occured while updating image data", error: error.message })        
    }
})

