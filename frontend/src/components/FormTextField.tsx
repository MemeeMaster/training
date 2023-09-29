import { ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface FormTextFieldProps {
  label: string;
  type: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  marginTop?: number;
}

const FormTextField = ({
  label,
  type,
  id,
  onChange,
  value,
  marginTop = 0,
}: FormTextFieldProps) => {
  return (
    <TextField
      label={label}
      type={type}
      id={id}
      onChange={onChange}
      value={value}
      sx={{ marginTop: marginTop }}
    />
  );
};

export default FormTextField;
