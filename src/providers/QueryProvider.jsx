import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a single QueryClient shared across the app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 minutes — data considered fresh
      retry: 1,                    // retry failed requests once
      refetchOnWindowFocus: false, // don't auto-refetch on tab focus
    },
  },
});

/**
 * QueryProvider
 * Wrap the entire app with this so every component can use
 * useQuery / useMutation / etc. out of the box.
 */
const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
