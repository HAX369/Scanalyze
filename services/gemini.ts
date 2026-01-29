
import { GoogleGenAI, Type } from "@google/genai";
import { IngredientAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    productName: { type: Type.STRING, description: 'Product name if identifiable' },
    brandName: { type: Type.STRING, description: 'Brand name if identifiable' },
    safe: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: 'List of ingredients generally recognized as safe'
    },
    harmful: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          risk: { type: Type.STRING, description: 'Low, Moderate, or High' },
          category: { type: Type.STRING, description: 'Toxic, Allergen, Endocrine, Carcinogen, or Gut Health' },
          effects: { type: Type.STRING, description: 'Scientific explanation of physiological impact' },
          affectedSystems: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Body systems affected (e.g., Endocrine, Nervous, Digestive)'
          }
        },
        required: ['name', 'risk', 'category', 'effects', 'affectedSystems']
      }
    },
    rating: { type: Type.NUMBER, description: 'Safety score from 0-100' },
    grade: { type: Type.STRING, description: 'A+, A, B, C, D, or F' },
    summary: { type: Type.STRING, description: 'One sentence executive summary of the product safety' },
    rawText: { type: Type.STRING, description: 'Cleaned text extracted from the OCR' }
  },
  required: ['productName', 'safe', 'harmful', 'rating', 'grade', 'summary', 'rawText']
};

export async function analyzeIngredients(base64Image: string): Promise<Partial<IngredientAnalysis>> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: `Act as a Senior Toxicologist and Health Safety Expert.
            1. Perform High-Precision OCR on this product label.
            2. Cross-reference every ingredient against global health databases (FDA, EFSA, EWG).
            3. Identify 'hidden' harmful components (e.g., synthetic fragrances, specific preservatives).
            4. For every concerning ingredient, describe precisely which body systems are affected and the long-term physiological risks.
            5. Calculate a safety score (0-100) and assign a grade (A+ to F).
            6. Provide the analysis in the requested JSON format.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: ANALYSIS_SCHEMA,
      },
    });

    const result = JSON.parse(response.text || '{}');
    return {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Gemini Precision Analysis Error:', error);
    throw new Error('Our toxicology engine could not process this label. Please ensure the text is clear.');
  }
}
