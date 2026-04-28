import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotification } from "../context/NotificationContext";
import { getProfile, updateProfile as updateProfileService } from "../services/profile";

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        retry: 1,
    });
};

export const useUpdateProfile = ({ onSuccess } = {}) => {
    const { showNotification } = useNotification();

    return useMutation({
        mutationFn: updateProfileService,
        onSuccess: (data) => {
            showNotification(data.message || "Profile updated successfully", "success");
            onSuccess?.();
        },
        onError: (error) => {
            const errorMessage = error.message || "Failed to update profile";
            showNotification(errorMessage, "error");
        },
    });
};
