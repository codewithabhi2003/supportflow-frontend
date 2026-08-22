import { useCallback, useEffect, useState } from 'react';
import { ticketService } from '../services/ticketService';

const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 120000; // 2 minutes

// Loads a single ticket and polls while AI analysis is pending.
// Cleans up its interval/timeout on unmount or ticketId change — see
// CRITICAL DEVELOPER NOTES #2 in the project spec for why this matters.
//
// Distinguishes a genuine 404 ("this ticket doesn't exist") from a network
// failure ("we couldn't reach the backend") so the page can show the right
// message instead of treating a backend hiccup as a missing ticket.
export const useTicketDetail = (ticketId) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [unreachable, setUnreachable] = useState(false);
  const [aiTimedOut, setAiTimedOut] = useState(false);

  const fetchTicket = useCallback(async () => {
    try {
      const res = await ticketService.getById(ticketId);
      setTicket(res.data.data);
      setNotFound(false);
      setUnreachable(false);
      return res.data.data;
    } catch (err) {
      if (err.status === 404) {
        setNotFound(true);
        setUnreachable(false);
      } else {
        // Network error or any non-404 failure — don't claim the ticket
        // is missing, just flag that we can't reach it right now.
        setUnreachable(true);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    setLoading(true);
    setAiTimedOut(false);
    setNotFound(false);
    setUnreachable(false);
    fetchTicket();
  }, [ticketId, fetchTicket]);

  useEffect(() => {
    if (!ticket || ticket.aiAnalyzed) return;

    const interval = setInterval(fetchTicket, POLL_INTERVAL_MS);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setAiTimedOut(true);
    }, POLL_TIMEOUT_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket?.aiAnalyzed, fetchTicket]);

  const triggerAnalysis = async () => {
    setAiTimedOut(false);
    await ticketService.triggerAnalysis(ticketId);
    await fetchTicket();
  };

  const updateStatus = async (status) => {
    await ticketService.updateStatus(ticketId, status);
    await fetchTicket();
  };

  const addNote = async (noteText) => {
    await ticketService.addNote(ticketId, noteText);
    await fetchTicket();
  };

  return {
    ticket,
    loading,
    notFound,
    unreachable,
    aiTimedOut,
    refetch: fetchTicket,
    triggerAnalysis,
    updateStatus,
    addNote,
  };
};
