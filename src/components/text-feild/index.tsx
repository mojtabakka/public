import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

type Props = TextFieldProps & {
  name: string;
  mask?: string;
  textAlign?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export default function RHFTextField({
  textAlign = "center",
  name,
  helperText,
  mask,
  type,
  inputMode,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, onBlur, value, ref } = field;

        if (mask) {
          return (
            <InputMask
              mask={mask}
              maskChar=""
              value={value || ""}
              onChange={onChange}
              onBlur={onBlur}
            >
              {(inputProps: any) => (
                <TextField
                  {...inputProps}
                  inputRef={ref}
                  fullWidth
                  type={type}
                  dir="rtl"
                  size="small"
                  error={!!error}
                  helperText={error?.message ?? helperText}
                  inputProps={{
                    ...inputProps.inputProps,
                    inputMode,
                  }}
                  sx={{
                    input: {
                      textAlign,
                      direction: "ltr",
                    },
                    "& .MuiFormHelperText-root": {
                      textAlign: "right",
                      direction: "rtl",
                    },
                  }}
                  {...other}
                />
              )}
            </InputMask>
          );
        }

        return (
          <TextField
            {...field}
            inputRef={ref}
            fullWidth
            type={type}
            dir="rtl"
            size="small"
            error={!!error}
            helperText={error?.message ?? helperText}
            inputProps={{
              inputMode,
            }}
            sx={{
              input: {
                textAlign,
              },
              "& .MuiFormHelperText-root": {
                textAlign: "right",
                direction: "rtl",
              },
            }}
            {...other}
          />
        );
      }}
    />
  );
}