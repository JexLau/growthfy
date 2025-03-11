// app/search/twitter/page.tsx
'use client';

import React, { useState } from 'react';
import { TwitterSearchForm } from '@/components/(twitter)/search-form';
import { TwitterSearchResults } from '@/components/(twitter)/search-results';
import { useTwitterSearch } from '@/hooks/use-twitter-search';

export default function TwitterSearchPage() {
  const [loadingMore, setLoadingMore] = useState(false);

  // 使用 Twitter 搜索 Hook
  const {
    search,
    loading,
    error,
    data,
    hasMore,
    loadMore
  } = useTwitterSearch();

  // 记录数据，帮助调试
  console.log('Twitter页面数据:', {
    hasData: !!data,
    statuses: data?.statuses?.length || 0,
    loading,
    error: error?.message,
    hasMore
  });

  // 处理趋势点击
  // const handleTrendClick = (query: string) => {
  //   search({ query });
  // };

  // 处理加载更多
  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    await loadMore();
    setLoadingMore(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Twitter 社交媒体数据搜索</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            使用高级搜索选项查找 Twitter 上的最新信息和趋势。
          </p>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
            {/* 搜索表单和结果 */}
            <div className="space-y-6 lg:col-span-2">
              <TwitterSearchForm onSearch={search} loading={loading} />
              <TwitterSearchResults
                searchParams={{ query: '' }}
                onChangeParams={search}
                data={data}
                error={error}
                loading={loading}
                hasMore={hasMore}
                loadMore={handleLoadMore}
              />
            </div>

            {/* 侧边栏 */}
            {/* 搜索帮助卡片 */}
            {/* <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-white">搜索技巧</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><code>from:用户名</code> - 查找特定用户的推文</li>
                <li><code>to:用户名</code> - 查找回复给特定用户的推文</li>
                <li><code>#标签</code> - 查找包含特定标签的推文</li>
                <li><code>"完整短语"</code> - 查找包含完整短语的推文</li>
                <li><code>url:domain.com</code> - 查找包含特定域名链接的推文</li>
                <li><code>-关键词</code> - 排除包含特定词语的推文</li>
                <li><code>min_retweets:10</code> - 查找至少有10次转发的推文</li>
                <li><code>min_faves:100</code> - 查找至少有100个赞的推文</li>
                <li><code>min_replies:5</code> - 查找至少有5条回复的推文</li>
                <li><code>filter:images</code> - 只显示包含图片的推文</li>
                <li><code>filter:videos</code> - 只显示包含视频的推文</li>
                <li><code>filter:links</code> - 只显示包含链接的推文</li>
                <li><code>filter:media</code> - 只显示包含媒体的推文</li>
                <li><code>filter:nativeretweets</code> - 只显示转发的推文</li>
                <li><code>-filter:nativeretweets</code> - 排除转发的推文</li>
                <li><code>filter:blue_verified</code> - 只显示已验证账号的推文</li>
                <li><code>near:"地点" within:15km</code> - 显示特定地点附近的推文</li>
                <li><code>since:2023-01-01 until:2023-12-31</code> - 特定日期范围的推文</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}