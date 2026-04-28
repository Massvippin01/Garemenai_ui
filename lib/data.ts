import { Product, Review } from "@/types";

export const PRODUCTS: Record<string, Product> = {
  "one-life-graphic-tshirt": {
    id: "one-life-graphic-tshirt",
    name: "ONE LIFE GRAPHIC T-SHIRT",
    price: 38,
    originalPrice: 45,
    discount: 15,
    rating: 4.5,
    reviewCount: 451,
    description: "This graphic tee shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers a good comfort and style.",
    colors: ["#4B5320", "#31572C", "#1A4E6E"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 96.5,  waist: 86.4,  length: 68.6,  shoulder: 41.9 },
      "Medium": {  chest: 101.6,  waist: 91.4,  length: 71.1,  shoulder: 44.5 },
      "Large": {  chest: 106.7,  waist: 96.5,  length: 73.7,  shoulder: 47.0 },
      "X Large": {  chest: 111.8,  waist: 101.6,  length: 76.2,  shoulder: 49.5 },
      "XX Large": {  chest: 116.8,  waist: 106.7,  length: 78.7,  shoulder: 52.1 }
    },
    images: ["/images/first 1.png", "/images/first 1.png", "/images/first 1.png"],
    category: "T-Shirts",
    recommendationScore: 0.94
  },
  "polo-contrast-trims": {
    id: "polo-contrast-trims",
    name: "Polo with Contrast Trims",
    price: 36,
    originalPrice: 45,
    discount: 20,
    rating: 4.0,
    reviewCount: 3241,
    description: "Classic polo with contrast trims.",
    colors: ["#1A4E6E"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 101.6,  waist: 96.5,  length: 71.1,  shoulder: 43.2 },
      "Medium": {  chest: 106.7,  waist: 101.6,  length: 73.7,  shoulder: 45.7 },
      "Large": {  chest: 111.8,  waist: 106.7,  length: 76.2,  shoulder: 48.3 },
      "X Large": {  chest: 116.8,  waist: 111.8,  length: 78.7,  shoulder: 50.8 },
      "XX Large": {  chest: 121.9,  waist: 116.8,  length: 83.8,  shoulder: 55.9 },
      "3X Large": {  chest: 127.0,  waist: 121.9,  length: 88.9,  shoulder: 61.0 }
    },
    images: ["/images/second 1.png", "/images/second 1.png", "/images/second 1.png"],
    category: "Polos",
    recommendationScore: 0.88
  },
  "gradient-graphic-tshirt": {
    id: "gradient-graphic-tshirt",
    name: "Gradient Graphic T-shirt",
    price: 30,
    rating: 3.5,
    reviewCount: 3671,
    description: "Colorful gradient graphic tee.",
    colors: ["#fff"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 94.0,  waist: 83.8,  length: 66.0,  shoulder: 40.6 },
      "Medium": {  chest: 99.1,  waist: 88.9,  length: 68.6,  shoulder: 43.2 },
      "Large": {  chest: 104.1,  waist: 94.0,  length: 71.1,  shoulder: 45.7 },
      "X Large": {  chest: 109.2,  waist: 99.1,  length: 73.7,  shoulder: 48.3 },
      "XX Large": {  chest: 114.3,  waist: 104.1,  length: 78.7,  shoulder: 53.3 },
      "3X Large": {  chest: 119.4,  waist: 109.2,  length: 83.8,  shoulder: 58.4 }
    },
    images: ["/images/second 2.png", "/images/second 2.png", "/images/second 2.png"],
    category: "T-Shirts",
    recommendationScore: 0.91
  },
  "polo-tipping-details": {
    id: "polo-tipping-details",
    name: "Polo with Tipping Details",
    price: 42,
    rating: 4.5,
    reviewCount: 4281,
    description: "Polo with elegant tipping details.",
    colors: ["#B07B6E"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 99.1,  waist: 88.9,  hips: 96.5,  length: 68.6,  shoulder: 43.2 },
      "Medium": {  chest: 104.1,  waist: 94.0,  hips: 101.6,  length: 71.1,  shoulder: 45.7 },
      "Large": {  chest: 109.2,  waist: 99.1,  hips: 106.7,  length: 73.7,  shoulder: 48.3 },
      "X Large": {  chest: 114.3,  waist: 104.1,  hips: 111.8,  length: 76.2,  shoulder: 50.8 },
      "XX Large": {  chest: 119.4,  waist: 109.2,  hips: 116.8,  length: 81.3,  shoulder: 55.9 },
      "3X Large": {  chest: 124.5,  waist: 114.3,  hips: 121.9,  length: 86.4,  shoulder: 61.0 }
    },
    images: ["/images/first 2.png", "/images/first 2.png", "/images/first 2.png"],
    category: "Polos",
  },
  "black-striped-tshirt": {
    id: "black-striped-tshirt",
    name: "Black Striped T-shirt",
    price: 25,
    originalPrice: 35,
    discount: 30,
    rating: 5.0,
    reviewCount: 4621,
    description: "Classic black and white striped tee.",
    colors: ["#1B1B1D"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 99.1,  waist: 88.9,  length: 68.6,  shoulder: 43.2 },
      "Medium": {  chest: 104.1,  waist: 94.0,  length: 71.1,  shoulder: 45.7 },
      "Large": {  chest: 109.2,  waist: 99.1,  length: 73.7,  shoulder: 48.3 },
      "X Large": {  chest: 114.3,  waist: 104.1,  length: 76.2,  shoulder: 50.8 },
      "XX Large": {  chest: 119.4,  waist: 109.2,  length: 78.7,  shoulder: 53.3 }
    },
    images: ["/images/first 4.png", "/images/first 4.png", "/images/first 4.png"],
    category: "T-Shirts",
    recommendationScore: 0.96
  },
  // New Arrivals
  "sleeve-striped-tshirt": {
    id: "sleeve-striped-tshirt",
    name: "SLEEVE STRIPED T-SHIRT",
    price: 25,
    originalPrice: 35,
    discount: 30,
    rating: 4.5,
    reviewCount: 150,
    description: "Classic striped tee featuring short sleeves and a relaxed fit.",
    colors: ["#1A4E6E", "#1B1B1D"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 96.5,  waist: 86.4,  hips: 94.0,  length: 67.3,  shoulder: 41.9 },
      "Medium": {  chest: 101.6,  waist: 91.4,  hips: 99.1,  length: 69.8,  shoulder: 44.5 },
      "Large": {  chest: 106.7,  waist: 96.5,  hips: 104.1,  length: 72.4,  shoulder: 47.0 },
      "X Large": {  chest: 111.8,  waist: 101.6,  hips: 109.2,  length: 74.9,  shoulder: 49.5 },
      "XX Large": {  chest: 116.8,  waist: 106.7,  hips: 114.3,  length: 80.0,  shoulder: 54.6 },
      "3X Large": {  chest: 121.9,  waist: 111.8,  hips: 119.4,  length: 85.1,  shoulder: 59.7 }
    },
    images: ["/images/first 1.png", "/images/first 1.png", "/images/first 1.png"],
    category: "T-Shirts",
  },
  "checkered-shirt": {
    id: "checkered-shirt",
    name: "CHECKERED SHIRT",
    price: 45,
    rating: 4.5,
    reviewCount: 200,
    description: "A comfortable and stylish checkered pattern shirt for casual wear.",
    colors: ["#B07B6E", "#31572C"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 101.6,  waist: 91.4,  hips: 99.1,  length: 71.1,  shoulder: 44.5 },
      "Medium": {  chest: 106.7,  waist: 96.5,  hips: 104.1,  length: 73.7,  shoulder: 47.0 },
      "Large": {  chest: 111.8,  waist: 101.6,  hips: 109.2,  length: 76.2,  shoulder: 49.5 },
      "X Large": {  chest: 116.8,  waist: 106.7,  hips: 114.3,  length: 78.7,  shoulder: 52.1 },
      "XX Large": {  chest: 121.9,  waist: 111.8,  hips: 119.4,  length: 83.8,  shoulder: 57.1 },
      "3X Large": {  chest: 127.0,  waist: 116.8,  hips: 124.5,  length: 88.9,  shoulder: 62.2 }
    },
    images: ["/images/first 2.png", "/images/first 2.png", "/images/first 2.png"],
    category: "Shirts",
  },
  "tshirt-tape-details": {
    id: "tshirt-tape-details",
    name: "T-SHIRT WITH TAPE DETAILS",
    price: 32,
    rating: 4.5,
    reviewCount: 180,
    description: "Trendy t-shirt with unique tape details along the shoulders.",
    colors: ["#4B5320", "#1B1B1D"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 99.1,  waist: 88.9,  hips: 96.5,  length: 68.6,  shoulder: 43.2 },
      "Medium": {  chest: 104.1,  waist: 94.0,  hips: 101.6,  length: 71.1,  shoulder: 45.7 },
      "Large": {  chest: 109.2,  waist: 99.1,  hips: 106.7,  length: 73.7,  shoulder: 48.3 },
      "X Large": {  chest: 114.3,  waist: 104.1,  hips: 111.8,  length: 76.2,  shoulder: 50.8 },
      "XX Large": {  chest: 119.4,  waist: 109.2,  hips: 116.8,  length: 81.3,  shoulder: 55.9 },
      "3X Large": {  chest: 124.5,  waist: 114.3,  hips: 121.9,  length: 86.4,  shoulder: 61.0 }
    },
    images: ["/images/first 3.png", "/images/first 3.png", "/images/first 3.png"],
    category: "T-Shirts",
  },
  "skinny-fit-jeans": {
    id: "skinny-fit-jeans",
    name: "SKINNY FIT JEANS",
    price: 52,
    originalPrice: 65,
    discount: 20,
    rating: 3.5,
    reviewCount: 95,
    description: "Modern skinny fit jeans with a slight stretch for comfort.",
    colors: ["#1A4E6E"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  waist: 71.1,  hips: 91.4,  inseam: 76.2,  outseam: 99.1,  thigh: 53.3 },
      "Medium": {  waist: 76.2,  hips: 96.5,  inseam: 78.7,  outseam: 101.6,  thigh: 55.9 },
      "Large": {  waist: 81.3,  hips: 101.6,  inseam: 81.3,  outseam: 104.1,  thigh: 58.4 },
      "X Large": {  waist: 86.4,  hips: 106.7,  inseam: 81.3,  outseam: 106.7,  thigh: 61.0 },
      "XX Large": {  waist: 91.4,  hips: 111.8,  inseam: 82.5,  outseam: 111.8,  thigh: 66.0 },
      "3X Large": {  waist: 96.5,  hips: 116.8,  inseam: 83.8,  outseam: 116.8,  thigh: 71.1 }
    },
    images: ["/images/first 4.png", "/images/first 4.png", "/images/first 4.png"],
    category: "Jeans",
  },
  // Top Selling
  "vertical-striped-shirt": {
    id: "vertical-striped-shirt",
    name: "VERTICAL STRIPED SHIRT",
    price: 40,
    originalPrice: 50,
    discount: 20,
    rating: 5.0,
    reviewCount: 420,
    description: "Elegant vertical striped shirt perfect for both formal and casual settings.",
    colors: ["#31572C"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 104.1,  waist: 94.0,  hips: 101.6,  length: 72.4,  shoulder: 45.7 },
      "Medium": {  chest: 109.2,  waist: 99.1,  hips: 106.7,  length: 74.9,  shoulder: 48.3 },
      "Large": {  chest: 114.3,  waist: 104.1,  hips: 111.8,  length: 77.5,  shoulder: 50.8 },
      "X Large": {  chest: 119.4,  waist: 109.2,  hips: 116.8,  length: 80.0,  shoulder: 53.3 },
      "XX Large": {  chest: 124.5,  waist: 114.3,  hips: 121.9,  length: 85.1,  shoulder: 58.4 },
      "3X Large": {  chest: 129.5,  waist: 119.4,  hips: 127.0,  length: 90.2,  shoulder: 63.5 }
    },
    images: ["/images/second 1.png", "/images/second 1.png", "/images/second 1.png"],
    category: "Shirts",
  },
  "courage-graphic-tshirt": {
    id: "courage-graphic-tshirt",
    name: "COURAGE GRAPHIC T-SHIRT",
    price: 28,
    rating: 4.0,
    reviewCount: 300,
    description: "Inspiring graphic tee showcasing vibrant artwork on the front.",
    colors: ["#4B5320", "#B07B6E"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  chest: 96.5,  waist: 86.4,  hips: 94.0,  length: 68.6,  shoulder: 41.9 },
      "Medium": {  chest: 101.6,  waist: 91.4,  hips: 99.1,  length: 71.1,  shoulder: 44.5 },
      "Large": {  chest: 106.7,  waist: 96.5,  hips: 104.1,  length: 73.7,  shoulder: 47.0 },
      "X Large": {  chest: 111.8,  waist: 101.6,  hips: 109.2,  length: 76.2,  shoulder: 49.5 },
      "XX Large": {  chest: 116.8,  waist: 106.7,  hips: 114.3,  length: 81.3,  shoulder: 54.6 },
      "3X Large": {  chest: 121.9,  waist: 111.8,  hips: 119.4,  length: 86.4,  shoulder: 59.7 }
    },
    images: ["/images/second 2.png", "/images/second 2.png", "/images/second 2.png"],
    category: "T-Shirts",
  },
  "loose-fit-bermuda-shorts": {
    id: "loose-fit-bermuda-shorts",
    name: "LOOSE FIT BERMUDA SHORTS",
    price: 35,
    rating: 3.0,
    reviewCount: 85,
    description: "Relaxed loose fit bermuda shorts for maximum comfort during summer.",
    colors: ["#1B1B1D"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  waist: 76.2,  hips: 101.6,  inseam: 22.9,  outseam: 50.8,  thigh: 61.0 },
      "Medium": {  waist: 81.3,  hips: 106.7,  inseam: 24.1,  outseam: 53.3,  thigh: 63.5 },
      "Large": {  waist: 86.4,  hips: 111.8,  inseam: 25.4,  outseam: 55.9,  thigh: 66.0 },
      "X Large": {  waist: 91.4,  hips: 116.8,  inseam: 26.7,  outseam: 58.4,  thigh: 68.6 },
      "XX Large": {  waist: 96.5,  hips: 121.9,  inseam: 27.9,  outseam: 63.5,  thigh: 73.7 },
      "3X Large": {  waist: 101.6,  hips: 127.0,  inseam: 29.2,  outseam: 68.6,  thigh: 78.7 }
    },
    images: ["/images/second 3.png", "/images/second 3.png", "/images/second 3.png"],
    category: "Shorts",
  },
  "faded-skinny-jeans": {
    id: "faded-skinny-jeans",
    name: "FADED SKINNY JEANS",
    price: 55,
    rating: 4.5,
    reviewCount: 512,
    description: "Vintage-inspired faded skinny jeans with distressed details.",
    colors: ["#1A4E6E"],
    sizes: ["Small", "Medium", "Large", "X Large", "XX Large", "3X Large"],
    sizeMeasurements: {
      "Small": {  waist: 73.7,  hips: 94.0,  inseam: 76.2,  outseam: 99.1,  thigh: 54.6 },
      "Medium": {  waist: 78.7,  hips: 99.1,  inseam: 78.7,  outseam: 101.6,  thigh: 57.1 },
      "Large": {  waist: 83.8,  hips: 104.1,  inseam: 81.3,  outseam: 104.1,  thigh: 59.7 },
      "X Large": {  waist: 88.9,  hips: 109.2,  inseam: 81.3,  outseam: 106.7,  thigh: 62.2 },
      "XX Large": {  waist: 94.0,  hips: 114.3,  inseam: 82.5,  outseam: 111.8,  thigh: 67.3 },
      "3X Large": {  waist: 99.1,  hips: 119.4,  inseam: 83.8,  outseam: 116.8,  thigh: 72.4 }
    },
    images: ["/images/second 4.png", "/images/second 4.png", "/images/second 4.png"],
    category: "Jeans",
  },
  "industrial-baggy-jeans": {
    id: "industrial-baggy-jeans",
    name: "INDUSTRIAL BAGGIE JEANS",
    price: 65,
    rating: 4.8,
    reviewCount: 124,
    description: "Ultra-wide baggy fit inspired by industrial workwear and 90s street fashion. Heavyweight denim with a massive leg opening.",
    colors: ["#5D737E", "#1B1B1D"],
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    sizeMeasurements: {
      "28": { waist: 74.9, hips: 91.4, inseam: 73.7, rise: 71.6, thigh: 55.9, legOpening: 83.8 },
      "30": { waist: 80.0, hips: 96.5, inseam: 73.2, rise: 73.2, thigh: 58.4, legOpening: 86.4 },
      "32": { waist: 85.1, hips: 101.6, inseam: 72.4, rise: 74.2, thigh: 61.0, legOpening: 88.9 },
      "34": { waist: 90.2, hips: 106.7, inseam: 71.6, rise: 75.7, thigh: 63.5, legOpening: 91.4 },
      "36": { waist: 95.3, hips: 111.8, inseam: 71.1, rise: 76.7, thigh: 66.0, legOpening: 94.0 },
      "38": { waist: 100.3, hips: 116.8, inseam: 70.6, rise: 78.2, thigh: 68.6, legOpening: 96.5 },
      "40": { waist: 105.4, hips: 121.9, inseam: 69.9, rise: 79.2, thigh: 71.1, legOpening: 99.1 }
    },
    images: ["/images/style_casual.png", "/images/style_casual.png"], // Using closest matching image from existing public assets
    category: "Jeans",
    recommendationScore: 0.98
  },
};

