
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
