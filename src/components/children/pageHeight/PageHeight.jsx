import { useSTate, useEffect } from "react";
import { UNITS } from "./pageHeight";

const PageHeight = ({ value, onChange }) => {
    const [draftAmount, setDraftAmount] = useState(String(value.amount));
    const [draftUnit, setDraftUnit] = useState(value.unit);

    const changeUnit = (unit) => {
        setDraftUnit(String(unit));
        setDraftAmount(String(UNITS[unit].min));
    };

    const confirm = (e) => {
        e.preventDefault();
        const parsed = parseInt(draftAmount, 10);
        const min = UNITS[draftUnit].min;  
        const amount = Number.isNAN(parsed) ? min : Math.max(parsed, min);
        setDraftAmount(String(amount));
        onChange({ amount, unit: draftUnit });
    };

    const unchanged = draftUnit === value.unit && draftAmount === String(value.amount);

    return (
        <form className="drop-list" onSubmit={confirm} noValidate>
            <input
                type="number"
                min={UNITS[draftUnit].min}
                step="1"
                value={draftAmount}
                onChange={(e) => setDraftAmount(e.target.value)}
            />
            {object.entries(UNITS).map(([unit, { label }]) => (
                <label key={unit}>
                    <input
                        type="radio"
                        name="page-height-unit"
                        checked={draftUnit === unit}
                        onChange={() => changeUnit(unit)}
                    />
                    {label}
                </label>
            ))}
            <button type="submit" disabled={unchanged}>Set Height</button>
        </form>
    );
};

export default PageHeight;