export const REVIEWS: Review[] = [
  // reviews for one-life-graphic-tshirt
  {
    id: "1",
    productId: "one-life-graphic-tshirt",
    author: "Samantha D.",
    rating: 5,
    verified: true,
    date: "August 14, 2023",
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
  },
  {
    id: "2",
    productId: "one-life-graphic-tshirt",
    author: "Alex M.",
    rating: 4,
    verified: true,
    date: "August 15, 2023",
    text: "The t-shirt exceeded my expectations! The print quality is top-notch. Being a UI/UX designer myself, I pay close attention to design, and this t-shirt definitely gets a thumbs up from me.",
  },
  {
    id: "3",
    productId: "one-life-graphic-tshirt",
    author: "Ethan R.",
    rating: 5,
    verified: true,
    date: "August 16, 2023",
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish design caught my eye and the fit is perfect. I love the designer's fresh take on every aspect of this shirt.",
  },
  {
    id: "4",
    productId: "one-life-graphic-tshirt",
    author: "Olivia P.",
    rating: 4,
    verified: true,
    date: "August 17, 2023",
    text: "As a UI/UX enthusiast, I value aesthetics and functionality. This t-shirt not only represents these principles but also looks great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
  },
  {
    id: "5",
    productId: "one-life-graphic-tshirt",
    author: "Liam K.",
    rating: 2,
    verified: true,
    date: "August 18, 2023",
    text: "The fabric is soft, but the sizing is completely off. I ordered a Medium but it fits like a Small. Very disappointed with the inconsistent sizing across the brand.",
  },
  {
    id: "6",
    productId: "one-life-graphic-tshirt",
    author: "Ava H.",
    rating: 5,
    verified: true,
    date: "August 19, 2023",
    text: "The shirt just exceeds my expectations! As a designer, I appreciate the unique and thoughtful layout. The intricate details and thoughtful layout of the designer make this shirt a conversation piece.",
  },
  {
    id: "7",
    productId: "one-life-graphic-tshirt",
    author: "James L.",
    rating: 3,
    verified: false,
    date: "August 20, 2023",
    text: "Nice graphics but the material is a bit thin for the price. I expected a more premium feel given the description.",
  },
  {
    id: "8",
    productId: "one-life-graphic-tshirt",
    author: "Sofia R.",
    rating: 5,
    verified: true,
    date: "August 21, 2023",
    text: "A masterpiece! The fit is perfect and the graphic actually tells a story. I've received so many compliments.",
  },
  {
    id: "9",
    productId: "one-life-graphic-tshirt",
    author: "Daniel W.",
    rating: 1,
    verified: true,
    date: "August 22, 2023",
    text: "Worst experience ever. The print started peeling off after just one wash. Do not buy!",
  },
  {
    id: "10",
    productId: "one-life-graphic-tshirt",
    author: "Emma S.",
    rating: 4,
    verified: true,
    date: "August 23, 2023",
    text: "Solid shirt. The 'Small' measurements provided were accurate. Fits snug but comfortable.",
  },
  {
    id: "11",
    productId: "one-life-graphic-tshirt",
    author: "Noah G.",
    rating: 4,
    verified: true,
    date: "August 24, 2023",
    text: "Good value for money. The color is exactly as shown in the pictures.",
  },
  {
    id: "12",
    productId: "one-life-graphic-tshirt",
    author: "Isabella B.",
    rating: 3,
    verified: true,
    date: "August 25, 2023",
    text: "The delivery took longer than expected. The shirt itself is fine, but the wait was annoying.",
  },
  {
    id: "13",
    productId: "one-life-graphic-tshirt",
    author: "Mason C.",
    rating: 5,
    verified: true,
    date: "August 26, 2023",
    text: "Excellent quality! The cotton is very high grade. Will definitely buy more from this collection.",
  },
  {
    id: "14",
    productId: "one-life-graphic-tshirt",
    author: "Charlotte T.",
    rating: 2,
    verified: true,
    date: "August 27, 2023",
    text: "The neck hole is too small. It's difficult to put on and take off. Design flaw for sure.",
  },
  {
    id: "15",
    productId: "one-life-graphic-tshirt",
    author: "Lucas J.",
    rating: 5,
    verified: true,
    date: "August 28, 2023",
    text: "Perfect! Just perfect. The fit, the style, the vibe. 10/10.",
  },
  {
    id: "16",
    productId: "one-life-graphic-tshirt",
    author: "Amelia V.",
    rating: 4,
    verified: true,
    date: "August 29, 2023",
    text: "Very stylish. Matches well with jeans or shorts. Great versatile piece.",
  },
  {
    id: "17",
    productId: "one-life-graphic-tshirt",
    author: "Benjamin F.",
    rating: 5,
    verified: true,
    date: "August 30, 2023",
    text: "I followed the size chart recommendations and the Large fits perfectly. Great AI sizing tool!",
  },
  {
    id: "18",
    productId: "one-life-graphic-tshirt",
    author: "Harper E.",
    rating: 3,
    verified: true,
    date: "August 31, 2023",
    text: "The color faded slightly after a few washes. Still wearable but lost its 'new' pop.",
  },
  {
    id: "19",
    productId: "one-life-graphic-tshirt",
    author: "Elijah H.",
    rating: 5,
    verified: true,
    date: "September 1, 2023",
    text: "Fantastic design! Celstials never disappoints. Best streetwear in the game.",
  },
  {
    id: "20",
    productId: "one-life-graphic-tshirt",
    author: "Mia N.",
    rating: 2,
    verified: true,
    date: "September 2, 2023",
    text: "Shipping was fast, but the shirt came with a small stain. Customer support was helpful though.",
  },
  {
    id: "21",
    productId: "one-life-graphic-tshirt",
    author: "William O.",
    rating: 4,
    verified: true,
    date: "September 3, 2023",
    text: "Great fit, great design. Only downside is the price is a bit high for a basic tee.",
  },
];

