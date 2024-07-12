import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function useFilters (){
  const { data, error } = useSWR('/api/filters', fetcher);

  return {
    filters: data?.filters,
    isFiltersError: error,
  };
};
