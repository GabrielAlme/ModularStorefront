const List = ({ registry, onSelect, numbered = false, showCreatedAt = false, emptyMessage = ""}) => {
    if (registry.length === 0) {
        return emptyMessage ? <p>{ emptyMessage }</p> : null;
    }

    return (
        <div>
            {registry.map((item, i) => (
                <button key={item.id} onClick={() => onSelect?.(item.id)}>
                    {numbered && <span>{i + 1}</span>}
                    <span>{item.label}</span>
                    {showCreatedAt && (<span>{new Date(item.createdAt).toLocaleString()}</span>)}
                </button>
            ))} 
        </div>
    )
}

export default List;