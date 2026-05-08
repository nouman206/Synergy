const SHEET_URL =
  // "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7oDOvXUhMG-EnAhRigJmLSo_vXZA_kSPmFpLMAkgiP4Uob5y1nGKPMuKXxdxMBE7w09R9XwIkf331/pub?gid=0&single=true&output=csv";
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR3ZR1wojmKccRVX9XrPoA1YF6YuegG2T35edNjaLgY1cghRnKd9rwmyAJk9TXgjkprESnMX4icU6ZD/pub?gid=0&single=true&output=csv";

  function parseCSVRow(row) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (inQuotes) {
      if (ch === '"' && row[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        cells.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  cells.push(current.trim());
  return cells;
}

function toProvider(headers, values) {
  const get = (key) => {
    const idx = headers.indexOf(key);
    return idx >= 0 ? values[idx] || "" : "";
  };

  const splitList = (key) =>
    get(key)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  return {
    id: Number(get("id")),
    name: get("name"),
    title: get("title"),
    photo: get("photo"),
    specialties: splitList("specialties"),
    insurance: splitList("insurance"),
    location: {
      city: get("city"),
      state: get("state"),
      zip: get("zip"),
    },
    gender: get("gender"),
    languages: splitList("languages"),
    bio: get("bio"),
    therapyTypes: splitList("therapyTypes"),
    sessionTypes: splitList("sessionTypes"),
    modalities: splitList("modalities"),
    ageRange: {
      min: Number(get("ageMin")) || 0,
      max: Number(get("ageMax")) || 120,
    },
  };
}

export async function fetchProviders() {
  const res = await fetch(SHEET_URL);
  if (!res.ok) throw new Error("Failed to fetch providers");
  const text = await res.text();

  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVRow(lines[0]);
  return lines.slice(1).map((line) => toProvider(headers, parseCSVRow(line)));
}
