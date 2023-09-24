import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

export function useBooking() {
    const { bookingId } = useParams();

    let {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ["booking", bookingId], // identifies each data (name of the variable where will the data we fetch be stored => included on all other pages)

        queryFn: () => getBooking(bookingId), // query function that queries (fetched) the data from API, Database (MUST RETURN A PROMIS!)
    });

    return { isLoading, error, booking };
}