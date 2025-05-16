
import { ButtonProps } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface PropsType extends ButtonProps {
    loading?: boolean; // Prop for controlling loading state
}

export default function MuiButton(props: PropsType) {
const { children, loading = false, variant = "contained", ...rest } = props;
    return (
        <LoadingButton loading={loading} variant={variant} {...rest}>
            {children}
        </LoadingButton>
    );
}
