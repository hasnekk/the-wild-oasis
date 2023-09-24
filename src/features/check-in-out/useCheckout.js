import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-out",
        }),

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`, {
                duration: 2000,
            });
            queryClient.invalidateQueries({
                active: true,
            });
            navigate("/");
        },

        onError: (err) => {
            console.log(err);
            toast.error("There was an error while checking out 😥", {
                duration: 4000,
            });
        },
    });

    return { checkout, isCheckingOut };
}