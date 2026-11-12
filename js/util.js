const SUPERSCRIPT = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };

/**
 * Formats a big number as e.g. "9×10⁷⁶".
 */
export function formatBig(num) {
    const [mantissa, exp] = num.toExponential().split('e');
    const m = parseFloat(Number(mantissa).toFixed(6)).toLocaleString(undefined, { maximumFractionDigits: 6 });
    const e = String(Number(exp)).split('').map((c) => SUPERSCRIPT[c] ?? c).join('');
    return `${m}×10${e}`;
}

/**
 * Formats a length in seconds. Normal lengths become "m:ss (Ns)", astronomically
 * long ones (move timers etc.) become "9×10⁷⁶ seconds". Text is shown as-is.
 */
export function formatLength(seconds) {
    if (seconds === null || seconds === undefined || seconds === '') return '—';
    const n = Number(seconds);
    if (!Number.isFinite(n)) return String(seconds);
    if (n >= 1e7) return `${formatBig(n)} seconds`;
    const total = Math.round(n);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = String(total % 60).padStart(2, '0');
    const clock = h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
    return `${clock} (${total}s)`;
}
