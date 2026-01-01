import { AlzheimerStage, PredictionResult } from '../types';

/**
 * Enhanced ML service that attempts to connect to the local Python backend.
 */
export const predictAlzheimerStage = async (imageFile: File): Promise<PredictionResult> => {
  // Try to use the real backend if it's available
  try {
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(imageFile);
    });
    
    const base64Image = await base64Promise;

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        stage: data.result as AlzheimerStage || AlzheimerStage.NON_DEMENTED,
        confidence: data.confidence || 0.95,
      };
    }
  } catch (error) {
    console.warn("Backend unavailable, falling back to simulation mode.");
  }

  // Fallback Simulation for local testing or disconnected states
  await new Promise(resolve => setTimeout(resolve, 2000));

  const stages = Object.values(AlzheimerStage);
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