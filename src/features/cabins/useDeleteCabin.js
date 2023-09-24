import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// MY SERVICES
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
    const queryClient = useQueryClient(); // gives us access to the queryClient

    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,

        // what heppens when the mutationFn is successful
        onSuccess: () => {
            toast.success(`Cabin successfully deleted`);

            // make the cache unvalid to refetch
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        // what heppens if the mutationFn fails
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCabin };
}

