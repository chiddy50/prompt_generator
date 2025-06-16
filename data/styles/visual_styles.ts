const VISUAL_STYLES = {
  ANIMATION: {
    TRADITIONAL: {
      "Disney Classic": "Snow White, Beauty and the Beast hand-drawn style",
      "Studio Ghibli": "Miyazaki's detailed hand-drawn aesthetic",
      "Warner Bros Cartoon": "Looney Tunes classic cartoon style",
      "Hanna-Barbera": "Flintstones, Scooby-Doo retro animation",
      "UPA Style": "Gerald McBoing-Boing minimalist approach",
      "Soviet Animation": "Soyuzmultfilm classic Eastern European style"
    },
    MODERN_3D: {
      "Pixar Animation": "Toy Story, Cars polished 3D aesthetic",
      "DreamWorks Style": "Shrek, How to Train Your Dragon approach",
      "Illumination Style": "Minions, Despicable Me character design",
      "Blue Sky Studios": "Ice Age, Rio stylized 3D animation",
      "Sony Pictures Animation": "Spider-Verse, Hotel Transylvania style"
    },
    INTERNATIONAL: {
      "Anime": "Japanese animation - Studio Gainax, Madhouse style",
      "Manga Style": "Japanese comic book aesthetic",
      "European Animation": "Cartoon Saloon, Les Armateurs approach",
      "Chinese Animation": "Traditional and modern Chinese styles",
      "Korean Animation": "Webtoon and manhwa influenced styles"
    },
    SPECIALIZED: {
      "Stop Motion": "Laika Studios, Aardman claymation style",
      "Paper Cutout": "South Park flat animation style",
      "Flash Animation": "Early 2000s web animation aesthetic",
      "Rotoscoping": "Realistic motion capture animation",
      "Mixed Media": "Combining 2D/3D animation elements"
    }
  },

  CINEMATIC: {
    GENRE_BASED: {
      "Film Noir": "High contrast, dramatic shadows, monochrome",
      "Neo-Noir": "Modern take on classic noir aesthetics",
      "Cyberpunk": "Blade Runner neon-soaked futuristic style",
      "Steampunk": "Victorian-era industrial fantasy aesthetic",
      "Dieselpunk": "1940s retro-futuristic war-era style",
      "Space Opera": "Epic sci-fi with grand scale visuals",
      "Western": "Desert landscapes, warm earth tones",
      "Horror": "Dark, suspenseful, high-contrast lighting"
    },
    DIRECTOR_SIGNATURES: {
      "Wes Anderson": "Symmetrical, pastel color palettes, centered framing",
      "Christopher Nolan": "Realistic, high-contrast, epic scale",
      "Tim Burton": "Gothic, whimsical dark fantasy aesthetic",
      "Tarantino Style": "Saturated colors, vintage 70s feel",
      "Denis Villeneuve": "Atmospheric, minimalist epic cinematography",
      "Ridley Scott": "Epic, detailed, immersive world-building",
      "David Fincher": "Dark, precise, cold color grading",
      "Edgar Wright": "Dynamic, colorful, comic book-inspired"
    },
    TECHNICAL: {
      "IMAX Documentary": "Ultra-wide, crystal clear, nature-focused",
      "Handheld Documentary": "Realistic, shaky cam, authentic feel",
      "Steadicam Smooth": "Fluid, professional camera movement",
      "Drone Cinematography": "Aerial perspectives, sweeping movements",
      "Vintage Film Stock": "16mm, 35mm grain and color characteristics",
      "Digital Cinema": "Clean, sharp, modern digital aesthetic"
    }
  },

  PHOTOGRAPHY: {
    PORTRAIT: {
      "Fashion Photography": "High-end editorial, dramatic lighting",
      "Street Photography": "Candid, documentary, authentic moments",
      "Fine Art Portraits": "Artistic, conceptual, gallery-worthy",
      "Corporate Headshots": "Professional, clean, business-focused",
      "Lifestyle Photography": "Natural, authentic, everyday moments",
      "Glamour Photography": "Polished, beauty-focused, studio-lit"
    },
    TECHNICAL: {
      "High Contrast": "Bold dramatic visual language, deep shadows",
      "Macro Photography": "Extreme close-up detail, shallow depth",
      "Long Exposure": "Motion blur, light trails, time passage",
      "HDR Photography": "High Dynamic Range, enhanced detail",
      "Tilt-Shift": "Miniature effect, selective focus",
      "Black and White": "Monochrome, classic timeless aesthetic"
    },
    AESTHETIC: {
      "Retro Vintage": "Grainy film textures, faded colors, nostalgic",
      "Minimalist": "Clean, simple compositions, negative space",
      "Surreal Conceptual": "Artistic manipulation, dreamlike imagery",
      "Documentary": "Journalistic, authentic, storytelling-focused",
      "Commercial": "Product-focused, clean, marketing-ready",
      "Instagram Aesthetic": "Bright, saturated, social media optimized"
    }
  },

  DIGITAL_ART: {
    DIGITAL_PAINTING: {
      "Concept Art": "Video game/film pre-production visualization",
      "Matte Painting": "Cinematic backgrounds, photorealistic environments",
      "Character Design": "Stylized figures, personality-driven",
      "Environment Art": "World-building visuals, atmospheric scenes",
      "Comic Book Art": "Sequential storytelling, dynamic illustrations",
      "Fantasy Art": "Magical, otherworldly, imaginative scenes"
    },
    GRAPHIC_DESIGN: {
      "Flat Design": "Minimal, geometric, clean interfaces",
      "Material Design": "Google's design language, depth and shadow",
      "Retro Poster Art": "Vintage advertising aesthetic",
      "Typography Focused": "Text-as-art, letterform emphasis",
      "Infographic Style": "Data visualization, educational graphics",
      "Logo Design": "Brand identity, symbolic representation"
    },
    CONTEMPORARY: {
      "Vaporwave": "Neon, retro-futuristic, 80s nostalgia",
      "Synthwave": "80s-inspired neon, cyberpunk aesthetic",
      "Low Poly": "Geometric, simplified 3D forms",
      "Pixel Art": "8-bit, 16-bit gaming style, retro digital",
      "Glitch Art": "Digital corruption aesthetic, error-based",
      "Voxel Art": "3D pixel art, Minecraft-inspired blocks"
    }
  },

  TRADITIONAL_ART: {
    FINE_ART_MOVEMENTS: {
      "Impressionism": "Soft, light-focused, brushstroke visible",
      "Post-Impressionism": "Bold colors, expressive, emotional",
      "Art Nouveau": "Decorative, flowing lines, natural motifs",
      "Art Deco": "Geometric, luxurious, 1920s glamour",
      "Surrealism": "Dreamlike, fantastical, subconscious imagery",
      "Cubism": "Abstract, geometric, multiple perspectives",
      "Abstract Expressionism": "Emotional, non-representational, gestural"
    },
    CLASSICAL_TECHNIQUES: {
      "Oil Painting": "Rich, textured, traditional medium",
      "Watercolor": "Transparent, flowing, delicate washes",
      "Pen and Ink": "Detailed line work, cross-hatching",
      "Charcoal Drawing": "Dramatic contrast, expressive marks",
      "Pastels": "Soft, blended colors, chalky texture",
      "Acrylic Painting": "Vibrant, fast-drying, versatile medium"
    },
    ILLUSTRATION_STYLES: {
      "Children's Book": "Whimsical, colorful, story-focused",
      "Editorial Illustration": "Commentary, magazine-style graphics",
      "Scientific Illustration": "Accurate, detailed, educational",
      "Fashion Illustration": "Stylized figures, clothing-focused",
      "Botanical Illustration": "Detailed plant studies, naturalistic",
      "Technical Illustration": "Precise, instructional, diagram-like"
    }
  },

  EMERGING_EXPERIMENTAL: {
    AI_ASSISTED: {
      "AI Generated": "Midjourney, DALL-E, Stable Diffusion aesthetic",
      "Neural Style Transfer": "Artistic style applied via machine learning",
      "Deepfake Realism": "AI-generated photorealistic imagery",
      "Procedural Generation": "Algorithm-created patterns and forms",
      "Machine Learning Art": "Data-driven creative outputs",
      "GAN Art": "Generative Adversarial Network creations"
    },
    MIXED_REALITY: {
      "Abstract Experimental": "Unconventional techniques, boundary-pushing",
      "Augmented Reality": "Digital overlay on real world",
      "Holographic Display": "3D light projections, futuristic",
      "Interactive Media": "User-responsive, dynamic art",
      "Projection Mapping": "Environmental light projection",
      "Virtual Reality Art": "Immersive 3D artistic experiences"
    },
    SOCIAL_MEDIA: {
      "Instagram Filter": "App-based enhancement, trendy effects",
      "TikTok Video Style": "Short-form, attention-grabbing visuals",
      "YouTube Thumbnail": "Click-worthy, high-contrast graphics",
      "Snapchat Story": "Casual, ephemeral, mobile-first",
      "Pinterest Board": "Curated, inspirational, mood board style",
      "Meme Aesthetic": "Internet culture, humorous, viral-ready"
    }
  },

  GAME_ART: {
    PIXEL_STYLES: {
      "8-bit": "Classic NES, limited color palette",
      "16-bit": "SNES era, more detailed sprites",
      "32-bit": "Early PlayStation, enhanced pixel art",
      "HD Pixel Art": "Modern high-resolution pixel aesthetic",
      "Isometric Pixel": "3D-looking 2D art, strategy game style"
    },
    THREE_D_STYLES: {
      "Low Poly": "Minimalist 3D, geometric shapes",
      "Realistic 3D": "Photorealistic, high-detail modeling",
      "Stylized 3D": "Artistic interpretation, exaggerated features",
      "Cel Shaded": "Cartoon-like 3D rendering",
      "Voxel": "3D pixels, Minecraft-inspired blocks"
    },
    GENRE_SPECIFIC: {
      "JRPG Style": "Japanese RPG aesthetic, anime-influenced",
      "Western RPG": "Realistic fantasy, detailed environments",
      "Indie Game Art": "Unique, artistic, experimental styles",
      "Mobile Game UI": "Touch-friendly, casual, colorful",
      "AAA Game Polish": "High-budget, photorealistic quality"
    }
  }
};

