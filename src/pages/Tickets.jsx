import { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import TicketTable from '../components/tickets/TicketTable';
import CreateTicketModal from '../components/tickets/CreateTicketModal';
import SearchInput from '../components/common/SearchInput';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import { useTickets } from '../hooks/useTickets';
import { STATUSES, PRIORITIES, CATEGORIES } from '../utils/statusColors';

export default function Tickets() {
  const { tickets, pagination, updateParams, params, setPage, loading, refetch } = useTickets();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TopBar
        title="Tickets"
        subtitle={pagination ? `${pagination.total} total` : undefined}
        actions={<Button onClick={() => setModalOpen(true)}>+ Create Ticket</Button>}
      />

      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput onSearch={(q) => updateParams({ search: q })} placeholder="Search tickets..." />

          <Select
            value={params.status || ''}
            onChange={(e) => updateParams({ status: e.target.value || undefined })}
            options={[{ value: '', label: 'All statuses' }, ...STATUSES]}
            className="w-40"
          />
          <Select
            value={params.priority || ''}
            onChange={(e) => updateParams({ priority: e.target.value || undefined })}
            options={[{ value: '', label: 'All priorities' }, ...PRIORITIES]}
            className="w-40"
          />
          <Select
            value={params.category || ''}
            onChange={(e) => updateParams({ category: e.target.value || undefined })}
            options={[{ value: '', label: 'All categories' }, ...CATEGORIES]}
            className="w-44"
          />
        </div>

        <TicketTable
          tickets={tickets}
          loading={loading}
          onCreateClick={() => setModalOpen(true)}
        />

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              disabled={pagination.page <= 1}
              onClick={() => setPage(pagination.page - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-text-secondary">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="secondary"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setPage(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <CreateTicketModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={refetch} />
    </>
  );
}
