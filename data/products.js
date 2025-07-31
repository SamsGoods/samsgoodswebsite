// Import product images
import trumpWallFameFront from '@/assets/Product_Catalog/Trump\'s Wall of Fame/FRONT.png';
import trumpWallFameBack from '@/assets/Product_Catalog/Trump\'s Wall of Fame/BACK.png';
import youreFiredFront from '@/assets/Product_Catalog/You\'re Fired...Up!!!/You\'re Fired... Up! Tee/FRONT.png';
import youreFiredBack from '@/assets/Product_Catalog/You\'re Fired...Up!!!/You\'re Fired... Up! Tee/BACK.png';
import trumpkinSpiceFront from '@/assets/Product_Catalog/Trumpkin Spice Tee/FRONT.png';
import trumpasaurusFront from '@/assets/Product_Catalog/Trumpasaurus Rex/FRONT.png';
import trumpasaurusBack from '@/assets/Product_Catalog/Trumpasaurus Rex/BACK.png';
import trumpMugshotHoodie from '@/assets/Product_Catalog/Trump Original Gangster Mugshot/Trump_Original_Gangster_Mugshot_Hoodie.png';
import trumpMugshotMug from '@/assets/Product_Catalog/Trump Original Gangster Mugshot/Trump_Original_Gangster_Mugshot_Mug.png';
import trumpRapGameBossMug from '@/assets/Product_Catalog/Trump Rap Game Boss/Trump_Rap_Game_Boss_Mug.png';
import trumpRapGameBossSticker from '@/assets/Product_Catalog/Trump Rap Game Boss/Trump_Rap_Game_Boss_Sticker.png';
import enonoClassicHoodie from '@/assets/Product_Catalog/ENONO Classic/ENONO Classic_Hoodie.png';
import enonoClassicMug from '@/assets/Product_Catalog/ENONO Classic/ENONO Classic_Mug.png';
import enonoClassicSticker from '@/assets/Product_Catalog/ENONO Classic/ENONO Classic_Sticker.png';
import enonoPixelMug from '@/assets/Product_Catalog/ENONO Pixel/ENONO Pixel_Mug.png';
import enonoPixelSticker from '@/assets/Product_Catalog/ENONO Pixel/ENONO Pixel_Sticker.png';
import enonoFlipMug from '@/assets/Product_Catalog/ENONO Flip/ENONO Flip_Mug.png';
import enonoFlipSticker from '@/assets/Product_Catalog/ENONO Flip/ENONO Flip_Sticker.png';
import smokeItClassicHoodie from '@/assets/Product_Catalog/Smoke It Classic/Smoke_It_Classic_Hoodie.png';
import smokeItClassicSticker from '@/assets/Product_Catalog/Smoke It Classic/Smoke_It_Classic_Sticker.png';
import smokeItFadeSticker from '@/assets/Product_Catalog/Smoke It Fade/Smoke_It_Fade_Sticker.png';
import smokeItFadeMug from '@/assets/Product_Catalog/Smoke It Fade/Smoke_It_Fade_Mug.png';
import whiteTee from '@/assets/Product_Catalog/White Tee/White Tee.png';
import whiteHoodie from '@/assets/Product_Catalog/White Hoodie/White Hoodie.png';

