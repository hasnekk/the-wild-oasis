import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useEditCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ cabinData, id }) => createEditCabin(cabinData, id),

        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },

        onError: (err) => toast.error(err),
    });

    return { isEditing, editCabin };
}