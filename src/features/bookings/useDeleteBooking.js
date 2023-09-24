import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteABooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn: (bookingId) => deleteABooking(bookingId),

        onSuccess: () => {
            toast.success(`Booking successfully deleted`, {
                duration: 2000,
            });
            queryClient.invalidateQueries({
                active: true,
            });
            navigate("/");
        },

        onError: (err) => {
            console.log(err);
            toast.error("There was an error deleteing the booking 😥", {
                duration: 4000,
            });
        },
    });

    return { deleteBooking, isDeleting };
}