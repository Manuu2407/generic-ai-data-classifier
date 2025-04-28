import React, { useState } from "react";
import "../App.css";
import { FluentSelectField } from "../components/FluentSelectField";
import { FluentFileInputField } from "../components/FluentFileInputField";
import { Button } from "@fluentui/react-components";

export const DataGenForm: React.FunctionComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedCustomId, setSelectedCustomId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTextField, setSelectedTextField] = useState<string>("");
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
            setOptions(parsedColumns);
          } catch (error) {
            console.error("Invalid JSON format", error);
          }
        } else if (uploadedFile.name.endsWith(".csv")) {
          const text = e.target?.result as string;
          const csvColumns = text.split("\n")[0].split(",");
          setOptions(csvColumns);
        }
      };
      reader.readAsText(uploadedFile);
    }
  };

  function handleFormSubmit(): any {
    throw new Error("Function not implemented.");
  }

  return (
    <form className="data-gen-form">
      <FluentFileInputField onFileUpload={handleFileUpload} required/>
      <FluentSelectField label={"Custom-ID"} options={options} selectedValue={selectedCustomId} onChange={(event) => setSelectedCustomId(event.target.value)} required/>
      <FluentSelectField label={"Category"} options={options} selectedValue={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} required/>
      <FluentSelectField label={"Text-Field"} options={options} selectedValue={selectedTextField} onChange={(event) => setSelectedTextField(event.target.value)} required/>
      <Button type="submit" appearance="primary" onSubmit={handleFormSubmit}>Process Data</Button>
    </form>
  );
};
