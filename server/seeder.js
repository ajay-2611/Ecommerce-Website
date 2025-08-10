import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config();

const sampleProducts = [
    {
        name: "Men's Casual T-Shirt",
        price: 599,
        description: "Comfortable cotton t-shirt for casual wear",
        category: "Men",
        countInStock: 50,
        image: "https://via.placeholder.com/300x300?text=Men's+T-Shirt"
    },
    {
        name: "Women's Summer Dress",
        price: 1299,
        description: "Elegant summer dress with floral pattern",
        category: "Women",
        countInStock: 30,
        image: "https://via.placeholder.com/300x300?text=Women's+Dress"
    },
    {
        name: "Kids' Jeans",
        price: 799,
        description: "Durable jeans for active kids",
        category: "Kids",
        countInStock: 25,
        image: "https://via.placeholder.com/300x300?text=Kids+Jeans"
    },
    {
        name: "Men's Formal Shirt",
        price: 899,
        description: "Professional formal shirt for office wear",
        category: "Men",
        countInStock: 40,
        image: "https://via.placeholder.com/300x300?text=Men's+Formal+Shirt"
    },
    {
        name: "Women's Blouse",
        price: 699,
        description: "Stylish blouse for professional settings",
        category: "Women",
        countInStock: 35,
        image: "https://via.placeholder.com/300x300?text=Women's+Blouse"
    },
    {
        name: "Kids' Hoodie",
        price: 599,
        description: "Warm and cozy hoodie for children",
        category: "Kids",
        countInStock: 20,
        image: "https://via.placeholder.com/300x300?text=Kids+Hoodie"
    }
];

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany();
        console.log("🗑️  Existing products cleared");
        
        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log("✅ Sample products imported successfully");
        
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error importing data: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        
        await Product.deleteMany();
        console.log("🗑️  All products deleted");
        
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error destroying data: ${error.message}`);
        process.exit(1);
    }
};

// Run seeder based on command line argument
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
