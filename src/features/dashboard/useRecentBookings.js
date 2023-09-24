import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const filterBy = Number(searchParams.get("last")) || 7;
    const milisecondsAgo = filterBy * 24 * 60 * 60 * 1000; // days * hoursPerDay * minutesPerHour * secondsPerMinutes * miliSecPerSec

    let currentDate = new Date();
    let startDate = new Date(currentDate - milisecondsAgo);

    const { data: bookings, error, isLoading: isLoadingBookings } = useQuery({
        queryFn: () => getBookingsAfterDate(startDate.toISOString()),
        queryKey: ["bookings", `last-${filterBy}`],
    });

    if (error) throw new Error(error.message);

    return { bookings, isLoadingBookings };
}