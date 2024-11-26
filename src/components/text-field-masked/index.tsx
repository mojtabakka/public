import type { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
    name: string;
};

export default function RHFTextFieldMased({ name, helperText, type, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <InputMask mask="99/99/9999" value={field.value}>
                    {() => <TextField {...field}
                        fullWidth
                        type={type}
                        onChange={(event) => {
                            if (type === 'number') {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
                        }}
                        error={!!error}
                        helperText={error?.message ?? helperText}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                        {...other} />}
                </InputMask>

            )}
        />
    );
}
