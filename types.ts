import React from 'react';

export enum AlzheimerStage {
  NON_DEMENTED = "Non Demented",
  VERY_MILD = "Very Mild Demented",
  MILD = "Mild Demented",
  MODERATE = "Moderate Demented"
}

export type UserRole = 'ADMIN' | 'CLINICIAN';
export type ViewMode = 'DOCTOR' | 'CARETAKER';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface LoginLog {
  id: string;
  email: string;
  timestamp: string;
  role: UserRole;
  ip: string;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  stage: AlzheimerStage;
  confidence: number;
  imageUrl?: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  history: PredictionResult[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}