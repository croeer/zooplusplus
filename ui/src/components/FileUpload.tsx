import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

interface Props {}

const FileUpload: React.FC<Props> = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("FormFile", file);
    formData.append("FileName", file.name);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/invoices/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        accept="application/pdf"
        id="contained-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      {file && (
        <>
          <TextField
            label="Selected PDF file"
            value={file.name}
            variant="outlined"
            fullWidth
            disabled
          />
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload to API
          </Button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
