import React, { SetStateAction, useEffect, useState, useMemo } from "react";
import { TextField } from "@mui/material";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import "react-dropzone/examples/theme.css";
import { AirlineSeatLegroomExtraOutlined } from "@mui/icons-material";

interface FileUploadProps {
  amount: number;
  setAmount: React.Dispatch<SetStateAction<number>>;
  invoiceNumber: string;
  setInvoiceNumber: React.Dispatch<SetStateAction<string>>;
  customerNumber: string;
  setCustomerNumber: React.Dispatch<SetStateAction<string>>;
  customerName: string;
  setCustomerName: React.Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setRedrawQr: React.Dispatch<SetStateAction<boolean>>;
}

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    onDrop: onDrop,
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    props.setLoading(true);
    handleUpload();
    props.setLoading(false);
  }, [file]);

  function onDrop<T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ): void {
    setFile(null);
    acceptedFiles.forEach((file: React.SetStateAction<File | null>) => {
      setFile(file);
    });
  }

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
      props.setRedrawQr(false);
      props.setAmount(data.amount);
      props.setInvoiceNumber(data.invoiceNumber);
      props.setCustomerNumber(data.customerNumber);
      props.setCustomerName(data.customerName);
      props.setRedrawQr(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    props.setLoading(false);
  }, [props.amount]);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style1 = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style1, className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Rechnung analysieren (pdf)</p>
      </div>

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