export const SIMILAR_PRODUCTS: Product[] = [
  PRODUCTS["polo-contrast-trims"],
  PRODUCTS["gradient-graphic-tshirt"],
  PRODUCTS["polo-tipping-details"],
  PRODUCTS["black-striped-tshirt"]
];

const ADDED_FAKE_REVIEWS: Review[] = [];

const REVIEW_TEMPLATES = [
  "This product fits perfectly. I was a bit worried about the sizing but it's spot on.",
  "Really solid quality. The fabric feels premium and comfortable for all-day wear.",
  "Exceeded my expectations! Will definitely order another color soon.",
  "Got this as a gift and they loved it. The color is exactly as shown in the picture.",
  "Decent fit. I would suggest going true to size.",
  "Arrived very fast. It's a nicely tailored piece of clothing.",
  "Very happy with this! Washes well and doesn't shrink.",
  "Good everyday wear. Looks exactly like the brand advertises.",
  "One of the best purchases I've made here. Super soft.",
  "Fits true to size. Great stitch quality on the seams."
];

let fakeReviewId = 500;
const names = ["Alex", "Sam", "Jamie", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Peyton"];

Object.values(PRODUCTS).forEach((product) => {
  const existingCount = REVIEWS.filter(r => r.productId === product.id).length;
  
  if (existingCount < 5) {
    const reviewsToAdd = 5 + Math.floor(Math.random() * 5); // 5 to 9 reviews
    
    // Shuffle templates
    const shuffledTemplates = [...REVIEW_TEMPLATES].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < reviewsToAdd; i++) {
        ADDED_FAKE_REVIEWS.push({
            id: `sys-${fakeReviewId++}`,
            productId: product.id,
            author: `${names[i % names.length]} M.`,
            rating: Math.random() > 0.3 ? 5 : 4,
            verified: true,
            date: "November " + (Math.floor(Math.random() * 28) + 1) + ", 2023",
            text: shuffledTemplates[i % shuffledTemplates.length]
        });
    }
  }
});

REVIEWS.push(...ADDED_FAKE_REVIEWS);

