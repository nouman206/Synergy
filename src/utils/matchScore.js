// Specialty style configuration for subtle, healthcare-appropriate colors

export const SPECIALTY_STYLES = {
  "Anxiety":             { bg: "bg-teal-50",    text: "text-teal-700",    border: "border-teal-200",    activeBg: "bg-teal-600" },
  "Depression":          { bg: "bg-cyan-50",    text: "text-cyan-700",    border: "border-cyan-200",    activeBg: "bg-cyan-600" },
  "Bipolar Disorder":    { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200",     activeBg: "bg-sky-600" },
  "Stress Management":   { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", activeBg: "bg-emerald-600" },
  "PTSD":                { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   activeBg: "bg-amber-600" },
  "Trauma":              { bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200",  activeBg: "bg-orange-600" },
  "Addiction":           { bg: "bg-yellow-50",  text: "text-yellow-700",  border: "border-yellow-200",  activeBg: "bg-yellow-600" },
  "Grief & Loss":        { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",    activeBg: "bg-rose-600" },
  "Relationship Issues": { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200",  activeBg: "bg-violet-600" },
  "Family Conflict":     { bg: "bg-purple-50",  text: "text-purple-700",  border: "border-purple-200",  activeBg: "bg-purple-600" },
  "Self-Esteem":         { bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-200", activeBg: "bg-fuchsia-600" },
  "Life Transitions":    { bg: "bg-indigo-50",  text: "text-indigo-700",  border: "border-indigo-200",  activeBg: "bg-indigo-600" },
  "OCD":                 { bg: "bg-pink-50",    text: "text-pink-700",    border: "border-pink-200",    activeBg: "bg-pink-600" },
  "Eating Disorders":    { bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",     activeBg: "bg-red-600" },
  "ADHD":                { bg: "bg-lime-50",    text: "text-lime-700",    border: "border-lime-200",    activeBg: "bg-lime-600" },
};

export function getSpecialtyStyle(name) {
  return SPECIALTY_STYLES[name] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", activeBg: "bg-gray-600" };
}
