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
    }
}