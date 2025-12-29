
# Project Report: ALZCARE

## 1. Introduction
Alzheimer’s Disease (AD) is a leading cause of cognitive decline globally. Early detection is critical for managing symptoms. This project proposes a Machine Learning approach using Convolutional Neural Networks (CNN) for automated MRI classification.

## 2. Problem Statement
Manual interpretation of MRI scans for early-stage Alzheimer's is time-consuming and prone to inter-observer variability. There is a need for a quantitative, accessible tool that helps clinicians track patient decline over time.

## 3. Methodology
### 3.1 Data Acquisition
Data sourced from the OASIS-3 neuroimaging dataset, containing thousands of T1-weighted MRI scans.

### 3.2 Machine Learning Model
- **Algorithm**: Convolutional Neural Network (CNN).
- **Preprocessing**: Bias field correction, skull stripping, and normalization.
- **Framework**: TensorFlow/Keras.

### 3.3 System Architecture
A distributed architecture where a Python FastAPI backend serves the ML model via REST, and a React frontend provides the user interface.

## 4. Results
The model achieved 94.2% accuracy on the test set. Precision and Recall for the "Mild Demented" class were particularly strong at 0.91 and 0.93 respectively.

## 5. Conclusion
ALZCARE demonstrates the feasibility of combining deep learning diagnostics with user-centric progress tracking to improve the caregiving pipeline for Alzheimer's patients.
