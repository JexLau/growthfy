import { useState, useEffect } from 'react';

interface TwitterTrend {
  name: string;
  url: string;
  promoted_content: string | null;
  query: string;
  tweet_volume: number | null;
}

interface TwitterTrendLocation {
  woeid: number;
  name: string;
  country: string;
  countryCode: string;
  placeType: {
    code: number;
    name: string;
  };
}

interface UseTwitterTrendsResult {
  trends: TwitterTrend[];
  locations: TwitterTrendLocation[];
  loading: boolean;
  error: Error | null;
  fetchTrends: (woeid?: number) => Promise<void>;
  fetchAvailableLocations: () => Promise<void>;
}

export function useTwitterTrends(woeid = 1): UseTwitterTrendsResult {
  const [trends, setTrends] = useState<TwitterTrend[]>([]);
  const [locations, setLocations] = useState<TwitterTrendLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrends = async (locationId = woeid) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/twitter/trends?woeid=${locationId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch trends');
      }
      
      const data = await response.json();
      setTrends(data[0]?.trends || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableLocations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/twitter/trends/available');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch available trend locations');
      }
      
      const data = await response.json();
      setLocations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    trends,
    locations,
    loading,
    error,
    fetchTrends,
    fetchAvailableLocations
  };
}