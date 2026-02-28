



// // ------------------------
// // Backend prediction helper
// // ------------------------
// const BACKEND_URL = "http://localhost:5000";

// async function predictStudent(features) {
//   try {
//     const resp = await fetch(`${BACKEND_URL}/predict`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(features)
//     });
//     const data = await resp.json();
//     if (data && data.success) return data.result;
//     throw new Error(data && data.error ? data.error : "Unknown backend error");
//   } catch (err) {
//     console.error("predictStudent error:", err);
//     return { error: err.message };
//   }
// }

// // If you have a form with id `predict-form`, this will wire it up automatically.
// const predictForm = document.getElementById("predict-form");
// if (predictForm) {
//   predictForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const fd = new FormData(predictForm);
//     const payload = {};
//     for (const [k, v] of fd.entries()) payload[k] = v;
//     const result = await predictStudent(payload);
//     const out = document.getElementById("predict-output");
//     if (out) out.textContent = JSON.stringify(result);
//     else alert(JSON.stringify(result));
//   });
// }




// const API_URL = "https://medical-chatbot-j5p5.onrender.com";

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("chat-form");
//   const input = document.getElementById("question");
//   const chatBox = document.getElementById("chat-box");

//   if (!form || !input || !chatBox) {
//     console.error("HTML IDs missing");
//     return;
//   }

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const question = input.value.trim();
//     if (!question) return;

//     chatBox.innerHTML += `<div><b>You:</b> ${escapeHtml(question)}</div>`;
//     input.value = "";

//     try {
//       const response = await fetch(`${API_URL}/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ question })
//       });

//       if (!response.ok) {
//         throw new Error("HTTP error " + response.status);
//       }

//       const data = await response.json();
//       chatBox.innerHTML += `<div><b>Bot:</b> ${escapeHtml(data.answer)}</div>`;

//     } catch (err) {
//       console.error("FETCH ERROR:", err);
//       chatBox.innerHTML += `<div><b>Bot:</b> Server is not responding. Please try again.</div>`;
//     }
//   });
// });

// function escapeHtml(text) {
//   return text.replace(/[&<>"']/g, m => ({
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': "&quot;",
//     "'": "&#039;"
//   })[m]);
// }





// ===============================
// BACKEND CONFIG
// ===============================
const BACKEND_URL = "http://127.0.0.1:5000";

let lastPrediction = "";

// ===============================
// DROPOUT PREDICTION FORM
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("dropoutForm");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const resultBox = document.getElementById("resultBox");
    const resultTitle = document.getElementById("resultTitle");
    const resultMessage = document.getElementById("resultMessage");

    resultBox.style.display = "block";

    // Collect form data
    const payload = {
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      marital: document.getElementById("marital").value,
      tuition: document.getElementById("tuition").value,
      scholarship: document.getElementById("scholarship").value,
      debtor: document.getElementById("debtor").value,
      sem1: document.getElementById("sem1").value,
      sem2: document.getElementById("sem2").value,
      units1: document.getElementById("units1").value,
      units2: document.getElementById("units2").value,
      motherQ: document.getElementById("motherQ").value,
      fatherQ: document.getElementById("fatherQ").value,
      motherO: document.getElementById("motherO").value,
      fatherO: document.getElementById("fatherO").value
    };

    try {
      const response = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Server returned " + response.status);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Show result
      if (data.prediction == 1) {
        resultBox.className = "result high";
        resultTitle.innerHTML = "⚠ HIGH DROPOUT RISK";
        resultMessage.innerHTML =
          "Student requires academic and financial intervention.";
        lastPrediction = "High Risk";
      } else {
        resultBox.className = "result low";
        resultTitle.innerHTML = "✅ LOW DROPOUT RISK";
        resultMessage.innerHTML =
          "Student shows strong academic stability.";
        lastPrediction = "Low Risk";
      }

    } catch (error) {
      console.error("Prediction Error:", error);

      resultBox.className = "result high";
      resultTitle.innerHTML = "Connection Error";
      resultMessage.innerHTML =
        "Cannot connect to backend server. Make sure Flask is running.";
    }
  });

});


// ===============================
// EXPORT PDF REPORT
// ===============================
async function exportReport() {

  if (lastPrediction === "") {
    alert("Please generate prediction first.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Fetch values
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let marital = document.getElementById("marital").value;

  let tuition = document.getElementById("tuition").value;
  let scholarship = document.getElementById("scholarship").value;
  let debtor = document.getElementById("debtor").value;

  let sem1 = document.getElementById("sem1").value;
  let sem2 = document.getElementById("sem2").value;
  let units1 = document.getElementById("units1").value;
  let units2 = document.getElementById("units2").value;

  let motherQ = document.getElementById("motherQ").value;
  let fatherQ = document.getElementById("fatherQ").value;
  let motherO = document.getElementById("motherO").value;
  let fatherO = document.getElementById("fatherO").value;

  let y = 20;

  doc.setFontSize(18);
  doc.text("Student Dropout Risk Analysis", 105, y, { align: "center" });

  y += 15;
  doc.setFontSize(12);

  doc.text(`Name: ${name}`, 14, y);
  y += 8;
  doc.text(`Age: ${age}`, 14, y);
  y += 8;
  doc.text(`Gender: ${gender}`, 14, y);
  y += 8;
  doc.text(`Marital Status: ${marital}`, 14, y);

  y += 10;
  doc.text(`Tuition Fee Status: ${tuition}`, 14, y);
  y += 8;
  doc.text(`Scholarship Holder: ${scholarship}`, 14, y);
  y += 8;
  doc.text(`Debtor: ${debtor}`, 14, y);

  y += 10;
  doc.text(`Semester 1 Grade: ${sem1}`, 14, y);
  y += 8;
  doc.text(`Semester 2 Grade: ${sem2}`, 14, y);
  y += 8;
  doc.text(`Approved Units (Sem1): ${units1}`, 14, y);
  y += 8;
  doc.text(`Approved Units (Sem2): ${units2}`, 14, y);

  y += 10;
  doc.text(`Mother Qualification: ${motherQ}`, 14, y);
  y += 8;
  doc.text(`Father Qualification: ${fatherQ}`, 14, y);
  y += 8;
  doc.text(`Mother Occupation: ${motherO}`, 14, y);
  y += 8;
  doc.text(`Father Occupation: ${fatherO}`, 14, y);

  y += 15;

  if (lastPrediction === "High Risk") {
    doc.setTextColor(200, 0, 0);
    doc.text("Final Result: HIGH DROPOUT RISK", 14, y);
  } else {
    doc.setTextColor(0, 150, 0);
    doc.text("Final Result: LOW DROPOUT RISK", 14, y);
  }

  doc.setTextColor(0, 0, 0);

  doc.save(name + "_Dropout_Report.pdf");
}


// ===============================
// BACK BUTTON
// ===============================
function goHome() {
  window.location.href = "index.html";
}