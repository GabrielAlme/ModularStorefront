const List = ({ registry, onSelect, numbered = false, showCreatedAt = false, emptyMessage = ""}) => {
    if (registry.length === 0) {
        return emptyMessage ? <p>{ emptyMessage }</p> : null;
    }

    return (
        <div className="list">
            {registry.map((item, i) => (
                <button key={item.id} className="list-row" onClick={() => onSelect?.(item.id)}>
                    {numbered && <span className="list-number">{i + 1}</span>}
                    <span className="list-label">{item.label}</span>
                    {showCreatedAt && (<span className="list-date">Created At:   {new Date(item.createdAt).toLocaleString()}</span>)}
                </button>
            ))} 
        </div>
    )
}

export default List;