import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { data: activities, isLoading, error } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activity"]
    });

    if (error) {
        throw new Error("Bookings could not get loaded");
    }

    return { isLoading, activities }

}