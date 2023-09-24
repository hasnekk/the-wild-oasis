import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignUp() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupAPI,

        onSuccess: (data) => {
            console.log(data);
            toast.success("Account successfully created!, PLease verify the new account from the users email addres");
        }
    });

    return { signup, isLoading };
}