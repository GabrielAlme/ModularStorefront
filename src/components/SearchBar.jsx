import { useState, useMemo } from 'react';

const searchbar = ({ registry, onAction }) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const results = useMemo(() => {
        const q = query.trim().toLowercase(); //trims the users query of spaces and end lines at the start or end
        if(!q) return [];//hands the searchbar a blank array if the query is empty
        return registry.filter(item => item.name.toLowercase().includes(q)).slice(0, 8);// filters
    }, [query, registry]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        placeholder="Search panels..."
      />
    </div>
  )
}

export default searchbar
