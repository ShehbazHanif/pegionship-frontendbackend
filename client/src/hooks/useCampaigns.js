import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCampaigns, fetchCampaignById, createCampaign, updateCampaign, deleteCampaign } from '../services/campaign';

export const useCampaigns = () => {
    return useQuery({
        queryKey: ['campaigns'],
        queryFn: fetchCampaigns,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        onError: (error) => console.error('Failed to fetch campaigns:', error),
    });
};

export const useCampaign = (id) => {
    return useQuery({
        queryKey: ['campaigns', id],
        queryFn: () => fetchCampaignById(id),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        onError: (error) => console.error('Failed to fetch campaign:', error),
        enabled: !!id,
    });
};

export const useCreateCampaign = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        },
        onError: (error) => console.error('Failed to create campaign:', error),
    });
};

export const useUpdateCampaign = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateCampaign(id, data),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ['campaigns', id] });
        },
        onError: (error) => console.error('Failed to update campaign:', error),
    });
};

export const useDeleteCampaign = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        },
        onError: (error) => console.error('Failed to delete campaign:', error),
    });
};
