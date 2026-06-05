// ─── Class name merger (no clsx dep needed) ───────────────────────────────────
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ─── Email validator ──────────────────────────────────────────────────────────
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Password rules ───────────────────────────────────────────────────────────
export const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'At least 6 characters',
    test: (pw) => pw.length >= 6,
  },
  {
    id: 'number',
    label: 'Contains a number',
    test: (pw) => /\d/.test(pw),
  },
  {
    id: 'letter',
    label: 'Contains a letter',
    test: (pw) => /[a-zA-Z]/.test(pw),
  },
];

export function getPasswordStrength(password) {
  const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
  if (passed === 0) return { score: 0, label: '', color: '' };
  if (passed === 1) return { score: 33, label: 'Weak', color: '#f43f5e' };
  if (passed === 2) return { score: 66, label: 'Fair', color: '#f59e0b' };
  return { score: 100, label: 'Strong', color: '#10b981' };
}

// ─── Generate mock OTP (for demo) ─────────────────────────────────────────────
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}