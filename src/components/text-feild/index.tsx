import type { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

type Props = TextFieldProps & {
  name: string;
  mask?: string; // Add a mask prop
  textAlign?: string
};

export default function RHFTextField({ textAlign = "center", name, helperText, mask, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Check if a mask is provided
        const { onChange, onBlur, value, ref } = field;

        return mask ? (
          <InputMask
            maskChar=""
            mask={mask}
            value={value || ''}
            onChange={onChange} // Pass onChange directly
            onBlur={onBlur}
            slotProps={{
              input: {
                style: {
                  textAlign: 'left',      // Horizontal center

                },
              },
            }}   // Pass onBlur directly
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                sx={{
                  input: {
                    textAlign: textAlign, // Center text horizontally
                    direction: "ltr"
                  },
                  '& .MuiFormHelperText-root': {
                    textAlign: 'right', // Center helper text
                  },
                }}
                inputRef={ref} // Use react-hook-form's ref
                fullWidth
                type={type}
                dir="rtl"
                className="bg"
                size="small"
                error={!!error}
                helperText={error?.message ?? helperText}
                {...other}
              />
            )}
          </InputMask>
        ) : (
          <TextField
            {...field}
            fullWidth
            type={type}
            dir="rtl"
            className="bg"
            size="small"
            error={!!error}
            helperText={error?.message ?? helperText}
            sx={{
              '& .MuiFormHelperText-root': {
                textAlign: 'right',
                direction: 'rtl',
              },
            }}
            {...other}
          />
        );
      }}
    />
  );
}
