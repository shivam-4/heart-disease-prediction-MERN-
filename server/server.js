const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors'); // Import cors package

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Column names based on the model's feature names
const requiredColumns = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
    'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
];

// Root endpoint
app.get("/", (req, res) => {
    res.send("Jai Shree Sita Ram, Jai Bajrang Bali Maharaj ki, Jai Baba Neem Karoli Maharaj ki");
});

// Endpoint for prediction
app.post('/predict', (req, res) => {
    const inputData = req.body;

    // Validate input data
    const missingColumns = requiredColumns.filter(col => !(col in inputData));
    if (missingColumns.length > 0) {
        return res.status(400).send({
            error: 'Missing required input fields',
            missingColumns,
        });
    }

    // Prepare arguments for the Python script
    const args = [
        inputData.age, inputData.sex, inputData.cp, inputData.trestbps,
        inputData.chol, inputData.fbs, inputData.restecg, inputData.thalach,
        inputData.exang, inputData.oldpeak, inputData.slope, inputData.ca, inputData.thal
    ];

    // Spawn a child process to run the Python script
    const pythonProcess = spawn('python3', ['./predict.py', ...args]);

    let output = '';
    let errorOutput = '';

    // Capture the standard output from the Python script
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    // Capture errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    // Handle the close event when the Python process finishes
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            // Send the prediction result to the client
            res.send({ prediction: output.trim() });
        } else {
            // Log the error and send a 500 response
            console.error(`Python script error: ${errorOutput}`);
            res.status(500).send({ error: 'Error running Python script', details: errorOutput });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
