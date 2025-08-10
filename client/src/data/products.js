// Import product images
import p1_img from "../assets/images/product_1.png";
import p10_img from "../assets/images/product_10.png";
import p11_img from "../assets/images/product_11.png";
import p12_img from "../assets/images/product_12.png";
import p13_img from "../assets/images/product_13.png";
import p14_img from "../assets/images/product_14.png";
import p15_img from "../assets/images/product_15.png";
import p16_img from "../assets/images/product_16.png";
import p17_img from "../assets/images/product_17.png";
import p18_img from "../assets/images/product_18.png";
import p19_img from "../assets/images/product_19.png";
import p2_img from "../assets/images/product_2.png";
import p20_img from "../assets/images/product_20.png";
import p21_img from "../assets/images/product_21.png";
import p22_img from "../assets/images/product_22.png";
import p23_img from "../assets/images/product_23.png";
import p24_img from "../assets/images/product_24.png";
import p25_img from "../assets/images/product_25.png";
import p26_img from "../assets/images/product_26.png";
import p27_img from "../assets/images/product_27.png";
import p28_img from "../assets/images/product_28.png";
import p29_img from "../assets/images/product_29.png";
import p3_img from "../assets/images/product_3.png";
import p30_img from "../assets/images/product_30.png";
import p31_img from "../assets/images/product_31.png";
import p32_img from "../assets/images/product_32.png";
import p33_img from "../assets/images/product_33.png";
import p34_img from "../assets/images/product_34.png";
import p35_img from "../assets/images/product_35.png";
import p36_img from "../assets/images/product_36.png";
import p4_img from "../assets/images/product_4.png";
import p5_img from "../assets/images/product_5.png";
import p6_img from "../assets/images/product_6.png";
import p7_img from "../assets/images/product_7.png";
import p8_img from "../assets/images/product_8.png";
import p9_img from "../assets/images/product_9.png";

const allProducts = [
    {
        id: 1,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p1_img,
        new_price: 50.0,
        old_price: 80.5,
        description: "Elegant striped blouse with flutter sleeves and peplum hem design.",
        countInStock: 15
    },
    {
        id: 2,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p2_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Stylish striped blouse perfect for casual and formal occasions.",
        countInStock: 12
    },
    {
        id: 3,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p3_img,
        new_price: 60.0,
        old_price: 100.5,
        description: "Comfortable and trendy striped blouse with modern design.",
        countInStock: 8
    },
    {
        id: 4,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p4_img,
        new_price: 100.0,
        old_price: 150.0,
        description: "Premium quality striped blouse with elegant styling.",
        countInStock: 20
    },
    {
        id: 5,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p5_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Versatile striped blouse suitable for any occasion.",
        countInStock: 18
    },
    {
        id: 6,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p6_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Classic striped design with modern twist.",
        countInStock: 14
    },
    {
        id: 7,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p7_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Elegant blouse perfect for professional settings.",
        countInStock: 16
    },
    {
        id: 8,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p8_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Trendy striped blouse with contemporary design.",
        countInStock: 10
    },
    {
        id: 9,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p9_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Sophisticated striped blouse for elegant occasions.",
        countInStock: 22
    },
    {
        id: 10,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p10_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Classic striped blouse with timeless appeal.",
        countInStock: 19
    },
    {
        id: 11,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p11_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Modern striped blouse with elegant details.",
        countInStock: 17
    },
    {
        id: 12,
        name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
        category: "women",
        image: p12_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Versatile striped blouse for everyday wear.",
        countInStock: 13
    },
    {
        id: 13,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p13_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Classic bomber jacket with modern slim fit design.",
        countInStock: 25
    },
    {
        id: 14,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p14_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Stylish bomber jacket perfect for casual outings.",
        countInStock: 20
    },
    {
        id: 15,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p15_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Premium bomber jacket with excellent craftsmanship.",
        countInStock: 18
    },
    {
        id: 16,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p16_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Comfortable bomber jacket for everyday wear.",
        countInStock: 22
    },
    {
        id: 17,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p17_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Trendy bomber jacket with contemporary style.",
        countInStock: 16
    },
    {
        id: 18,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p18_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Classic bomber jacket with modern appeal.",
        countInStock: 24
    },
    {
        id: 19,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p19_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Elegant bomber jacket for sophisticated looks.",
        countInStock: 19
    },
    {
        id: 20,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p20_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Versatile bomber jacket for any occasion.",
        countInStock: 21
    },
    {
        id: 21,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p21_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Premium bomber jacket with superior quality.",
        countInStock: 17
    },
    {
        id: 22,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p22_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Stylish bomber jacket with modern design.",
        countInStock: 23
    },
    {
        id: 23,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p23_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Classic bomber jacket with contemporary twist.",
        countInStock: 20
    },
    {
        id: 24,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "men",
        image: p24_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Elegant bomber jacket for professional settings.",
        countInStock: 18
    },
    {
        id: 25,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p25_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Comfortable hooded sweatshirt perfect for kids.",
        countInStock: 30
    },
    {
        id: 26,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p26_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Stylish hooded sweatshirt with modern design.",
        countInStock: 28
    },
    {
        id: 27,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p27_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Comfortable and trendy hooded sweatshirt.",
        countInStock: 25
    },
    {
        id: 28,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p28_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Quality hooded sweatshirt for active kids.",
        countInStock: 32
    },
    {
        id: 29,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p29_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Durable hooded sweatshirt with great comfort.",
        countInStock: 27
    },
    {
        id: 30,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p30_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Stylish hooded sweatshirt for fashion-forward kids.",
        countInStock: 29
    },
    {
        id: 31,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p31_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Comfortable hooded sweatshirt for everyday wear.",
        countInStock: 26
    },
    {
        id: 32,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p32_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Quality hooded sweatshirt with modern style.",
        countInStock: 31
    },
    {
        id: 33,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p33_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Trendy hooded sweatshirt for active children.",
        countInStock: 28
    },
    {
        id: 34,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p34_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Comfortable hooded sweatshirt with great fit.",
        countInStock: 30
    },
    {
        id: 35,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p35_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Stylish hooded sweatshirt for modern kids.",
        countInStock: 27
    },
    {
        id: 36,
        name: "Boys Orange Colourblocked Hooded Sweatshirt",
        category: "kid",
        image: p36_img,
        new_price: 85.0,
        old_price: 120.5,
        description: "Quality hooded sweatshirt with contemporary design.",
        countInStock: 29
    }
];

export default allProducts;
