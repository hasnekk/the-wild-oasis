import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
    let {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ["cabins"], // identifies each data (name of the variable where will the data we fetch be stored => included on all other pages)

        queryFn: getCabins, // query function that queries (fetched) the data from API, Database (MUST RETURN A PROMIS!)
    });

    return { isLoading, error, cabins };
}