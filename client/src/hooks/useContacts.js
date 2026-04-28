import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from '../services/contact';

export const useContacts = (page = 1, limit = 5) => {
    return useQuery({
        queryKey: ['contacts', page, limit],
        queryFn: () => fetchContacts(page, limit),
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
        retry: 1,
        onError: (error) => console.error('Failed to fetch contacts:', error),
    });
};
