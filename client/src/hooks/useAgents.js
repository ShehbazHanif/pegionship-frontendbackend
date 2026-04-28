import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAgents, fetchAgentById, createAgent, updateAgent, deleteAgent } from '../services/agents';

export const useAgents = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ['agents', page, limit],
        queryFn: () => fetchAgents(page, limit),
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
        retry: 1,
        onError: (error) => console.error('Failed to fetch agents:', error),
    });
};

export const useAgent = (id) => {
    return useQuery({
        queryKey: ['agent', id],
        queryFn: () => fetchAgentById(id),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        onError: (error) => console.error('Failed to fetch agent:', error),
        enabled: !!id,
    });
};

export const useCreateAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
        onError: (error) => console.error('Failed to create agent:', error),
    });
};

export const useUpdateAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateAgent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
        onError: (error) => console.error('Failed to update agent:', error),
    });
};

export const useDeleteAgent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
        onError: (error) => console.error('Failed to delete agent:', error),
    });
};
