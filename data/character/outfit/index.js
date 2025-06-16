// COMPREHENSIVE CHARACTER OUTFIT CUSTOMIZATION SYSTEM
// Each category supports color, material, and pattern customization

export const outfitCustomization = {
    
    // ===========================================
    // MAIN CLOTHING CATEGORIES
    // ===========================================
    
    // Special Categories
    statementPieces: [
        "Reflective windbreaker",
        "Chainmail top (modern metallic)",
        "Transparent PVC trench coat",
        "Asymmetrical draped hoodie",
        "Glow-in-the-dark streetwear",
        "Digital print anime/k-pop jacket"
    ],
    
    upperBodyWear: {
        // Modern Western
        modern: [
            "T-Shirt", "Tank Top", "Crop Top", "Blouse", "Button-Down Shirt", 
            "Polo Shirt", "Hoodie", "Sweater", "Cardigan", "Blazer", 
            "Suit Jacket", "Vest/Waistcoat", "Tube Top", "Halter Top", 
            "Off-Shoulder Top", "Turtleneck", "Long-sleeve Shirt", "Jersey",
            "Bodysuit", "Corset Top",

            "Oversized hoodie (Fear of God Essentials)",
            "Cropped puffer jacket (North Face, Patagonia)",
            "Techwear parka (ACRONYM, Stone Island)",
            "Graphic muscle tee (Vintage style)",
            "Half-zip performance fleece (Lululemon, Arc'teryx)",
            "Deconstructed blazer (Balenciaga, Maison Margiela)",
            "Mesh athletic top (Gymshark, Alphalete)"
        ],


        // African Traditional
        african: [
            "Dashiki", "Agbada", "Kente Cloth Top", "Boubou", "Kaftan",
            "Habesha Kemis", "Shuka", "Kitenge Top", "Mud Cloth Shirt",
            "West African Grand Boubou", "Ethiopian Traditional Shirt",
            "Moroccan Caftan Top", "Senegalese Bubu", "Nigerian Buba",
            "Ghanaian Kaba", "Kenyan Kitenge Blouse", "Togolese Wrapper Top"
        ],
        
        // East Asian
        eastAsian: [
            "Kimono", "Yukata", "Haori", "Hanbok Jeogori", "Cheongsam/Qipao",
            "Changshan", "Tang Suit", "Ao Dai Top", "Chinese Tunic",
            "Japanese Happi Coat", "Korean Durumagi", "Mongolian Deel Top",
            "Vietnamese Traditional Shirt", "Thai Traditional Top"
        ],
        
        // South Asian
        southAsian: [
            "Kurta", "Sherwani", "Churidar Kameez", "Saree Blouse", "Lehenga Choli",
            "Anarkali Top", "Nehru Jacket", "Bandhgala", "Pathani Suit Top",
            "Punjabi Suit Top", "Bengali Panjabi", "South Indian Shirt",
            "Pakistani Shalwar Top", "Afghan Traditional Shirt"
        ],
        
        // Southeast Asian
        southeastAsian: [
            "Kebaya", "Barong Tagalog", "Baju Kurung", "Baju Melayu",
            "Indonesian Traditional Top", "Malaysian Traditional Shirt",
            "Filipino Traditional Top", "Cambodian Traditional Shirt",
            "Laotian Sinh Top", "Burmese Traditional Top"
        ],
        
        // Middle Eastern & Central Asian
        middleEastern: [
            "Thobe Top", "Dishdasha", "Jalabiya", "Takchita Top",
            "Persian Traditional Shirt", "Turkish Traditional Top",
            "Lebanese Traditional Top", "Syrian Traditional Shirt",
            "Jordanian Traditional Top", "Kazakh Traditional Shirt"
        ],
        
        // European Traditional
        european: [
            "Dirndl Top", "Lederhosen Shirt", "Highland Shirt", "Aran Sweater",
            "Folk Blouse", "Peasant Top", "Renaissance Shirt", "Medieval Tunic",
            "Victorian Blouse", "Bavarian Traditional Top", "Irish Traditional Shirt",
            "Scottish Highland Dress Top", "Welsh Traditional Top"
        ],
        
        // Indigenous & Other
        indigenous: [
            "Huipil", "Native American Traditional Shirt", "Inuit Traditional Top",
            "Polynesian Traditional Top", "Aboriginal Traditional Shirt",
            "Maori Traditional Top", "Arctic Traditional Shirt", "Andean Traditional Top"
        ],
        winter: [
            "Puffer coat with fur hood (Moncler, Canada Goose)",
            "Sherpa-lined denim jacket",
            "Fleece-lined leather jacket",
            "Tech fleece full-zip (Nike, Adidas)",
            "Down gilet (vest) with logo print",
            "Heated jacket with USB charging"
        ]
    },

    lowerBodyWear: {
        // Modern Western
        modern: [
            "Jeans", "Trousers", "Pants", "Shorts", "Skirt", "Mini Skirt", 
            "Maxi Skirt", "A-Line Skirt", "Pencil Skirt", "Pleated Skirt",
            "Leggings", "Joggers", "Cargo Pants", "Culottes", "Palazzo Pants", 
            "Wide-Leg Pants", "Bootcut Jeans", "Skinny Jeans", "Capri Pants",
            "Bermuda Shorts", "Hot Pants", "Palazzo Shorts",

            "Cargo joggers (Nike ACG, Carhartt)",
            "Distressed denim (Amiri, Fear of God)",
            "Techwear tactical pants (Enfin Levé, Outlier)",
            "Bicycle shorts (lululemon, Alo Yoga)",
            "Wide-leg trousers (Cos, Uniqlo U)",
            "Leather pants (AllSaints, Zara)"
        ],
        
        // African Traditional
        african: [
            "Wrapper", "Kanga", "Kitenge Skirt", "Boubou Bottom", "Dashiki Pants",
            "African Print Skirt", "Kente Pattern Pants", "Mud Cloth Wrap",
            "West African Wrapper", "Ethiopian Traditional Skirt", "Moroccan Pants",
            "Senegalese Traditional Skirt", "Nigerian Iro", "Ghanaian Kaba Skirt"
        ],
        
        // East Asian
        eastAsian: [
            "Hakama", "Hanbok Chima", "Cheongsam Skirt", "Ao Dai Pants",
            "Chinese Traditional Pants", "Japanese Traditional Pants",
            "Korean Traditional Pants", "Mongolian Traditional Pants",
            "Vietnamese Traditional Pants", "Thai Traditional Pants"
        ],
        
        // South Asian
        southAsian: [
            "Dhoti", "Lungi", "Salwar", "Lehenga", "Ghagra", "Churidar",
            "Patiala Pants", "Palazzo Salwar", "Sharara", "Garara",
            "Bengali Traditional Pants", "Punjabi Salwar", "South Indian Veshti"
        ],
        
        // Southeast Asian
        southeastAsian: [
            "Sarong", "Longyi", "Kebaya Skirt", "Baju Kurung Bottom",
            "Indonesian Traditional Pants", "Malaysian Traditional Skirt",
            "Filipino Traditional Pants", "Cambodian Traditional Pants"
        ],
        
        // Middle Eastern & Central Asian
        middleEastern: [
            "Sirwal", "Shalwar", "Harem Pants", "Afghani Pants",
            "Deel Bottom", "Bedouin Pants", "Persian Traditional Pants",
            "Turkish Traditional Pants", "Lebanese Traditional Pants"
        ],
        
        // European Traditional
        european: [
            "Kilt", "Lederhosen", "Dirndl Skirt", "Medieval Hose",
            "Renaissance Breeches", "Victorian Bustle Skirt", "Flamenco Skirt",
            "Irish Traditional Pants", "Scottish Traditional Kilt"
        ],
        
        // Indigenous & Other
        indigenous: [
            "Native American Leggings", "Huipil Skirt", "Pollera",
            "Grass Skirt", "Pareo", "Inuit Traditional Pants",
            "Polynesian Traditional Wrap", "Aboriginal Traditional Pants"
        ]
    },

    outerWear: {
        // Modern
        modern: [
            "Blazer", "Suit Jacket", "Sports Coat", "Bomber Jacket", "Denim Jacket",
            "Leather Jacket", "Windbreaker", "Puffer Jacket", "Trench Coat",
            "Pea Coat", "Overcoat", "Cardigan", "Hoodie", "Zip-up Hoodie",
            "Track Jacket", "Varsity Jacket", "Motorcycle Jacket", "Rain Jacket"
        ],
        
        // Cultural Traditional
        cultural: [
            "Haori", "Jeogori", "Nehru Jacket", "Sherwani Jacket", "Tang Suit Jacket",
            "Moroccan Djellaba", "Burnous", "Selham", "Highland Plaid", "Irish Cloak",
            "Spanish Cape", "Poncho", "Serape", "Native American Blanket Coat",
            "Inuit Parka", "Russian Coat", "Chinese Traditional Jacket", "Korean Durumagi"
        ],
        
        // Fantasy & Historical
        fantasyHistorical: [
            "Cloak", "Cape", "Mantle", "Medieval Surcoat", "Renaissance Doublet",
            "Victorian Cape", "Steampunk Coat", "Fantasy Cloak", "Wizard Cloak",
            "Knight's Surcoat", "Mage Robes", "Adventurer's Cloak"
        ]
    },

    fullBodyWear: {
        modern: [
            "Matching sweatsuit (set)",
            "Track suit (Adidas Originals, Juicy Couture)",
            "Boiler suit/coveralls (Carhartt, Dickies)",
            "Quilted jumpsuit (Bottega Veneta inspired)",
            "Neoprene wetsuit-style outfit",
            "Cyberpunk-inspired armored vest combo"
        ],

        mensSuits: [
            "Single-breasted suit",
            "Double-breasted suit",
            "Tuxedo (Black Tie)",
            "Dinner suit",
            "Morning suit",
            "Tailcoat suit",
            "Lounge suit",
            "Three-piece suit",
            "Two-piece suit",
            "Mandarin collar suit",
            "Zoot suit",
            "Slim fit suit",
            "Classic fit suit",
            "Modern fit suit",
            "Business suit",
            "Wedding suit",
            "Checked suit",
            "Pinstripe suit",
            "Windowpane suit",
            "Velvet suit",
            "Linen suit",
            "Tweed suit",
            "Seersucker suit",
            "Double-vented suit",
            "No-vent suit",
            "Italian cut suit",
            "British cut suit",
            "American sack suit"
        ],

        womensSuits: [
            "Pant suit",
            "Skirt suit",
            "Tuxedo suit (feminine cut)",
            "Power suit",
            "Three-piece suit",
            "Blazer and trousers set",
            "Blazer and skirt set",
            "Double-breasted suit",
            "Single-breasted suit",
            "Cropped blazer suit",
            "Oversized suit",
            "Wrap suit",
            "Peplum suit",
            "Slim fit pant suit",
            "Casual suit set",
            "Linen summer suit",
            "Velvet suit",
            "Tweed suit",
            "Business suit",
            "Evening formal suit",
            "Monochrome tailored suit",
            "Structured shoulder suit",
            "Cape suit",
            "Jumpsuit suit",
            "Belted waist suit"
        ],
        

        // Dresses
        dresses: [
            "Cocktail Dress", "Evening Gown", "Sundress", "Wrap Dress", "Shift Dress",
            "Maxi Dress", "Midi Dress", "A-Line Dress", "Bodycon Dress", "Ball Gown",
            "Wedding Dress", "Prom Dress", "Little Black Dress", "Empire Waist Dress"
        ],
        
        // Cultural Full-Body
        cultural: [
            "Kimono (full)", "Hanbok (full)", "Saree", "Lehenga Choli", "Sharara",
            "Ao Dai (full)", "Cheongsam (full)", "Abaya", "Jalabiya", "Kaftan (full)",
            "Boubou (full)", "Dashiki Dress", "Kente Dress", "Habesha Kemis",
            "Sari", "Anarkali Dress", "Indonesian Kebaya Set", "Malaysian Baju Kurung"
        ],
        
        // Religious & Ceremonial
        ceremonial: [
            "Monk Robes", "Nun's Habit", "Clerical Robes", "Ceremonial Vestments",
            "Prayer Dress", "Ritual Robes", "Graduation Gown", "Academic Robes"
        ],
        
        // Historical & Fantasy
        historical: [
            "Medieval Gown", "Renaissance Dress", "Victorian Dress", "Regency Gown",
            "Toga (full)", "Chiton", "Peplos", "Wizard Robes", "Fantasy Dress"
        ],
        tactical: [
            "Military",
            "Tactical",
        ]
    },

    // ===========================================
    // ACCESSORIES & EXTRAS
    // ===========================================

    footwear: {
        none: [
            "Barefoot", "Socks",
        ],
        casual: [
            "Sandals", "Flip-flops", "Canvas sneakers", "Loafers", "Espadrilles",
            "Slip-on shoes", "Boat shoes", "Moccasins", "Clogs", "Crocs"
        ],
        boots: [
            "Ankle boots", "Knee-high boots", "Thigh-high boots", "Combat boots",
            "Hiking boots", "Work boots", "Cowboy boots", "Rain boots",
            "Snow boots", "Steel-toe boots", "Chelsea boots", "Desert boots",

            "Timberland Premium 6-inch",
            "Dr. Martens Jadon platform",
            "Chelsea boots (Blundstone, Common Projects)",
            "Military-style tactical boots (Danner, 5.11)",
            "Hiking boots (Merrell, Salomon)",
            "Designer combat boots (Balenciaga, Rick Owens)",
            "Snow boots (Sorel, Columbia)",
            "Motorcycle engineer boots",
            
        ],
        sneakers: [
            "Dad shoes (New Balance 990, Nike Air Monarch)",
            "Chunky sneakers (Balenciaga Triple S)",
            "Minimalist (Common Projects, Axel Arigato)",
            "Running tech (Nike Vaporfly, Adidas Ultraboost)",
            "Retro basketball (Air Jordan 1, Reebok Question)",
            "Slip-ons (Vans Checkerboard, Toms)",
            "Designer collaborations (Dior x Air Jordan)"
        ],
        modern: [
            "Barefoot/minimalist shoes (Vivobarefoot)",
            "3D-printed sneakers (Adidas 4DFWD)",
            "Self-lacing sneakers (Nike Adapt)",
            "Recycled material eco-shoes (Allbirds, Rothy's)",
            "LED light-up sneakers",
            "Waterproof city shoes (Vessi, On Cloud)"
        ],
        formal: [
            "Oxford shoes", "Derby shoes", "Monk straps", "Dress heels", "Pumps",
            "Stilettos", "Wingtip brogues", "Patent leather shoes", "Mary Janes",
            "Wedges", "Block heels", "Kitten heels"
        ],
        athletic: [
            "Running shoes", "Basketball sneakers", "Tennis shoes", "Cleats",
            "Cycling shoes", "Climbing shoes", "Skate shoes", "Wrestling boots",
            "Boxing boots", "Cross-trainers", "Walking shoes"
        ],
        cultural: [
            "Geta", "Zori", "Tabi", "Hanbok shoes", "Kung Fu shoes", "Chinese slippers",
            "Jutti/Mojari", "Kolhapuri sandals", "Paduka", "Babouche", "Turkish shoes",
            "African leather sandals", "Native American moccasins", "Mukluks"
        ]
    },

    headWear: {
        casual: [
            "Baseball cap", "Beanie", "Snapback", "Bucket hat", "Sun hat",
            "Visor", "Headband", "Hair tie", "Bandana", "Scrunchie"
        ],
        formal: [
            "Fedora", "Top hat", "Bowler hat", "Beret", "Fascinator",
            "Pillbox hat", "Wide-brim hat", "Cloche hat"
        ],
        cultural: [
            "Hijab", "Turban", "Sikh turban", "Kufi", "Kippah", "Taqiyah",
            "Gele", "Dhuku", "Duku", "Kente headwrap", "Hanbok jokduri",
            "Gat", "Chinese traditional hat", "Conical hat", "Songkok",
            "Fez", "Tarboosh", "Karakul hat", "Ushanka", "Sombrero"
        ],
        protective: [
            "Helmet", "Hard hat", "Bike helmet", "Ski helmet", "Military helmet"
        ]
    },

    eyeWearOptions: {
        glasses: [
            "Reading glasses", "Prescription glasses", "Bifocals", "Progressive lenses",
            "Computer glasses", "Safety glasses", "Horn-rimmed glasses", "Wire-frame glasses",
            "Thick-rimmed glasses", "Cat-eye glasses", "Round glasses", "Square glasses"
        ],
        sunglasses: [
            "Aviators", "Wayfarers", "Cat-eye sunglasses", "Round sunglasses",
            "Sport sunglasses", "Designer sunglasses", "Vintage sunglasses",
            "Mirrored sunglasses", "Polarized sunglasses", "Oversized sunglasses"
        ],
        specialty: [
            "Monocle", "Lorgnette", "Safety goggles", "Swimming goggles",
            "Ski goggles", "Night vision goggles", "3D glasses", "VR headset"
        ]
    },

    neckWearOptions: {
        ties: [
            "Necktie", "Bow tie", "Ascot", "Bolo tie", "String tie", "Clip-on tie"
        ],
        scarves: [
            "Scarf", "Silk scarf", "Cashmere scarf", "Infinity scarf", "Blanket scarf",
            "Pashmina", "Shawl", "Wrap", "Stole", "Bandana scarf"
        ],
        jewelry: [
            "Necklace", "Chain", "Pendant", "Choker", "Collar necklace",
            "Statement necklace", "Pearl necklace", "Beaded necklace", "Locket"
        ],
        cultural: [
            "Prayer beads", "Maang tikka", "Cultural pendant", "Traditional necklace",
            "Tribal necklace", "Ceremonial collar"
        ]
    },

    // handWearOptions: {
    //     gloves: [
    //         "Dress gloves", "Leather gloves", "Winter gloves", "Fingerless gloves",
    //         "Work gloves", "Rubber gloves", "Latex gloves", "Mittens",
    //         "Driving gloves", "Evening gloves", "Opera gloves"
    //     ],
    //     jewelry: [
    //         "Rings", "Wedding ring", "Engagement ring", "Statement ring",
    //         "Cocktail ring", "Signet ring", "Class ring", "Pinky ring",
    //         "Bracelets", "Bangles", "Cuff bracelet", "Tennis bracelet",
    //         "Charm bracelet", "Watch", "Smart watch", "Pocket watch"
    //     ],
    //     cultural: [
    //         "Henna designs", "Traditional bangles", "Cultural bracelets",
    //         "Ceremonial gloves", "Traditional rings"
    //     ]
    // },
    handOptions: [
        "Dress gloves",
        "Leather gloves", 
        "Gym gloves", 
        "Winter gloves",
        "Fingerless gloves",
        "Work gloves",
        "Rubber gloves",
        "Latex gloves",
        "Mittens",
        "Driving gloves",
        "Evening gloves",
        "Opera gloves",
        "Ceremonial gloves",
        "Henna designs"
    ],

    wristOptions: [
        "Bracelets",
        "Bangles",
        "Cuff bracelet",
        "Tennis bracelet",
        "Charm bracelet",
        "Watch",
        "Smart watch",
        "Pocket watch",
        "Traditional bangles",
        "Cultural bracelets"
    ],

    fingerOptions: [
        "Rings",
        "Wedding ring",
        "Engagement ring",
        "Statement ring",
        "Cocktail ring",
        "Signet ring",
        "Class ring",
        "Pinky ring",
        "Traditional rings"
    ],

    props: {
        bags: [
            "Handbag", "Purse", "Clutch", "Tote bag", "Shoulder bag",
            "Crossbody bag", "Backpack", "Messenger bag", "Briefcase",
            "Satchel", "Duffle bag", "Gym bag", "Laptop bag"
        ],
        accessories: [
            "Belt", "Suspenders", "Pocket square", "Handkerchief", "Wallet",
            "Phone case", "Keys", "Umbrella", "Walking stick", "Cane"
        ],
        tech: [
            "Smartphone", "Tablet", "Laptop", "Headphones", "Earbuds",
            "Smart watch", "Fitness tracker", "Camera"
        ],
        cultural: [
            "Prayer beads", "Fan", "Cultural staff", "Traditional bag",
            "Ceremonial items", "Cultural symbols"
        ]
    },

    extraBodyWearOptions: {
        undergarments: [
            "T-shirt (undershirt)", "Tank top (undershirt)", "Camisole",
            "Sports bra", "Regular bra", "Strapless bra", "Push-up bra",
            "Briefs", "Boxers", "Boxer briefs", "Thong", "Boyshorts",
            "Shapewear", "Corset", "Bustier", "Bodysuit"
        ],
        legwear: [
            "Socks", "Knee-high socks", "Thigh-high socks", "Crew socks",
            "Ankle socks", "No-show socks", "Compression socks", "Tights",
            "Pantyhose", "Stockings", "Fishnet stockings", "Leggings (sheer)"
        ],
        specialty: [
            "Arm warmers", "Leg warmers", "Garters", "Suspender belt",
            "Body jewelry", "Temporary tattoos", "Body paint", "Face paint"
        ]
    },

    // ===========================================
    // CUSTOMIZATION OPTIONS
    // ===========================================

    colors: {
        basic: [
            "Black", "White", "Gray", "Brown", "Beige", "Cream", "Ivory", "Nude"
        ],
        warm: [
            "Red", "Crimson", "Burgundy", "Maroon", "Pink", "Rose", "Coral",
            "Orange", "Peach", "Apricot", "Yellow", "Gold", "Amber", "Mustard"
        ],
        cool: [
            "Blue", "Navy", "Sky Blue", "Teal", "Turquoise", "Cyan",
            "Green", "Forest Green", "Emerald", "Mint", "Sage", "Olive",
            "Purple", "Violet", "Lavender", "Indigo", "Magenta", "Plum"
        ],
        metallic: [
            "Silver", "Gold", "Bronze", "Copper", "Rose Gold", "Platinum",
            "Pearl", "Iridescent", "Holographic", "Metallic Black", "Metallic White"
        ],
        earth: [
            "Khaki", "Tan", "Camel", "Rust", "Terra Cotta", "Sienna",
            "Chocolate", "Espresso", "Mocha", "Sand", "Stone", "Clay"
        ]
    },

    patterns: {
        basic: [
            "Solid", "Striped", "Polka dots", "Checkered", "Plaid", "Tartan",
            "Geometric", "Abstract", "Diagonal stripes", "Vertical stripes",
            "Horizontal stripes", "Pinstripes"
        ],
        floral: [
            "Floral", "Rose print", "Tropical print", "Botanical print",
            "Ditsy floral", "Large floral", "Vintage floral", "Watercolor floral"
        ],
        cultural: [
            "Kente", "Adinkra symbols", "Mudcloth", "Ankara print", "Batik",
            "Ikat", "Shibori", "Tie-dye", "Block print", "Mandala",
            "Henna patterns", "Celtic knots", "Nordic patterns",
            "Native American patterns", "Aztec patterns", "Tribal prints",
            "Paisley", "Damask", "Toile"
        ],
        animal: [
            "Leopard print", "Zebra print", "Tiger print", "Cheetah print",
            "Snake print", "Crocodile print", "Cow print", "Giraffe print"
        ],
        texture: [
            "Camouflage", "Denim wash", "Distressed", "Vintage", "Faded",
            "Ombre", "Gradient", "Color block", "Two-tone"
        ]
    },

    materials: {
        natural: [
            "Cotton", "Linen", "Silk", "Wool", "Cashmere", "Alpaca", "Hemp",
            "Bamboo", "Jute", "Ramie", "Organic cotton", "Recycled cotton"
        ],
        synthetic: [
            "Polyester", "Nylon", "Spandex", "Elastane", "Rayon", "Acrylic",
            "Microfiber", "Performance fabric", "Moisture-wicking", "Quick-dry"
        ],
        textured: [
            "Denim", "Corduroy", "Velvet", "Satin", "Chiffon", "Organza",
            "Tulle", "Lace", "Mesh", "Knit", "Jersey", "Fleece"
        ],
        leather: [
            "Leather", "Suede", "Patent leather", "Faux leather", "Vegan leather",
            "Distressed leather", "Smooth leather", "Textured leather"
        ],
        specialty: [
            "Sequined fabric", "Metallic fabric", "Holographic fabric",
            "Reflective fabric", "Waterproof", "Windproof", "Breathable",
            "Anti-microbial", "UV-protective", "Flame-resistant"
        ],
        cultural: [
            "Kente cloth", "Mudcloth", "Batik fabric", "Handwoven textiles",
            "Ikat weave", "Traditional tapestry", "Ceremonial fabric",
            "Tribal textiles", "Indigenous fabrics"
        ]
    },

    // ===========================================
    // STYLE CATEGORIES FOR FILTERING
    // ===========================================

    styleCategories: [
        "Casual/Everyday", "Business/Professional", "Formal/Evening",
        "Athletic/Sports", "Academic/Scholarly", "Religious/Ceremonial",
        "Traditional/Cultural", "Fantasy/Cosplay", "Vintage/Retro",
        "Futuristic/Sci-Fi", "Bohemian/Hippie", "Punk/Alternative",
        "Preppy/Classic", "Streetwear/Urban", "Minimalist/Modern",
        "Romantic/Feminine", "Edgy/Bold", "Artsy/Creative"
    ],

    culturalOrigins: [
        "Western/European", "African", "East Asian", "South Asian", 
        "Southeast Asian", "Middle Eastern", "Central Asian", 
        "Native American", "Latin American", "Pacific Islander", 
        "Caribbean", "Mediterranean", "Nordic/Scandinavian",
        "Celtic", "Slavic", "Aboriginal Australian", "Inuit/Arctic"
    ],

    occasions: [
        "Everyday/Casual", "Work/Professional", "School/Academic",
        "Sports/Athletic", "Beach/Vacation", "Date Night", "Party/Club",
        "Wedding/Formal Event", "Religious Service", "Cultural Ceremony",
        "Festival/Celebration", "Travel", "Home/Loungewear", "Sleep/Nightwear",
        "Outdoor/Adventure", "Winter/Cold Weather", "Summer/Hot Weather",
        "Job Interview", "Graduation", "Business Meeting"
    ]
};

// USAGE EXAMPLE:
// Each item in any category can be customized with:
// - Color (from colors object)
// - Pattern (from patterns object) 
// - Material (from materials object)
// - Style category
// - Cultural origin
// - Occasion appropriateness

export default outfitCustomization;