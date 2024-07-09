import useSWRInfinite from 'swr/infinite';
import InstaLog from 'instalog';

const instalog = new InstaLog(
  process.env.NEXT_PUBLIC_INSTALOG_SECRET_KEY as string,
  process.env.NEXT_PUBLIC_INSTALOG_BASE_URL as string
);

const fetcher = async (url: string) => {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const page = parseInt(urlParams.get('page') || '1');
  const limit = parseInt(urlParams.get('limit') || '10');

  const data = await instalog.listEvents({ page, limit });

  return data?.events || [];
};

export function useEvents(page: number, limit: number = 10) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;

    return `/api/events?page=${pageIndex + 1}&limit=${limit}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const events = data ? data.flat() : [];
  const isReachingEnd = data && data[data.length - 1]?.length < limit;

  return {
    events,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    size,
    setSize,
    isReachingEnd,
  };
}
