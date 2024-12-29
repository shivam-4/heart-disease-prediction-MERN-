import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import FormField from './FormField';
import { FormData, initialFormData } from './FormData';
import { formOptions } from './FormOptions';

export default function HeartDiseaseForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [prediction, setPrediction] = useState<string | null>(null); // State to hold prediction result

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert form data to the shape expected by the API (if needed)
    const payload = {
      age: formData.age,
      sex: formData.sex,
      cp: formData.cp,
      trestbps: formData.trestbps,
      chol: formData.chol,
      fbs: formData.fbs,
      restecg: formData.restecg,
      thalach: formData.thalach,
      exang: formData.exang,
      oldpeak: formData.oldpeak,
      slope: formData.slope,
      ca: formData.ca,
      thal: formData.thal,
    };

    try {
      const response = await fetch('https://heart-disease-prediction-mern.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction); // Assuming the response contains a 'prediction' field
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 px-4 py-6 md:p-6">
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8 backdrop-blur-lg bg-white/20 rounded-2xl shadow-xl border border-white/30">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            Heart Disease Prediction
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <FormField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <FormField
            label="Sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            type="select"
            options={formOptions.sex}
          />

          <FormField
            label="Chest Pain Type"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            type="select"
            options={formOptions.cp}
          />

          <FormField
            label="Resting Blood Pressure"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
          />

          <FormField
            label="Cholesterol"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
          />

          <FormField
            label="Fasting Blood Sugar"
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
            type="select"
            options={formOptions.fbs}
          />

          <FormField
            label="Resting ECG"
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
            type="select"
            options={formOptions.restecg}
          />

          <FormField
            label="Max Heart Rate"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
          />

          <FormField
            label="Exercise Induced Angina"
            name="exang"
            value={formData.exang}
            onChange={handleChange}
            type="select"
            options={formOptions.exang}
          />

          <FormField
            label="ST Depression"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            step="0.1"
          />

          <FormField
            label="Slope"
            name="slope"
            value={formData.slope}
            onChange={handleChange}
            type="select"
            options={formOptions.slope}
          />

          <FormField
            label="Number of Vessels"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
            type="select"
            options={formOptions.ca}
          />

          <FormField
            label="Thalassemia"
            name="thal"
            value={formData.thal}
            onChange={handleChange}
            type="select"
            options={formOptions.thal}
          />

          <div className="col-span-full flex justify-center mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                       text-white text-sm md:text-base rounded-lg font-semibold shadow-lg 
                       hover:from-purple-700 hover:to-pink-700 transition-all duration-300 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Predict
            </button>
          </div>
        </form>

        {/* Display prediction */}
        {prediction && (
          <div className="mt-6 text-center text-xl text-white">
            <h2>Prediction: {prediction === "1" ? "Heart Disease Likely" : "No Heart Disease"}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
