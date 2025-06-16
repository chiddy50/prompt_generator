export const getPromptRequirements = (model: string) => {
    if (model === "Google's W.I.S.K") {
        return wiskPromptRequirements()
    }
    if (model === "Stable Diffusion") {
        return stableDiffusionPromptRequirements()
    }
    if (model === "Midjourney") {
        return midjourneyPromptRequirements()
    }
    if (model === "DALL-E 3") {
        return dallePromptRequirements()
    }
    if (model === "Leonardo AI") {
        return leonardoAIPromptRequirements()
    }
    return ""    
}

export const wiskPromptRequirements = () => {
    return ` Prompt Structure: [Natural Language Description] + [Contextual Details] + [Style Reference]
    Requirements:
    (1) Prefers full sentences over fragments.
    (2) Strong at real-world physics (lighting, materials).
    (3) Avoid artist names; use descriptive style references
    (4) Supports inline parameters ("4K photorealistic")
    (5) Better with cultural/ethnic specificity    

    Ensure the prompt takes into account every single details about the character shared below.
    `
} 

export const stableDiffusionPromptRequirements = () => {
    return ` Prompt Structure: [Subject], [Details], [Style], [Quality], [Parameters]
    Requirements:
    (1) Uses diffusion model keywords (photorealistic, 8K)
    (2) Requires negative prompts for fine-tuning (ugly, blurry)
    (3) Responds well to technical terms (DSLR, bokeh)
    (4) Supports LoRA triggers (<lora:styleXX:1.0>)
    (5) Parameters in () or [] ((masterpiece:1.2))  

    Ensure the prompt takes into account every single details about the character shared below.
    `
} 

export const midjourneyPromptRequirements = () => {
    return ` Prompt Structure: [Subject] + [Key Details] + [Style/Composition] + [Parameters]
    Requirements:
    (1) Use comma-separated fragments (not full sentences)
    (2) Order matters (first words have higher priority)
    (3) Supports weighting (::1.5) and negations (no glasses)
    (4) Artist/style references work well (by Greg Rutkowski)
    (5) Parameters always at end (--ar 16:9 --v 6)

    Example:
    "Cyberpunk samurai, neon armor with circuit patterns, intricate mechanical arms, glowing red eyes, dynamic lighting, hyper-detailed by Artgerm, 8K --ar 3:2 --style raw"

    Ensure the prompt takes into account every single details about the character shared below.
    `
} 

export const dallePromptRequirements = () => {
    return ` Prompt Structure: [Detailed Natural Language] + [Context] + [Style Cues]
    Requirements:
    (1) Chat-like prompts work best ("Create an image of...")
    (2) Extremely literal - describe exactly what you want
    (3) Artist names less effective; describe styles instead
    (4) Handles complex scenes with multiple objects well
    (5) Supports in-painting edits via text

    Ensure the prompt takes into account every single details about the character shared below.
    `
} 

export const leonardoAIPromptRequirements = () => {
    return ` Prompt Structure: [Subject] + [Style] + [Modifiers] + [Model Selection]
    Requirements:
    (1) Works with short tags (#cyberpunk #portrait)
    (2) Has dedicated style buttons (Anime, Realistic)
    (3) Uses model presets (Alchemy V2, PhotoReal)
    (4) Prefers aesthetic adjectives (ethereal, cinematic)
    (5) Supports element weighting (fantasy armor::1.5)

    Ensure the prompt takes into account every single details about the character shared below.
    Example:
    "Elven archer #fantasy #conceptart, flowing silver hair, glowing tattoos, autumn forest backdrop, cinematic composition @AlchemyV2 @PhotoReal --creative"
    `
} 

