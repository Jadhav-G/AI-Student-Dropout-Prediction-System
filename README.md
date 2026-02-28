# AI Student Dropout Prediction System

## 1. Project Overview
The AI Student Dropout Prediction System is a web-based application designed to predict the risk of student dropout using academic, financial, and family background information.
The system allows users to enter student details and instantly generates a prediction showing whether the student has a high risk or low risk of dropping out. 
This project demonstrates the use of Artificial Intelligence concepts, frontend web development, and report generation in a real-world educational problem.

## 2. Objective of the Project
The main objective of this project is to identify students who are at risk of dropping out at an early stage so that proper academic support, counseling, and financial help can be provided. 
By predicting dropout risk, educational institutions can improve student success rate and reduce dropout percentage.

## 3. Technologies Used
This project is developed using HTML, CSS, and JavaScript for the frontend interface. The design uses modern UI with gradient colors and glass effect styling. 
The system also uses the jsPDF library to generate downloadable reports. The project structure is simple and can be integrated with Python or Machine Learning models in the future.

## 4. Features of the System
The system provides a modern and user-friendly interface where users can fill student information including personal details, academic performance, financial status, and family background.
After submitting the form, the system predicts dropout risk and displays the result instantly. The user can also export the prediction report in PDF format. 
The system also includes navigation buttons, styled dashboard, and responsive layout.

## 5. Prediction Logic
The current prediction logic is based on academic performance. The system calculates the average of the first and second semester grades. If the average grade is below a certain value,
the system shows High Dropout Risk, otherwise it shows Low Dropout Risk. This logic can be replaced with Machine Learning models in future versions.

## 6. Report Generation
The system allows the user to export the prediction result as a PDF report. The report contains student information, academic details, financial status, parental background, 
and AI risk prediction. 

## 7. How to Run the Project
Download the project files and open the folder in your computer. Open the HTML file in any web browser such as Chrome or Edge. Fill the student information form and click on Predict Dropout Risk to see the result. Click on Export Report to download the PDF report.

## ✅ Steps to Clone This Project (Short)

## Repository on GitHub

## Copy repo link

https://github.com/Jadhav-G/AI-Student-Dropout-Prediction-System.git

## Open Terminal / PowerShell

## Run clone command

git clone https://github.com/Jadhav-G/AI-Student-Dropout-Prediction-System.git

## Go to project folder

cd AI-Student-Dropout-Prediction-System

## Create virtual environment

python -m venv .venv

.venv\Scripts\activate

## Install libraries

pip install -r requirements.txt

## Run project

python app.py

## 9. Author
## Copyright © Ganesh Jadhav

This AI / ML-based Student Dropout Prediction System is designed and developed by Ganesh Jadhav using machine learning models and data analysis techniques.
