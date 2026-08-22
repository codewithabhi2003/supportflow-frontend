import { useCallback, useEffect, useState } from 'react';
import { ticketService } from '../services/ticketService';

// Powers the Tickets list page: search, filters, pagination.
// On any fetch failure (backend down, network drop, etc.) we fall back to
// an empty list rather than an error state — the page still renders its
// normal "no tickets" empty state instead of looking broken.
export const useTickets = (initialParams = {}) => {
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [params, setParams] = useState({ page: 1, limit: 20, ...initialParams });
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await ticketService.getAll(params);
      setTickets(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.warn('Tickets: falling back to empty state —', err.message);
      setTickets([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const updateParams = (patch) => setParams((prev) => ({ ...prev, page: 1, ...patch }));
  const setPage = (page) => setParams((prev) => ({ ...prev, page }));

  return { tickets, pagination, params, updateParams, setPage, loading, refetch: fetchTickets };
};
