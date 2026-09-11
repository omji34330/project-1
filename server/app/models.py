from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class WeatherData(Base):
    __tablename__ = 'weather_data'

    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float, nullable=False)
    wind_speed = Column(Float, nullable=False)
    cloud_cover = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    pressure = Column(Float, nullable=False)

class EnergyPrediction(Base):
    __tablename__ = 'energy_prediction'

    id = Column(Integer, primary_key=True, index=True)
    expected_solar_output = Column(Float, nullable=False)
    wind_potential = Column(Float, nullable=False)
    battery_charging_estimate = Column(Float, nullable=False)
    carbon_reduction_score = Column(Float, nullable=False)

class SustainabilityReport(Base):
    __tablename__ = 'sustainability_report'

    id = Column(Integer, primary_key=True, index=True)
    total_energy_generated = Column(Float, nullable=False)
    co2_saved = Column(Float, nullable=False)
    renewable_contribution = Column(Float, nullable=False)
    grid_efficiency = Column(Float, nullable=False)