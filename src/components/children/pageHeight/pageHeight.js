export const PAGE_PX = 1056;

export const UNITS = {
    pixels: { label: "pixels", min: 1056 },
    pages: { label: "Pages", min: 1 },
    screens: { label: "Screens", min: 1 },
};

export const DEFAULT_PAGE_HEIGHT = { ammount: 1, unit:"screens" };

export function pageHeightToCss({ amount, unit }) {
    if (unit === "screens") return `${amount * 100}vh`;
    if (unit === "pages") return `${amount * PAGE_PX}px`;
    return `${amount}px`;
}