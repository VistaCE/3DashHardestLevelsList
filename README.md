# 3DHLL – 3Dash Hardest Levels List

A list of the hardest levels in 3Dash: impossible, practically-possible and
theoretically-possible levels that are at least top 5 on the 3DDL or harder.

Owned by [VistaCE](https://www.youtube.com/@StartPositionGD) and
[Daliscreator](https://www.youtube.com/channel/UCgnZSgjBK1fk2PVb5kQ4m4A).

Website layout based on [TheShittyList](https://tsl.pages.dev/) template. Credit for the
template stays on the site.

---

## List rules

1. Levels have to be at least top 5 on the 3DDL or harder at the time of publishing.
2. If your level has below or equal to 25 CPS and 3 CPF while not having any luck or
   counters it will have **ILL** difficulty. If your level has above 25 CPS or 3 CPF while
   not having any luck or counters it will have **SLL** difficulty. If your level has
   counters or luck while being unverified legitimately it will have **PPLL** difficulty.
   If your level is verified but at least top 5 in 3DDL at time of publishing to servers,
   then it will have **ILL** difficulty.
3. Decoration / Gameplay quality is not necessary.
4. These are the tags:
    - **[FT1]** – was top 1 before but isn't now
    - **[T1]** – current hardest level
    - **[2p]** – uses 2 player mode added in 3DU v1.5

The live rules and tags are stored in `data/site.json`.

---

## Data files

All data lives in `data/`:

| File            | Contents                                         |
| --------------- | ------------------------------------------------ |
| `list.json`     | Every level, in rank order (first entry is #1)   |
| `site.json`     | Site name, version, Discord link, rules and tags |
| `editors.json`  | List editors shown in the sidebar                |

### Level format

```json
{
    "id": "16302",
    "name": "Stack fx",
    "author": "Norxzit",
    "creators": [],
    "verifier": "",
    "password": "",
    "difficulty": "PPLL",
    "length": 95,
    "cps": "~125",
    "type": "Move timer",
    "tags": ["T1"],
    "notes": ""
}
```

- `author` is the publisher. `creators` lists the creators when there's more than one;
  leave it empty for solo levels. Leave `verifier` blank if the level is unverified.
- `difficulty` is one of `ILL`, `SLL`, `SLL/PPLL`, `PPLL` or `PPLL/TPLL`.
- `length` is in seconds. Very large values such as `9e76` are shown as `9×10⁷⁶ seconds`.
- `type`, `cps`, `password` and `notes` are free text and can be left blank.
- `tags` uses the tag codes defined in `site.json`.

If the list doesn't load after editing these files, check for missing or extra commas, and look
at the browser console (`Inspect Element` → `Console`) for the error.

---

## Running locally

The site needs to be served from a web server; opening `index.html` directly won't work.
From the repo folder:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.
