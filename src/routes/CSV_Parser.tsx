import React, { useEffect, useState } from "react";
import "../App.css";
import { FluentSelectField } from "../components/FluentSelectField";
import { FluentFileInputField } from "../components/FluentFileInputField";
import { Button } from "@fluentui/react-components";
import { PreProcessData } from "../types/PreProcessData";

export const CSV_Parser: React.FunctionComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedCustomId, setSelectedCustomId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTextField, setSelectedTextField] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [jsonData, setJsonData] = useState<string[]>([]);

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (uploadedFile.type === "application/json") {
          try {
            const jsonData = JSON.parse(e.target?.result as string);
            setJsonData(jsonData);
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
    const preProcessData: PreProcessData[] = jsonData.map((data: any) => ({
      title: "Placeholder",
      data_type: file?.name.substring(file.name.lastIndexOf(".")) || "",
      body: {
        custom_id: data[selectedCustomId] || undefined,
        category: data[selectedCategory],
        text: data[selectedTextField],
      },
    }));
    fetch("http://127.0.0.1:8000/process/data", {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(preProcessData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  return (
    <form
      className="data-gen-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}>
      <h2>CSV Parser</h2>
      <FluentFileInputField onFileUpload={handleFileUpload} required />
      <FluentSelectField
        label={"Custom-ID"}
        options={options}
        selectedValue={selectedCustomId}
        onChange={(event) => setSelectedCustomId(event.target.value)}
      />
      <FluentSelectField
        label={"Category"}
        options={options}
        selectedValue={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
        required
      />
      <FluentSelectField
        label={"Text-Field"}
        options={options}
        selectedValue={selectedTextField}
        onChange={(event) => setSelectedTextField(event.target.value)}
        required
      />
      <Button type="submit" appearance="primary">
        Process Data
      </Button>
    </form>
  );
};
