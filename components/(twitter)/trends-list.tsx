
import React from 'react';

interface TwitterTrend {
  name: string;
  url: string;
  query: string;
  tweet_volume: number | null;
}

interface TwitterTrendsListProps {
  trends: TwitterTrend[];
  loading: boolean;
  onSelectTrend: (query: string) => void;
}

export function TwitterTrendsList({ trends, loading, onSelectTrend }: TwitterTrendsListProps) {
  if (loading) {
    return (
      <div className="animate-pulse rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <div className="mb-4 h-5 rounded bg-gray-300 dark:bg-gray-600"></div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="my-3 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
        ))}
      </div>
    );
  }

  if (!trends || trends.length === 0) {
    return (
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">无法加载趋势</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-white">热门趋势</h3>
      <ul className="space-y-2">
        {trends.slice(0, 10).map((trend, index) => (
          <li key={index}>
            <button
              onClick={() => onSelectTrend(trend.query)}
              className="w-full rounded p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-200">
                  {index + 1}. {trend.name}
                </span>
                {trend.tweet_volume && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Intl.NumberFormat().format(trend.tweet_volume)} tweets
                  </span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
