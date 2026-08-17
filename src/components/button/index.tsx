import { LoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material";

interface PropsType extends ButtonProps {
    loading?: boolean;
}

export default function MuiButton(props: PropsType) {
    const {
        children,
        loading = false,
        variant = "contained",
        sx,
        ...rest
    } = props;

    return (
        <LoadingButton
            loading={loading}
            variant={variant}
            disableElevation
            sx={{
                borderRadius: "13px",
                px: 3,
                py: 1.3,
                fontWeight: 700,
                textTransform: "none",
                transition: "all .25s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,.08)",

                "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                },

                "&:active": {
                    transform: "scale(.98)",
                },

                ...sx,
            }}
            {...rest}
        >
            {children}
        </LoadingButton>
    );
}