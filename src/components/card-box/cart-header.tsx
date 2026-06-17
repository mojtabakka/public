import { Skeleton } from "@mui/material";

interface Props {
    loading: boolean;
}

export default function CartHeader({ loading }: Props) {
    if (loading) {
        return (
            <Skeleton
                variant="text"
                sx={{ fontSize: "2rem" }}
                width={100}
                height={35}
            />
        );
    }

    return (
        <div className="text-sm md:text-base lg:text-lg">
            سبد خرید شما
        </div>
    );
}