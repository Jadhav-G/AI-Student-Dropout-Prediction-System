# import os
# import pickle
# import numpy as np
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# # --------------------------------------------------
# # Create Flask App
# # --------------------------------------------------
# app = Flask(__name__)
# CORS(app)  # allow frontend to connect

# # --------------------------------------------------
# # Load Trained Model
# # --------------------------------------------------

# MODEL_PATH = os.path.join(os.path.dirname(__file__), "student_dropout_model.pkl")

# model = joblib.load(MODEL_PATH)
# print("✅ Model Loaded Successfully")
# # --------------------------------------------------
# # Home Route (Test if server running)
# # --------------------------------------------------
# @app.route("/")
# def home():
#     return "Student Dropout Prediction API is Running 🚀"

# # --------------------------------------------------
# # Prediction Route
# # --------------------------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json

#         # 🔹 IMPORTANT:
#         # Replace these feature names with YOUR actual model features
#         study_hours = float(data["study_hours"])
#         attendance = float(data["attendance"])
#         previous_grade = float(data["previous_grade"])

#         # Create input array (order must match training order)
#         input_data = np.array([[study_hours, attendance, previous_grade]])

#         prediction = model.predict(input_data)[0]

#         # Convert numeric prediction to label
#         if prediction == 1:
#             result = "High Dropout Risk"
#         else:
#             result = "Low Dropout Risk"

#         return jsonify({
#             "prediction": int(prediction),
#             "result": result
#         })

#     except Exception as e:
#         return jsonify({
#             "error": str(e)
#         })

# # --------------------------------------------------
# # Run Server
# # --------------------------------------------------
# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5000)



# import os
# import numpy as np
# import joblib
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# # --------------------------------------------------
# # Create Flask App
# # --------------------------------------------------
# app = Flask(__name__)
# CORS(app)

# # --------------------------------------------------
# # Load Trained Model
# # --------------------------------------------------
# MODEL_PATH = os.path.join(os.path.dirname(__file__), "student_dropout_model.pkl")

# model = joblib.load(MODEL_PATH)
# print("✅ Model Loaded Successfully")


# # --------------------------------------------------
# # Helper: Convert Categorical to Numeric
# # --------------------------------------------------
# def encode_inputs(data):

#     # Example encoding (MUST match your training encoding)

#     gender_map = {"Male": 0, "Female": 1, "Other": 2}
#     marital_map = {"Single": 0, "Married": 1, "Divorced": 2}
#     yes_no_map = {"Yes": 1, "No": 0}

#     qualification_map = {
#         "Primary": 0,
#         "Secondary": 1,
#         "Graduate": 2,
#         "Postgraduate": 3
#     }

#     occupation_map = {
#         "Unemployed": 0,
#         "Private Job": 1,
#         "Government Job": 2,
#         "Business": 3
#     }

#     return [
#         float(data["age"]),
#         gender_map.get(data["gender"], 0),
#         marital_map.get(data["marital"], 0),
#         yes_no_map.get(data["tuition"], 0),
#         yes_no_map.get(data["scholarship"], 0),
#         yes_no_map.get(data["debtor"], 0),
#         float(data["sem1"]),
#         float(data["sem2"]),
#         float(data["units1"]),
#         float(data["units2"]),
#         qualification_map.get(data["motherQ"], 0),
#         qualification_map.get(data["fatherQ"], 0),
#         occupation_map.get(data["motherO"], 0),
#         occupation_map.get(data["fatherO"], 0)
#     ]


# # --------------------------------------------------
# # Home Route
# # --------------------------------------------------
# @app.route("/")
# def home():
#     return "🚀 Student Dropout Prediction API Running"


# # --------------------------------------------------
# # Prediction Route
# # --------------------------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json

#         encoded_features = encode_inputs(data)

#         input_array = np.array([encoded_features])

#         prediction = model.predict(input_array)[0]

#         result_text = "High Dropout Risk" if prediction == 1 else "Low Dropout Risk"

#         return jsonify({
#             "prediction": int(prediction),
#             "result": result_text
#         })

#     except Exception as e:
#         return jsonify({
#             "error": str(e)
#         })


# # --------------------------------------------------
# # Run Server
# # --------------------------------------------------
# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5000)




import os
import numpy as np
import joblib
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

PARENT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))

MODEL_PATH = os.path.join(BASE_DIR, "student_dropout_model.pkl")
model = joblib.load(MODEL_PATH)
print("✅ Model Loaded Successfully")


@app.route("/")
def home():
    return send_from_directory(PARENT_DIR, "index.html")

@app.route("/chat")
def chat():
    return send_from_directory(PARENT_DIR, "chat.html")

@app.route("/login")
def login():
    return send_from_directory(PARENT_DIR, "login.html")

@app.route("/signup")
def signup():
    return send_from_directory(PARENT_DIR, "signup.html")



@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(PARENT_DIR, filename)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        gender = 1 if data["gender"].lower() == "male" else 0
        marital_status = 1 if data["marital_status"].lower() == "married" else 0
        tuition = 1 if data["tuition"].lower() == "yes" else 0
        scholarship = 1 if data["scholarship"].lower() == "yes" else 0
        debtor = 1 if data["debtor"].lower() == "yes" else 0

        features = [
            float(data["age"]),
            gender,
            marital_status,
            tuition,
            scholarship,
            debtor,
            float(data["sem1_grade"]),
            float(data["sem2_grade"]),
            float(data["units1"]),
            float(data["units2"]),
            float(data["mother_qualification"]),
            float(data["father_qualification"]),
            float(data["mother_occupation"]),
            float(data["father_occupation"])
        ]

        input_array = np.array([features])
        prediction = model.predict(input_array)[0]

        result = "High Dropout Risk" if prediction == 1 else "Low Dropout Risk"

        return jsonify({
            "prediction": int(prediction),
            "result": result
        })

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)