/**
 * OmniFind Products Catalog & State Configuration (Cute Plush Backpacks Edition)
 */

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export const products = [
  {
    id: "plush-panda-pack",
    title: "Cute Panda Plush Backpack",
    category: "forest",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/panda.png"),
    rating: 4.9,
    badge: "Most Popular",
    description: "An adorable, huggably soft panda backpack. Features high-quality velvet-plush outer fabric, adjustable red shoulder straps, a front zippered compartment, and a cute red bow tie detail.",
    specs: {
      "Material": "Velvet-Plush Polyester",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Red Comfort Padded",
      "Care": "Hand Wash / Gentle Machine Cycle"
    }
  },
  {
    id: "plush-koala-pack",
    title: "Cute Koala Plush Backpack",
    category: "forest",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/koala.png"),
    rating: 4.8,
    badge: "Sweet Choice",
    description: "Carry your essentials inside this ultra-soft koala bear companion. Designed with fluffy inner ears, a prominent black nose, a pink zipper-pouch body pocket, and matching pink shoulder straps.",
    specs: {
      "Material": "Super-Soft Premium Velvet",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Pink Padded Comfort",
      "Specialty": "Ultra-lightweight Kids Harness"
    }
  },
  {
    id: "plush-duck-pack",
    title: "Cute Platypus Plush Backpack",
    category: "aquatic",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/duck.png"),
    rating: 4.7,
    badge: "Eco-Soft",
    description: "A friendly light-blue platypus/duck hybrid to follow you on any journey. Complete with cute orange bill, tiny wings, yellow comfort straps, and a secure front zipper.",
    specs: {
      "Material": "High-Quality Eco-Velvet",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Bright Yellow Padded",
      "Special": "Splashproof Outer Fiber Shield"
    }
  },
  {
    id: "plush-lion-pack",
    title: "Cute Lion Plush Backpack",
    category: "forest",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/lion.png"),
    rating: 4.9,
    badge: "Wildly Soft",
    description: "The king of all cuddly backpacks. The plush lion features a deep brown stitched felt mane, a soft yellow snout, adorable whiskers, and comfortable dark brown adjustable straps.",
    specs: {
      "Material": "Reinforced Soft Plush Velvet",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Dark Brown Padded",
      "Trim": "Stitched Mane felt layer decoration"
    }
  },
  {
    id: "plush-rabbit-pack",
    title: "Cute Rabbit Plush Backpack",
    category: "garden",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/rabbit.png"),
    rating: 4.8,
    badge: "Playful Bunny",
    description: "Hop to school or adventures with this sweet pink bunny companion! Features long erect ears, embroidered foot pads, a pink zippered storage pouch, and matching pink straps.",
    specs: {
      "Material": "Velvet-Plush Cotton-Blend",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Light Pink Padded",
      "Trim": "Long Standing Fabric Ears"
    }
  },
  {
    id: "plush-bee-pack",
    title: "Cute Bee Plush Backpack",
    category: "garden",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/bee.png"),
    rating: 4.9,
    badge: "Sweet Honey",
    description: "An adorable, soft yellow and brown striped bee backpack. Complete with cute plush wings, soft antennae, and adjustable brown shoulder straps.",
    specs: {
      "Material": "Velvet-Plush Cotton-Blend",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Yellow/Brown Comfort Padded",
      "Care": "Hand Wash / Gentle Machine Cycle"
    }
  },
  {
    id: "plush-cat-pack",
    title: "Cute Cat Plush Backpack",
    category: "garden",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/cat.png"),
    rating: 4.8,
    badge: "Playful Kitty",
    description: "A sweet black cat backpack to keep you company. Features cute pink inner ears, colorful embroidered eyes, a pink paw detail, and adjustable brown straps.",
    specs: {
      "Material": "Super-Soft Premium Velvet",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Brown Comfort Padded",
      "Care": "Hand Wash / Air Dry"
    }
  },
  {
    id: "plush-penguin-pack",
    title: "Cute Penguin Plush Backpack",
    category: "aquatic",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/penguin.png"),
    rating: 4.7,
    badge: "Chilly Buddy",
    description: "Waddle around with this cute penguin backpack! Features a black and white body, a bright orange beak, tiny wings, and comfortable yellow shoulder straps.",
    specs: {
      "Material": "High-Quality Eco-Velvet",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Bright Yellow Padded",
      "Specialty": "Soft wing-shaped arm straps"
    }
  },
  {
    id: "plush-monkey-pack",
    title: "Cute Monkey Plush Backpack",
    category: "forest",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/monkey.png"),
    rating: 4.9,
    badge: "Cheeky Monkey",
    description: "A cheeky grey and red monkey backpack for kids and toddlers. Features adorable round ears, red rosy cheeks, a cute little green leaf accent on top, and red straps.",
    specs: {
      "Material": "Reinforced Soft Plush Velvet",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Red Comfort Padded",
      "Accent": "Felt green leaf head accessory"
    }
  },
  {
    id: "plush-polar-bear-pack",
    title: "Cute Polar Bear Plush Backpack",
    category: "aquatic",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/polar_bear.png"),
    rating: 4.8,
    badge: "Cozy Winter",
    description: "Stay cozy with this adorable white polar bear companion! Features a cute embroidered face, rosy orange cheeks, a yellow and orange striped winter scarf, and orange straps.",
    specs: {
      "Material": "Premium Velvet-Plush Cotton",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Orange Comfort Padded",
      "Accessory": "Stitched knit-style mini scarf"
    }
  },
  {
    id: "plush-butterfly-pack",
    title: "Cute Butterfly Plush Backpack",
    category: "garden",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/butterfly.png"),
    rating: 4.9,
    badge: "Flutter & Fun",
    description: "Spread your wings with this adorable pink butterfly backpack! Features purple antennae, cheerful yellow wings, a hot-pink zipper compartment with light-blue wing-petal pockets, and pink padded straps.",
    specs: {
      "Material": "Velvet-Plush Polyester",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Pink Comfort Padded",
      "Care": "Hand Wash / Air Dry"
    }
  },
  {
    id: "plush-capybara-pack",
    title: "Cute Capybara Plush Backpack",
    category: "forest",
    price: 699.00,
    originalPrice: 749.00,
    image: assetUrl("assets/images/capybara.png"),
    rating: 4.8,
    badge: "Chill Vibes",
    description: "The internet's favourite animal is now your cutest backpack! This golden-brown capybara features round plush ears, a sleepy embroidered face, an amber zipper, and matching tan adjustable straps.",
    specs: {
      "Material": "Super-Soft Premium Velvet",
      "Dimensions": "26 x 22 x 10 cm",
      "Straps": "Adjustable Tan Comfort Padded",
      "Care": "Hand Wash / Gentle Machine Cycle"
    }
  }
];

/**
 * Initial reactive application state
 */
export const state = {
  cart: [],      // Array of { product: Object, quantity: Number }
  wishlist: new Set(), // Set of Product IDs
  filters: {
    searchQuery: "",
    category: "all",
    maxPrice: 1000,
    sortBy: "featured"
  },
  orders: [] // Simulating transaction history
};
