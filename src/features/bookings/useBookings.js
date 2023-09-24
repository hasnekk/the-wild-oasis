// 3-TD PARTY MODULES
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// MY SERVICES
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // FILTER
    const filterBy = searchParams.get("status");
    const filter = !filterBy || filterBy === "all" ? null : { field: "status", value: filterBy, };

    // SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direciton] = sortByRaw.split("-");
    const sortBy = { field, direciton };

    // PAGINATION
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));


    // QUERY
    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, currentPage], // identifies each data (name of the variable where will the data we fetch be stored => included on all other pages)

        queryFn: () => getBookings({ filter, sortBy, currentPage }), // query function that queries (fetched) the data from API, Database (MUST RETURN A PROMIS!)
    });

    // PRE-FETCHING
    let pageCount = Math.ceil(count / PAGE_SIZE);
    if (currentPage < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage + 1],
            queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
        });
    }

    if (currentPage > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage - 1],
            queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
        });
    }


    return { isLoading, error, bookings, count };
}