import sys
import pickle
import numpy as np

# Load the saved model
with open("heart.pkl", "rb") as f:
    model = pickle.load(f)

# Get input features
features = list(map(float, sys.argv[1:]))

# Predict
prediction = model.predict([features])[0]

# Output prediction
print(prediction)
