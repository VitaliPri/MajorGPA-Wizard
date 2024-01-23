# Major GPA Wizard

A common concern among students is the absence of major GPA information on their transcripts. The Major GPA Wizard is a user-friendly application designed to simplify the process of calculating major GPA from formatted PDF files.

**Website:** [Major GPA Wizard](https://major-gpa-wizard.vercel.app/)

## Key Features

### Automated CS Subject Detection
The application automatically identifies and extracts major CS subjects from uploaded PDFs, streamlining the GPA calculation process.

### GPA Calculation
It computes the total GPA based on the extracted CS subjects, offering a comprehensive overview of academic performance.

## How It Works

1. **File Upload:** Users upload their PDF files through a simple and intuitive interface.
2. **PDF Parsing:** The backend, built with Node.js and Express, uses the "pdfreader" package to efficiently parse PDF content.
3. **Data Filtering:** Parsed data is converted into JSON format, and filtering operations extract necessary information related to CS subjects.
4. **GPA Calculation:** The backend calculates the total GPA based on the extracted CS subjects, providing users with a clear understanding of their academic achievements.

## Technology Stack

### Frontend

- React.js
- Vite.js (for React project setup)

### Backend

- Node.js
- Express.js
- pdfreader (for PDF parsing)
- multer (for file uploading)
- cors (for handling CORS issues)
- dotenv (for managing environment variables)

## Frontend Implementation

The frontend utilizes React and Vite.js for a responsive and interactive user interface, including a header, a file input section, and a result table dynamically appearing after processing the PDF.

## Backend Implementation

Built with Node.js and Express.js, the backend employs the "pdfreader" package for efficient PDF parsing, "multer" middleware for file uploading, and other packages to handle CORS and environment variables.

### Backend Functions

- **parsePdf:** Parses the PDF content and returns the data.
- **API Route:** Accepts the uploaded PDF file and sends it to the parser function.
- **Data Filtering:** Processes the parsed data, filters relevant information, and returns it in JSON format.

## Challenges Faced

- **Frontend PDF Parsing:** Initial attempts to parse PDFs in the frontend using "tesseract.js" OCR faced challenges, resolved by switching to a Node.js backend with the "pdfreader" package.
- **File Upload:** Uploading and handling files on the server posed challenges, streamlined by the use of the "multer" middleware.
- **PDF to Image Conversion:** Exploring PDF to image conversion for OCR posed difficulties initially. Ultimately, the "pdfreader" package emerged as a suitable solution for parsing PDFs directly.
<img width="1255" alt="Screenshot 2024-01-23 at 10 35 46 AM" src="https://github.com/VitaliPri/MajorGPA-Wizard/assets/101225909/ad90e430-c440-4455-a9fc-7364e0960296">

  
