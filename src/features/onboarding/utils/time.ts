/** "2:41 PM" from an ISO time, in the device's locale. */
export function clockTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
