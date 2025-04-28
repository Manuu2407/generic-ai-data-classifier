import React, { useState } from "react";
import "../App.css";

export const DataGenForm: React.FunctionComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (uploadedFile.type === "application/json" || uploadedFile.name.endsWith(".jsonl")) {
          try {
            const jsonData = JSON.parse(e.target?.result as string);
            const sampleData = Array.isArray(jsonData) ? jsonData[0] : jsonData;
            setColumns(Object.keys(sampleData));
          } catch (error) {
            console.error("Invalid JSON format", error);
          }
        } else if (uploadedFile.name.endsWith(".csv")) {
          const text = e.target?.result as string;
          const csvColumns = text.split("\n")[0].split(",");
          setColumns(csvColumns);
        }
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="data-gen-form">
      <section className="form-section">
        <div className="form-column">
          <label htmlFor="file-upload" className="form-label">Upload File</label>
          <input
            id="file-upload"
            type="file"
            accept=".json,.jsonl,.csv"
            onChange={handleFileUpload}
            className="form-input"
          />
        </div>
      </section>

      <section className="form-section">
        <div className="form-column">
          <label htmlFor="category-select" className="form-label">Select Category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-select"
          >
            <option value="">-- Select a Category --</option>
            {columns.map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </div>
      </section>
    </div>
  );
};
