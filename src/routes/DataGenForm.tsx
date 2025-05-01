import React, { useState } from "react";
import "../App.css";
import { FluentSelectField } from "../components/FluentSelectField";
import { FluentFileInputField } from "../components/FluentFileInputField";
import { Button } from "@fluentui/react-components";
import { PreProcessData } from "../types/PreProcessData";
import { FluentTextInputField } from "../components/FluentTextInputField";
import { FluentDialog } from "../components/FluentDialog";

export const DataGenForm: React.FunctionComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedCustomId, setSelectedCustomId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTextField, setSelectedTextField] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [jsonData, setJsonData] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBatchProcessStarted, setIsBatchProcessStarted] = useState(false);
  const [isPrepared, setIsPrepared] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

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

  function startBatchProcess(): void {
    setIsPrepared(false);
    setIsLoading(true);
    fetch(`http://localhost:8000/batch_input/${title}`, {
      method: "GET",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Batch process started successfully!");
          setIsBatchProcessStarted(true);
        }
      })
      .catch((error) => {
        console.error("Error starting batch process:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleFormSubmit(): any {
    const preProcessData: PreProcessData[] = jsonData.map((data: any) => ({
      title: title,
      data_type: file?.name.substring(file.name.lastIndexOf(".") + 1) || "",
      body: {
        custom_id: data[selectedCustomId] || undefined,
        category: data[selectedCategory],
        text: data[selectedTextField],
      },
    }));

    setIsDialogOpen(true);
    setIsLoading(true);
    setError(null);
    setResponseStatus(undefined);
    setIsBatchProcessStarted(false);
    setIsPrepared(false);

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
        return response.status;
      })
      .then((status) => {
        setResponseStatus(status);
        if (status === 200) setIsPrepared(true);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form
      className="data-gen-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}>
      <FluentFileInputField
        onFileUpload={handleFileUpload}
        required
      />
      <FluentTextInputField
        label={"Title"}
        inputValue={title}
        onChange={(event) => setTitle(event.target.value)}
      />
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
      <Button
        type="submit"
        appearance="primary">
        Process Data
      </Button>
      <FluentDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
        isLoading={isLoading}
        responseStatus={responseStatus}
        error={error}
        onStartBatchProcess={startBatchProcess}
        isBatchProcessStarted={isBatchProcessStarted}
        isPrepared={isPrepared}
      />
    </form>
  );
};
