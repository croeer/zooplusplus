import React, {
  SetStateAction,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Button, IconButton, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

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
    handleUpload();
  }, [file]);

  function onDrop<T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ): void {
    acceptedFiles.forEach((file: React.SetStateAction<File | null>) => {
      setFile(file);
      handleUpload();
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
      props.setAmount(data.amount);
      props.setInvoiceNumber(data.invoiceNumber);
      props.setCustomerNumber(data.customerNumber);
      props.setCustomerName(data.customerName);
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
    <div>
      <section className="container">
        <div {...getRootProps({ style1 })}>
          <input {...getInputProps()} />
          <p>Rechnung analysieren (pdf)</p>
        </div>
      </section>

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
