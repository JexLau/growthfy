
import React from 'react';
import { TwitterTweet } from '@/types/twitter';

interface TwitterTweetCardProps {
  tweet: TwitterTweet;
}

export function TwitterTweetCard({ tweet }: TwitterTweetCardProps) {
  // 判断是否为转发
  const isRetweet = !!tweet.retweeted_status;
  // 获取实际的推文内容（如果是转发，则获取原始推文）
  const actualTweet = isRetweet ? tweet.retweeted_status : tweet;
  // 使用 full_text 或 text
  const tweetText = actualTweet?.full_text || actualTweet?.text;

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 获取媒体
  const getMedia = () => {
    const entities = actualTweet?.extended_entities ||
      (actualTweet?.extended_tweet && actualTweet?.extended_tweet.extended_entities) ||
      actualTweet?.entities;

    if (!entities || !entities.media || entities.media.length === 0) {
      return null;
    }

    return entities.media.map((media, index) => {
      if (media.type === 'photo') {
        return (
          <div key={index} className="mt-2 overflow-hidden rounded-lg">
            <img
              src={media.media_url_https}
              alt="Tweet media"
              className="max-h-80 w-auto object-contain"
            />
          </div>
        );
      } else if (media.type === 'video' || media.type === 'animated_gif') {
        // 获取视频源
        const videoInfo = media.display_url;
        if (!videoInfo) return null;

        // // 寻找 mp4 格式视频
        // const mp4Variant = videoInfo.variants.find(v => v.content_type === 'video/mp4');
        // if (!mp4Variant) return null;

        return (
          null
          // <div key={index} className="mt-2 overflow-hidden rounded-lg">
          //   <video
          //     src={mp4Variant.url}
          //     controls={media.type === 'video'}
          //     autoPlay={media.type === 'animated_gif'}
          //     loop={media.type === 'animated_gif'}
          //     muted={media.type === 'animated_gif'}
          //     className="max-h-80 w-auto object-contain"
          //   />
          // </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      {/* 转发标识 */}
      {isRetweet && (
        <div className="mb-2 flex items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="text-sm">{tweet.user.name} 转发</span>
        </div>
      )}

      {/* 用户信息 */}
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">
          <img
            src={actualTweet?.user?.profile_image_url_https}
            alt={`${actualTweet?.user?.name}'s avatar`}
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <p className="truncate font-medium text-gray-900 dark:text-white">
              {actualTweet?.user?.name}
            </p>
            {actualTweet?.user?.verified && (
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span className="ml-2 truncate text-sm text-gray-500 dark:text-gray-400">
              @{actualTweet?.user?.screen_name}
            </span>
          </div>

          {/* 推文内容 */}
          <p className="mt-1 whitespace-pre-line text-gray-800 dark:text-gray-200">
            {tweetText}
          </p>

          {/* 媒体内容 */}
          {getMedia()}

          {/* 推文元数据 */}
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{formatDate(actualTweet?.created_at || '')}</span>
            <span className="mx-2">·</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {actualTweet?.favorite_count}
            </div>
            <span className="mx-2">·</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              {actualTweet?.retweet_count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
