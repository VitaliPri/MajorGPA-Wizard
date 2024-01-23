import React, { useState } from "react";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  //input change handler
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  //file submission handler
  const processPDF = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    setLoading(true);

    try {
      const response = await fetch(
        "https://majorgpa.onrender.com/upload",
        {
          method: "POST",
          body: formData,
          "Content-Type": "application/pdf",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setResult("Error uploading PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error uploading PDF.");
    } finally {
      setLoading(false);
    }
  };

  //calculate total credits
  const getTotalEarnedGPA = () => {
    if (!result) return 0;

    return result.reduce((total, data) => {
      const credits = Math.floor(data?.gpa);
      return total + (credits !== undefined ? credits : 0);
    }, 0);
  };

  //calculating total gpa
  const getTotalGpa = () => {
    if (!result) return 0;

    return result.reduce((total, data) => {
      const credits = Math.floor(data?.gpa);
      return (
        total + (credits !== undefined ? credits * getGradePoint(data?.grd) : 0)
      );
    }, 0);
  };

  //This is a spacial function which return points for each grads.
  const getGradePoint = (grade) => {
    switch (grade) {
      case "A+":
        return 4.0;
      case "A":
        return 4.0;
      case "A-":
        return 3.7;
      case "B+":
        return 3.3;
      case "B":
        return 3.0;
      case "B-":
        return 2.7;
      case "C+":
        return 2.3;
      case " C ":
        return 2.0;
      case "C-":
        return 1.7;
      case "D+":
        return 1.3;
      case "D":
        return 1.0;
      default:
        return 0;
    }
  };

  return (
    <div className="main-box">
      <header className="nav-bg">
        <nav>
          <h3 className="logo-name">Major GPA Calculator</h3>
          <div className="cta-btn">
            <button className="btn">Upload file</button>
          </div>
        </nav>
      </header>
      <main className="main-box-middle" style={{ marginTop: "10pc" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label
            style={{
              textAlign: "start",
              fontSize: "14px",
              color: "white",
            }}
          >
            Please select a .pdf file only
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="btn"
          />
        </div>
        <button onClick={processPDF} disabled={loading} className="btn">
          {loading ? "Loading..." : "Process PDF"}
        </button>

        {result && (
          <div className="result-box" style={{ marginBottom: "10pc" }}>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Earn</th>
                  <th>Grd</th>
                  <th>Total GPA</th>
                </tr>
              </thead>
              <tbody>
                {result?.map((data, i) => (
                  <tr key={i}>
                    <td>{data?.subject}</td>
                    {/* Earn */}
                    <td>{data?.gpa}</td> 
                    <td>{data?.grd}</td>

                    <td>
                      {data?.gpa !== undefined && data?.grd
                        ? `${data?.gpa} x ${getGradePoint(data?.grd)}`
                        : "N/A"}{" "}
                      = {(data?.gpa * getGradePoint(data?.grd)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td> Total Credits: {getTotalEarnedGPA()}</td>
                  <td></td>
                  <td> Total GPA: {getTotalGpa().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <p
              style={{
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Calculated GPA : {getTotalGpa().toFixed(2)} /{" "}
              {getTotalEarnedGPA()} ={" "}
              {(getTotalGpa() / getTotalEarnedGPA()).toFixed(2)}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
