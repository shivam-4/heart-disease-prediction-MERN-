export interface FormData {
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
}

export const initialFormData: FormData = {
  age: 55,
  sex: 1,
  cp: 3,
  trestbps: 100,
  chol: 100,
  fbs: 0,
  restecg: 1,
  thalach: 100,
  exang: 0,
  oldpeak: 1.5,
  slope: 2,
  ca: 1,
  thal: 2
};