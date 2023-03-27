import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Please Enter product Name'], trim: true },
        desc: { type: String, required: [true, 'Please Enter product Description'] },
        price: { type: Number, required: [true, 'Please Enter product Price'] },
        ratings: { type: Number, default: 0 },
        images: [{
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }],
        category: {
            type: String,
            required: true,
        },
        stock: {
            type: String,
            required: [true, "Please Enter product Stock"],
            maxLength: [4, "Stock cannot exceed 4 characters"],
            default: 1,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        reviews: [{
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                requred: true,
            },
            comment: {
                type: String,
                required: true,
            },
        }],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
)

export default mongoose.model('Product', ProductSchema)