// Product data based on the CSV file
export const products = [
  {
    id: 'SAMO_001',
    title: 'Trump\'s Wall of Fame',
    description: 'Classic Crew Neck T-Shirt featuring Trump\'s Wall of Fame design. Made with premium cotton for comfort and durability.',
    price: 22.99,
    images: [trumpWallFameFront, trumpWallFameBack],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Navy'],
    featured: true
  },
  {
    id: 'SAMO_002',
    title: 'You\'re Fired... Up!',
    description: 'Classic Crew Neck T-Shirt with the iconic "You\'re Fired... Up!" design. Perfect for Trump supporters with a sense of humor.',
    price: 22.99,
    images: [youreFiredFront, youreFiredBack],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Red'],
    featured: false
  },
  {
    id: 'SAMO_003',
    title: 'Make Emojis Great Again',
    description: 'Classic Crew Neck T-Shirt with a playful "Make Emojis Great Again" design. Comfortable fit for everyday wear.',
    price: 22.99,
    images: [whiteTee],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_004',
    title: 'Trumpkin Spice Tee',
    description: 'Classic Crew Neck T-Shirt with the seasonal favorite "Trumpkin Spice" design. Perfect for fall and political humor enthusiasts.',
    price: 22.99,
    images: [trumpkinSpiceFront],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Orange', 'White', 'Black'],
    featured: false
  },
  {
    id: 'SAMO_005',
    title: 'Trumpasaurus Rex – Tiny Hands',
    description: 'Classic Crew Neck T-Shirt featuring the hilarious "Trumpasaurus Rex" design with tiny hands. A conversation starter!',
    price: 22.99,
    images: [trumpasaurusFront, trumpasaurusBack],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Green'],
    featured: false
  },
  {
    id: 'SAMO_006',
    title: 'Commander of Confidence - Trump Edition',
    description: 'Classic Crew Neck T-Shirt showcasing Trump as the "Commander of Confidence." Bold design for proud supporters.',
    price: 22.99,
    images: [whiteTee],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Navy'],
    featured: false
  },
  {
    id: 'SAMO_007',
    title: 'F*ck Yeah, I\'m Not Here to Adult Today!',
    description: 'Classic Crew Neck T-Shirt with an attitude. For those days when adulting is just too much.',
    price: 22.99,
    images: [whiteTee],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_008',
    title: 'I\'m So F*cking Lazy',
    description: 'Comfort Colors 1717 | Classic Heavyweight T-Shirt for those who embrace their lazy side with pride.',
    price: 24.99,
    images: [whiteTee],
    category: 'Apparel - Men\'s T-Shirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_009',
    title: 'Too f*cking fabulous to be ordinary',
    description: 'Women\'s Classic Tee for those who know they\'re extraordinary. Soft fabric with a flattering fit.',
    price: 23.99,
    images: [whiteTee],
    category: 'Apparel - Women\'s T-Shirts',
    stock: 100,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Pink'],
    featured: false
  },
  {
    id: 'SAMO_010',
    title: 'I Put the \'Pro\' in Procrastinate',
    description: 'Women\'s Classic Tee for the professional procrastinator. Comfortable and stylish for putting things off in style.',
    price: 23.99,
    images: [whiteTee],
    category: 'Apparel - Women\'s T-Shirts',
    stock: 100,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_011',
    title: 'Stay Grounded – Space is Expensive',
    description: 'Unisex Premium Pullover Hoodie with a humorous take on staying grounded. Warm and cozy for everyday wear.',
    price: 40.99,
    images: [whiteHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_012',
    title: 'Trump: Original Gangster Mugshot Tee',
    description: 'Unisex Classic Pullover Hoodie featuring the iconic Trump mugshot with an OG twist. Warm, comfortable, and politically bold.',
    price: 40.99,
    images: [trumpMugshotHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: true
  },
  {
    id: 'SAMO_013',
    title: 'ENONO Classic',
    description: 'Unisex Premium Pullover Hoodie with the ENONO Classic design. Stylish streetwear for the fashion-forward.',
    price: 40.99,
    images: [enonoClassicHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_014',
    title: 'Smoke It Classic',
    description: 'Unisex Premium Pullover Hoodie with the Smoke It Classic design. Urban style meets comfort.',
    price: 40.99,
    images: [smokeItClassicHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_015',
    title: 'I\'m prickly as f*ck, handle with care',
    description: 'Unisex Classic Pullover Hoodie with attitude. For those who need their space and aren\'t afraid to say it.',
    price: 40.99,
    images: [whiteHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_016',
    title: 'If You Can\'t Handle the Heat, F*ck Off',
    description: 'Unisex Classic Pullover Hoodie for those who bring the heat and don\'t apologize for it.',
    price: 40.99,
    images: [whiteHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Red'],
    featured: false
  },
  {
    id: 'SAMO_017',
    title: 'WARNING: I Have No Filter & No Patience',
    description: 'Unisex Premium Pullover Hoodie with a fair warning. Comfortable wear with an honest message.',
    price: 40.99,
    images: [whiteHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_018',
    title: 'I Put the \'Pro\' in Procrastinate',
    description: 'Unisex Classic Pullover Hoodie for those who excel at putting things off. Cozy and perfect for lazy days.',
    price: 40.99,
    images: [whiteHoodie],
    category: 'Apparel - Hoodies & Sweatshirts',
    stock: 100,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['White', 'Black', 'Gray'],
    featured: false
  },
  {
    id: 'SAMO_019',
    title: 'If You Can\'t Handle the Heat, F*ck Off',
    description: 'Die Cut Sticker with attitude. Perfect for laptops, water bottles, or anywhere you want to make a statement.',
    price: 6.99,
    images: [smokeItFadeSticker], // Using a placeholder image
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_020',
    title: 'Trump: Rap Game Boss',
    description: 'Die Cut Sticker featuring Trump as a rap game boss. Unique design for Trump supporters with style.',
    price: 6.99,
    images: [trumpRapGameBossSticker],
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_021',
    title: 'ENONO Classic',
    description: 'Die Cut Sticker with the ENONO Classic design. Streetwear style for your everyday items.',
    price: 6.99,
    images: [enonoClassicSticker],
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_022',
    title: 'ENONO Pixel',
    description: 'Die Cut Sticker with the pixelated ENONO design. Retro gaming aesthetic meets modern streetwear.',
    price: 6.99,
    images: [enonoPixelSticker],
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_023',
    title: 'ENONO Flip',
    description: 'Die Cut Sticker with the ENONO Flip design. Bold and eye-catching for any surface.',
    price: 6.99,
    images: [enonoFlipSticker],
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_024',
    title: 'Smoke It Fade',
    description: 'Die Cut Sticker with the Smoke It Fade design. Gradient style for a modern look.',
    price: 6.99,
    images: [smokeItFadeSticker],
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_025',
    title: 'Smoke It Classic',
    description: 'Die Cut Sticker with the Smoke It Classic design. Urban style for your personal items.',
    price: 6.99,
    images: [smokeItClassicSticker],
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_026',
    title: 'Too f*cking fabulous to be ordinary',
    description: 'Die Cut Sticker for those who know they\'re extraordinary. Add some fabulous attitude to your belongings.',
    price: 6.99,
    images: [smokeItFadeSticker], // Using a placeholder image
    category: 'Accessories - Stickers',
    stock: 200,
    sizes: ['Standard'],
    colors: ['Full Color'],
    featured: false
  },
  {
    id: 'SAMO_027',
    title: 'Trump: Original Gangster Mugshot Tee',
    description: 'Ceramic Mug featuring the iconic Trump mugshot with an OG twist. Start your day with attitude.',
    price: 15.99,
    images: [trumpMugshotMug],
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: true
  },
  {
    id: 'SAMO_028',
    title: 'WARNING: I Have No Filter & No Patience',
    description: 'Ceramic Mug with a fair warning. Perfect for the office or home when you need people to know where you stand.',
    price: 15.99,
    images: [smokeItFadeMug], // Using a placeholder image
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: false
  },
  {
    id: 'SAMO_029',
    title: 'Commander of Confidence - Trump Edition',
    description: 'Ceramic Mug showcasing Trump as the "Commander of Confidence." Start your day with presidential confidence.',
    price: 15.99,
    images: [smokeItFadeMug], // Using a placeholder image
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: false
  },
  {
    id: 'SAMO_030',
    title: 'Trump: Rap Game Boss',
    description: 'Ceramic Mug featuring Trump as a rap game boss. Unique design for coffee or tea with attitude.',
    price: 15.99,
    images: [trumpRapGameBossMug],
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: false
  },
  {
    id: 'SAMO_031',
    title: 'ENONO Classic',
    description: 'Ceramic Mug with the ENONO Classic design. Streetwear style for your morning beverage.',
    price: 15.99,
    images: [enonoClassicMug],
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: false
  },
  {
    id: 'SAMO_032',
    title: 'ENONO Pixel',
    description: 'Ceramic Mug with the pixelated ENONO design. Retro gaming aesthetic for your coffee or tea.',
    price: 15.99,
    images: [enonoPixelMug],
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: false
  },
  {
    id: 'SAMO_033',
    title: 'ENONO Flip',
    description: 'Ceramic Mug with the ENONO Flip design. Bold and eye-catching for your daily beverage.',
    price: 15.99,
    images: [enonoFlipMug],
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: false
  },
  {
    id: 'SAMO_034',
    title: 'Smoke It Fade',
    description: 'Ceramic Mug with the Smoke It Fade design. Gradient style for a modern look to your morning routine.',
    price: 15.99,
    images: [smokeItFadeMug],
    category: 'Drinkware - Mugs',
    stock: 150,
    sizes: ['11oz', '15oz'],
    colors: ['White', 'Black'],
    featured: false
  },
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category.includes(category));
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

