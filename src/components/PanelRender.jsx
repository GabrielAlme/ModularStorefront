import { PANELS } from "../panels/registry";

const PanelRender = ({ node }) => {
    if (typeof node !== "object") {
        const entry = PANELS[node];
        if (!entry) return null;
        const Component = entry.component;
        return <Componenet />;
    }

    const isRow = node.direction === "row";
    return ( //incoming css needs to be inline or it becomes significantly harder to understand
        <div style={{display: "flex", flexDirection: isRow ? "row" : "column" }}>
            {node.children.map((child, i) => {
                <div key={i} style={isRow ? { flex: `0 0 ${node.splitPercentages?.[i] ?? 100 / node.children.length}%`, minWidth: 0} : undefined}>
                    <PanelRender node={child}/>
                </div>
            })}
        </div>
    );
}

export default PanelRender