// Helper function to get all styles as a flat array
const getAllStyles = () => {
  const styles = [];
  
  Object.keys(VISUAL_STYLES).forEach(category => {
    Object.keys(VISUAL_STYLES[category]).forEach(subcategory => {
      Object.keys(VISUAL_STYLES[category][subcategory]).forEach(style => {
        styles.push({
          category,
          subcategory,
          name: style,
          description: VISUAL_STYLES[category][subcategory][style]
        });
      });
    });
  });
  
  return styles;
};

// Helper function to get styles by category
const getStylesByCategory = (category) => {
  return VISUAL_STYLES[category] || {};
};

// Helper function to search styles by name or description
const searchStyles = (query) => {
  const allStyles = getAllStyles();
  const lowercaseQuery = query.toLowerCase();
  
  return allStyles.filter(style => 
    style.name.toLowerCase().includes(lowercaseQuery) ||
    style.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VISUAL_STYLES,
    getAllStyles,
    getStylesByCategory,
    searchStyles
  };
}

// Example usage:
console.log('Total categories:', Object.keys(VISUAL_STYLES).length);
console.log('Animation styles:', Object.keys(VISUAL_STYLES.ANIMATION.TRADITIONAL));
console.log('Search "pixel":', searchStyles('pixel').map(s => s.name));