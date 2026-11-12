/**
 * Path to directory containing the list data files
 */
const dir = 'data';

async function fetchJson(file) {
    // Cache-bust so freshly updated data shows up straight away
    const res = await fetch(`${dir}/${file}?t=${Date.now()}`);
    if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
    return res.json();
}

/**
 * Normalises a level so every field the site uses exists.
 */
export function normalizeLevel(level) {
    return {
        id: level.id ?? '',
        name: level.name ?? '',
        author: level.author ?? '',
        creators: Array.isArray(level.creators) ? level.creators : [],
        verifier: level.verifier ?? '',
        password: level.password ?? '',
        difficulty: level.difficulty ?? '',
        length: level.length ?? null,
        cps: level.cps ?? '',
        type: level.type ?? '',
        tags: Array.isArray(level.tags) ? level.tags : [],
        notes: level.notes ?? '',
    };
}

/**
 * Returns the list as [level, error] pairs (error is always null now that
 * levels live in a single file), or null if the list failed to load.
 */
export async function fetchList() {
    try {
        const list = await fetchJson('list.json');
        return list.map((level) => [normalizeLevel(level), null]);
    } catch (e) {
        console.error('Failed to load list.', e);
        return null;
    }
}

export async function fetchEditors() {
    try {
        return await fetchJson('editors.json');
    } catch {
        return null;
    }
}

export async function fetchSite() {
    try {
        return await fetchJson('site.json');
    } catch {
        return null;
    }
}
