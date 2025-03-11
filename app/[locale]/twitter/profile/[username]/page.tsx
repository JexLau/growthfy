// app/twitter/profile/[username]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTwitterUser, useTwitterUserTimeline } from '@/hooks/use-twitter-user';
import { TwitterTweetCard } from '@/components/(twitter)/tweet-card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TwitterProfilePageProps {
  params: {
    username: string;
  };
}

export default function TwitterProfilePage({ params }: TwitterProfilePageProps) {
  const router = useRouter();
  const username = params.username;
  const [activeTab, setActiveTab] = useState<'tweets' | 'media' | 'likes'>('tweets');

  // 获取用户数据
  const {
    user,
    loading: userLoading,
    error: userError
  } = useTwitterUser({
    screenName: username,
    autoFetch: true
  });

  // 获取用户推文
  const {
    tweets,
    loading: tweetsLoading,
    error: tweetsError,
    fetchTimeline
  } = useTwitterUserTimeline({
    screenName: username,
    count: 50,
    autoFetch: true
  });

  // 筛选媒体推文
  const mediaTweets = tweets.filter(tweet => {
    // 检查推文或它的引用内容是否包含媒体
    const entities = tweet.extended_entities || tweet.entities;
    return entities && entities.media && entities.media.length > 0;
  });

  // 格式化数字
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // 格式化日期
  const formatJoinDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md rounded-lg bg-white p-6 text-center shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-red-600">无法加载用户资料</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">{userError.message}</p>
          <button
            onClick={() => router.back()}
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md rounded-lg bg-white p-6 text-center shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">未找到用户</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">找不到用户名为 @{username} 的用户。</p>
          <button
            onClick={() => router.back()}
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl py-6 sm:px-6 lg:px-8">
        {/* 用户资料卡 */}
        <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          {/* 封面图 */}
          <div className="relative h-32 bg-blue-500 sm:h-48">
            {user.profile_banner_url && (
              <img
                src={user.profile_banner_url}
                alt={`${user.name}'s banner`}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* 用户信息 */}
          <div className="relative px-4 pb-6 pt-12 sm:px-6">
            {/* 头像 */}
            <div className="absolute -top-10 left-6">
              <img
                src={user.profile_image_url_https.replace('_normal', '_400x400')}
                alt={`${user.name}'s avatar`}
                className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800"
              />
            </div>

            {/* 用户名和认证标记 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                  {user.verified && (
                    <svg className="ml-1 h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </svg>
                  )}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">@{user.screen_name}</p>
              </div>

              <Link
                href={`/search/twitter?query=from:${user.screen_name}`}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                搜索推文
              </Link>
            </div>

            {/* 简介 */}
            {user.description && (
              <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
                {user.description}
              </p>
            )}

            {/* 位置和加入日期 */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              {user.location && (
                <div className="flex items-center">
                  <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>{user.location}</span>
                </div>
              )}

              <div className="flex items-center">
                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
                <span>加入于 {formatJoinDate(user.created_at)}</span>
              </div>
            </div>

            {/* 统计信息 */}
            <div className="mt-4 flex gap-4">
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{formatNumber(user.friends_count)}</span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">正在关注</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{formatNumber(user.followers_count)}</span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">关注者</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white">{formatNumber(user.statuses_count)}</span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">推文</span>
              </div>
            </div>
          </div>
        </div>

        {/* 标签页 */}
        <div className="mt-6 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('tweets')}
              className={`flex-1 py-4 px-4 text-center font-medium ${activeTab === 'tweets'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
            >
              推文
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-4 px-4 text-center font-medium ${activeTab === 'media'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
            >
              媒体
            </button>
            <button
              onClick={() => setActiveTab('likes')}
              className={`flex-1 py-4 px-4 text-center font-medium ${activeTab === 'likes'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
            >
              喜欢
            </button>
          </div>

          {/* 推文内容 */}
          <div className="p-4">
            {tweetsLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
              </div>
            ) : tweetsError ? (
              <div className="py-8 text-center text-red-600">
                加载推文时出错: {tweetsError.message}
              </div>
            ) : (
              <>
                {activeTab === 'tweets' && (
                  <>
                    {tweets.length > 0 ? (
                      <div className="space-y-4">
                        {tweets.map(tweet => (
                          <TwitterTweetCard key={tweet.id_str} tweet={tweet} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                        没有可显示的推文
                      </div>
                    )}
                  </>
                )}


                {activeTab === 'media' && (
                  <>
                    {mediaTweets.length > 0 ? (
                      <div className="space-y-4">
                        {mediaTweets.map(tweet => (
                          <TwitterTweetCard key={tweet.id_str} tweet={tweet} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                        没有可显示的媒体
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'likes' && (
                  <>
                    {tweetsLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                        由于API限制，无法显示用户喜欢的推文
                        <button
                          onClick={() => window.open(`https://twitter.com/${user.screen_name}/likes`, '_blank')}
                          className="mx-auto mt-4 block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                          在Twitter上查看
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
