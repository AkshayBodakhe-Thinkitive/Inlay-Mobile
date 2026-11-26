/** Keeps loading states visible in mock mode. */
export const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));
