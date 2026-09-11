import { fetchPredictionData } from '../lib/api';

export type SustainabilityData = {
  totalEnergyGenerated: number;
  co2Saved: number;
  renewableContribution: number;
  gridEfficiency: number;
};

export type PredictionData = {
  expectedSolarOutput: number;
  windPotential: number;
  batteryChargingEstimate: number;
  carbonReductionScore: number;
};

export async function fetchPredictionData() {
  return {
    expectedSolarOutput: 82,
    windPotential: 64,
    batteryChargingEstimate: 78,
    carbonReductionScore: 91,
  } as PredictionData;
}

export async function fetchSustainabilityData() {
  return (await fetchSustainabilityData()) as SustainabilityData;
}