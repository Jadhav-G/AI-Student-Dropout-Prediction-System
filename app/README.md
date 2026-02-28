# Backend for Student Dropout GUI

Run the Flask backend (development):

```bash
python -m pip install -r requirements.txt
python server.py
```

Endpoints:
- `POST /predict` — accepts JSON object of features and returns `{success: true, result: {...}}`.

Notes:
- Replace `backend.predict` logic with the model code from your notebook or place a `model.pkl` in this folder.
