import React from 'react';
import { AlzheimerStage } from './types';

export const STAGE_COLORS: Record<AlzheimerStage, string> = {
  [AlzheimerStage.NON_DEMENTED]: "#10b981", // Emerald
  [AlzheimerStage.VERY_MILD]: "#fbbf24",    // Amber
  [AlzheimerStage.MILD]: "#f59e0b",         // Orange
  [AlzheimerStage.MODERATE]: "#ef4444",     // Red
};

export const STAGE_DESCRIPTIONS: Record<AlzheimerStage, string> = {
  [AlzheimerStage.NON_DEMENTED]: "No cognitive decline detected. Normal brain function.",
  [AlzheimerStage.VERY_MILD]: "Initial signs of memory loss. Often mistaken for normal aging.",
  [AlzheimerStage.MILD]: "Clear difficulties in daily tasks, planning, and memory retrieval.",
  [AlzheimerStage.MODERATE]: "Significant cognitive impairment requiring assistance for daily activities.",
};

export const AI_EXPLANATIONS: Record<AlzheimerStage, { regions: string[]; reason: string; guidance: string }> = {
  [AlzheimerStage.NON_DEMENTED]: {
    regions: ["Hippocampus", "Cerebral Cortex"],
    reason: "Pixel intensity and voxel volumes align with healthy clinical benchmarks. No significant atrophy detected.",
    guidance: "Continue healthy lifestyle habits. Regular cognitive exercises are recommended for maintenance."
  },
  [AlzheimerStage.VERY_MILD]: {
    regions: ["Hippocampus", "Entorhinal Cortex"],
    reason: "Minor ventricular enlargement and subtle hippocampal volume loss detected compared to normative data.",
    guidance: "Begin tracking daily memory events. Establish a routine and simplify complex tasks."
  },
  [AlzheimerStage.MILD]: {
    regions: ["Temporal Lobe", "Parietal Lobe"],
    reason: "Noticeable cortical thinning and significant widening of sulci. Atrophy patterns match MCI benchmarks.",
    guidance: "Label household items, set medication reminders, and ensure a safe, organized living environment."
  },
  [AlzheimerStage.MODERATE]: {
    regions: ["Frontal Lobe", "Temporal Lobe", "Amygdala"],
    reason: "Widespread gray matter loss and extreme enlargement of brain ventricles. Severe neural pathway disruption indicated.",
    guidance: "Full-time supervision may be necessary. Prioritize emotional comfort and basic daily assistance."
  }
};

export const calculateCognitiveScore = (stage: AlzheimerStage, confidence: number): number => {
  const baseScores = {
    [AlzheimerStage.NON_DEMENTED]: 95,
    [AlzheimerStage.VERY_MILD]: 75,
    [AlzheimerStage.MILD]: 50,
    [AlzheimerStage.MODERATE]: 25
  };
  const base = baseScores[stage];
  // Add some variability based on confidence
  return Math.min(100, Math.max(0, Math.round(base + (confidence - 0.9) * 10)));
};