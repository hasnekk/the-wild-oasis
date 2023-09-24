import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),

        onSuccess: ({ user }) => {
            queryClient.setQueryData(["user"], user);
            navigate("/dashboard", { replace: true });
        },

        onError: (err) => {
            toast.error("Provided email or password are incorrect!");
        },
    });

    return { isLoading, login }
}