'use client';
import { useState } from 'react';

export function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false)

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="p-2 border rounded w-full"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
      />
      <button onClick={() => onSearch(query)} className="bg-gray-500 text-white px-4 py-2 rounded" disabled={query === ''}>
        Найти
      </button>
    </div>
  );
}