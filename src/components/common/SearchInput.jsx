import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from '../../utils/debounce';

export default function SearchInput({ onSearch, placeholder = 'Search...', delay = 300 }) {
  const [value, setValue] = useState('');

  const debounced = useMemo(() => debounce(onSearch, delay), [onSearch, delay]);

  useEffect(() => {
    debounced(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-64 rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm text-text-primary
          placeholder:text-text-muted outline-none transition-colors
          focus:border-primary focus:ring-2 focus:ring-primary-ring"
      />
    </div>
  );
}
