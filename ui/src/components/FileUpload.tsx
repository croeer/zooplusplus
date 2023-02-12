import React, { SetStateAction, useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadProps {
  amount: number;
  setAmount: React.Dispatch<SetStateAction<number>>;
  invoiceNumber: string;
  setInvoiceNumber: React.Dispatch<SetStateAction<string>>;
  customerNumber: string;
  setCustomerNumber: React.Dispatch<SetStateAction<string>>;
}

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    handleUpload();
  };

  useEffect(() => {
    handleUpload();
  }, [file]);

  const handleUpload = async () => {
    if (!file) {
      console.log("No file found");
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
      props.setAmount(data.amount);
      props.setInvoiceNumber(data.invoiceNumber);
      props.setCustomerNumber(data.customerNumber);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<CloudUploadIcon />}
        component="label"
      >
        Upload pdf
        <input
          hidden
          accept="application/pdf"
          type="file"
          onChange={handleFileChange}
        />
      </Button>
      {file && (
        <>
          <TextField
            label="Selected PDF file"
            value={file.name}
            variant="outlined"
            fullWidth
            disabled
          />
        </>
      )}
    </div>
  );
};

export default FileUpload;
