
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getBase64Data = (base64String: string) => {
    return base64String.split(',')[1];
}

export const removeObjectFromImage = async (base64Image: string, mimeType: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: getBase64Data(base64Image),
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: 'In this image, intelligently remove the object that has been scribbled on with a red brush. Fill the space with a realistic background that seamlessly matches the surroundings. Do not include the red scribble in the final output. Return only the edited image.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && firstPart.inlineData) {
            return firstPart.inlineData.data;
        } else {
            throw new Error("No image data returned from API for object removal.");
        }
    } catch (error) {
        console.error("Error removing object with Gemini API:", error);
        throw new Error("Failed to process image for object removal.");
    }
};

export const enhanceImage = async (base64Image: string, mimeType: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: getBase64Data(base64Image),
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: 'Significantly enhance this image. Perform the following actions: 1. Deblur the entire image to make it sharp and clear. 2. Upscale the image to double its current resolution while adding realistic details. 3. Correct colors and lighting to make it vibrant and professional. Return only the final, processed image.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && firstPart.inlineData) {
            return firstPart.inlineData.data;
        } else {
            throw new Error("No image data returned from API for enhancement.");
        }
    } catch (error) {
        console.error("Error enhancing image with Gemini API:", error);
        throw new Error("Failed to process image for enhancement.");
    }
};
