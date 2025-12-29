
import { AlzheimerStage, PredictionResult } from '../types';

/**
 * In a real production environment, this function would call:
 * POST /predict { image: File }
 */
export const predictAlzheimerStage = async (imageFile: File): Promise<PredictionResult> => {
  // Simulating network delay for CNN inference
  await new Promise(resolve => setTimeout(resolve, 2500));

  const stages = Object.values(AlzheimerStage);
  // For demo purposes, we randomly select a result, 
  // but we weight it towards 'Non Demented' for generic samples
  const randomIdx = Math.floor(Math.random() * stages.length);
  const confidence = 0.85 + Math.random() * 0.12;

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    stage: stages[randomIdx] as AlzheimerStage,
    confidence: parseFloat(confidence.toFixed(2)),
  };
};

export const getStoredRecords = (): PredictionResult[] => {
  const data = localStorage.getItem('alzcare_predictions');
  return data ? JSON.parse(data) : [];
};

export const savePrediction = (prediction: PredictionResult) => {
  const current = getStoredRecords();
  const updated = [prediction, ...current];
  localStorage.setItem('alzcare_predictions', JSON.stringify(updated));
};
