import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numOfDays = Number(searchParams.get("last")) || 7;
    const milisecondsAgo = numOfDays * 24 * 60 * 60 * 1000; // days * hoursPerDay * minutesPerHour * secondsPerMinutes * miliSecPerSec

    let currentDate = new Date();
    let startDate = new Date(currentDate - milisecondsAgo);

    const { data: stays, error, isLoading: isLoadingStays } = useQuery({
        queryFn: () => getStaysAfterDate(startDate.toISOString()),
        queryKey: ["stays", `last-${numOfDays}`],
    });


    if (error) throw new Error(error.message);

    const confirmedStays = stays?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out");

    return { stays, isLoadingStays, confirmedStays, numOfDays };
}