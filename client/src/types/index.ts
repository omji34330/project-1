// This file defines TypeScript types and interfaces used throughout the application.

export interface WeatherData {
    temperature: number;
    windSpeed: number;
    cloudCover: number;
    humidity: number;
    pressure: number;
}

export interface EnergyPrediction {
    expectedSolarOutput: number;
    windPotential: number;
    batteryChargingEstimate: number;
    carbonReductionScore: number;
}

export interface SustainabilityReport {
    totalEnergyGenerated: number;
    co2Saved: number;
    renewableContribution: number;
    gridEfficiency: number;
}

export interface TeamMember {
    name: string;
    role: string;
    imageUrl?: string; // Optional image URL for team member profile
}