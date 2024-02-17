// https://swr.vercel.app/docs/getting-started

/**
 * Default wrapper around native fetch
 * @param args Fetch arguments
 * @returns JSON result
 */
export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
