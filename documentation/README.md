
# ALZCARE: Alzheimer’s Disease Detection & Progress Tracker

ALZCARE is a dual-purpose medical application that provides AI-driven MRI classification for Alzheimer's stages and a longitudinal progress tracker for patients.

## Key Features
- **CNN-Powered MRI Classification**: Categorizes brain scans into Non Demented, Very Mild, Mild, or Moderate Demented.
- **Patient Progress Dashboard**: Visualizes disease progression using Recharts.
- **ALZCARE AI Assistant**: A Gemini-powered medical chatbot for caregivers and patients.
- **Responsive Medical UI**: Clean, professional design optimized for clinical settings.

## Getting Started
1. **Prerequisites**: Node.js and an active Google Gemini API Key.
2. **Installation**:
   ```bash
   npm install
   ```
3. **Environment**: Ensure `process.env.API_KEY` is set for the Gemini AI features.
4. **Execution**:
   ```bash
   npm start
   ```

## Model Architecture
- **Input**: 128x128x1 MRI Image
- **CNN Layers**: 4 Convolutional blocks with Max Pooling
- **Dense Layers**: 256 units with Dropout (0.5)
- **Output**: Softmax (4 classes)

## Repository Structure
- `src/`: React Frontend components and logic.
- `backend/`: Python source code for prediction API.
- `ml/`: Training scripts and model architectures.
