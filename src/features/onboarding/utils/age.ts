/** Whole years since a MM/DD/YYYY date of birth. */
export function ageFrom(dateOfBirth: string, today = new Date()): number {
  const [month, day, year] = dateOfBirth.split('/').map(Number);
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age -= 1;
  }
  return age;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "03/14/1981" -> "March 14, 1981". */
export function longDate(dateOfBirth: string): string {
  const [month, day, year] = dateOfBirth.split('/').map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function initials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
