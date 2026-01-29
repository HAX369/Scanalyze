
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface HarmfulIngredient {
  name: string;
  risk: 'Low' | 'Moderate' | 'High';
  category: 'Toxic' | 'Allergen' | 'Endocrine' | 'Carcinogen' | 'Gut Health';
  effects: string;
  affectedSystems: string[];
}

export interface IngredientAnalysis {
  id: string;
  date: string;
  productName: string;
  brandName?: string;
  safe: string[];
  harmful: HarmfulIngredient[];
  rating: number; // 0-100 score
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  summary: string;
  rawText: string;
  imageUrl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  SCANNING = 'SCANNING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
