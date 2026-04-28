import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../context/NotificationContext';
import { useConfirmation } from '../context/ConfirmationContext';
import * as agentService from '../services/agents';
import * as campaignService from '../services/campaign';
import * as contactService from '../services/contact';


const useMutationWithNotification = (mutationFn, options = {}) => {
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            const successMessage = data?.message || options.successMessage || 'Operation completed successfully!';
            showNotification(successMessage, 'success');

            if (options.invalidateQueries) {
                options.invalidateQueries.forEach((query) => {
                    queryClient.invalidateQueries({ queryKey: query });
                });
            }

            options.onSuccess?.(data);
        },
        onError: (error) => {
            const errorData = error.response?.data || options.errorMessage || 'Operation failed';
            const errorMessage = errorData?.errors
                ? errorData.errors.join(", ")
                : (errorData?.message || "Failed to add contact");

            showNotification(errorMessage, 'error');
            options.onError?.(error);
        },
    });
};


export const useCreateAgentWithNotification = (options = {}) => {
    return useMutationWithNotification(agentService.createAgent, {
        successMessage: 'Agent created successfully!',
        errorMessage: 'Failed to create agent',
        invalidateQueries: [['agents']],
        ...options,
    });
};

export const useUpdateAgentWithNotification = (options = {}) => {
    return useMutationWithNotification(
        ({ id, data }) => agentService.updateAgent(id, data),
        {
            successMessage: 'Agent updated successfully!',
            errorMessage: 'Failed to update agent',
            invalidateQueries: [['agents']],
            ...options,
        }
    );
};

export const useDeleteAgentWithNotification = (options = {}) => {
    const { showConfirmation } = useConfirmation();
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: agentService.deleteAgent,
        onMutate: async (id) => {
            return new Promise((resolve) => {
                showConfirmation({
                    title: 'Delete Agent',
                    message: 'Are you sure you want to delete this agent? This action cannot be undone.',
                    onConfirm: () => resolve(id),
                });
            });
        },
        onSuccess: (data) => {
            const successMessage = data?.message || 'Agent deleted successfully!';
            showNotification(successMessage, 'success');
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            options.onSuccess?.(data);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to delete agent';
            showNotification(errorMessage, 'error');
            options.onError?.(error);
        },
    });
};


export const useCreateCampaignWithNotification = (options = {}) => {
    return useMutationWithNotification(campaignService.createCampaign, {
        successMessage: 'Campaign created successfully!',
        errorMessage: 'Failed to create campaign',
        invalidateQueries: [['campaigns']],
        ...options,
    });
};

export const useUpdateCampaignWithNotification = (options = {}) => {
    return useMutationWithNotification(
        ({ id, data }) => campaignService.updateCampaign(id, data),
        {
            successMessage: 'Campaign updated successfully!',
            errorMessage: 'Failed to update campaign',
            invalidateQueries: [['campaigns']],
            ...options,
        }
    );
};

export const useDeleteCampaignWithNotification = (options = {}) => {
    const { showConfirmation } = useConfirmation();
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: campaignService.deleteCampaign,
        onMutate: async (id) => {
            return new Promise((resolve) => {
                showConfirmation({
                    title: 'Delete Campaign',
                    message: 'Are you sure you want to delete this campaign? This action cannot be undone.',
                    onConfirm: () => resolve(id),
                });
            });
        },
        onSuccess: (data) => {
            const successMessage = data?.message || 'Campaign deleted successfully!';
            showNotification(successMessage, 'success');
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            options.onSuccess?.(data);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to delete campaign';
            showNotification(errorMessage, 'error');
            options.onError?.(error);
        },
    });
};


export const useCreateContactWithNotification = (options = {}) => {
    return useMutationWithNotification(contactService.addContact, {
        successMessage: 'Contact created successfully!',
        errorMessage: 'Failed to create contact',
        invalidateQueries: [['contacts']],
        ...options,
    });
};

export const useUpdateContactWithNotification = (options = {}) => {
    return useMutationWithNotification(
        ({ id, data }) => contactService.updateContact(id, data),
        {
            successMessage: 'Contact updated successfully!',
            errorMessage: 'Failed to update contact',
            invalidateQueries: [['contacts']],
            ...options,
        }
    );
};

export const useDeleteContactWithNotification = (options = {}) => {
    const { showConfirmation } = useConfirmation();
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: contactService.deleteContact,
        onMutate: async (id) => {
            return new Promise((resolve) => {
                showConfirmation({
                    title: 'Delete Contact',
                    message: 'Are you sure you want to delete this contact? This action cannot be undone.',
                    onConfirm: () => resolve(id),
                });
            });
        },
        onSuccess: (data) => {
            const successMessage = data?.message || 'Contact deleted successfully!';
            showNotification(successMessage, 'success');
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            options.onSuccess?.(data);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to delete contact';
            showNotification(errorMessage, 'error');
            options.onError?.(error);
        },
    });
};
