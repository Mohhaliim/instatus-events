import useSWRInfinite from 'swr/infinite';
import InstaLog from 'instalog';
import React from 'react';

const instalog = new InstaLog(
  process.env.NEXT_PUBLIC_INSTALOG_SECRET_KEY as string,
  process.env.NEXT_PUBLIC_INSTALOG_BASE_URL as string
);

const fetcher = async (url: string) => {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const page = parseInt(urlParams.get('page') || '1');
  const limit = parseInt(urlParams.get('limit') || '10');
  const actor_id = urlParams.get('actor_id') !== 'undefined' ? urlParams.get('actor_id') : null;
  const target_id = urlParams.get('target_id') !== 'undefined' ? urlParams.get('target_id') : null;
  const action_id = urlParams.get('action_id') !== 'undefined' ? urlParams.get('action_id') : null;

  const data = await instalog.listEvents({ page, limit, actor_id, target_id, action_id });

  return data?.events || [];
};

export function useEvents(limit: number = 10, filters: { actor_id?: string, target_id?: string, action_id?: string} = {}) {
  const getKey = React.useCallback((pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;

    const filterParams = new URLSearchParams({
      page: String(pageIndex + 1),
      limit: String(limit),

      ...filters
    });

    return `/api/events?${filterParams.toString()}`;
  }, [limit, filters]);

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const events = React.useMemo(() => (data ? data.flat() : []), [data]);

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
