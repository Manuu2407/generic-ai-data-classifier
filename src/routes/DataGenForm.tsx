import React, { useState } from "react";
import "../App.css";
import { FluentSelectField } from "../components/FluentSelectField";

export const DataGenForm: React.FunctionComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

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
            const parsedColumns = Object.keys(sampleData);
            setOptions(parsedColumns); // Update options here
          } catch (error) {
            console.error("Invalid JSON format", error);
          }
        } else if (uploadedFile.name.endsWith(".csv")) {
          const text = e.target?.result as string;
          const csvColumns = text.split("\n")[0].split(",");
          setOptions(csvColumns); // Update options here
        }
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <form className="data-gen-form">
      <label htmlFor="file-upload" className="form-label">
        Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json,.jsonl,.csv"
        onChange={handleFileUpload}
        className="form-input"
      />
      <FluentSelectField options={options} />
    </form>
  );
};
