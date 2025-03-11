import React, { useState } from 'react';
import { TwitterSearchParams } from '@/types/twitter';


interface TwitterSearchFormProps {
  onSearch: (params: TwitterSearchParams) => void;
  initialParams?: Partial<TwitterSearchParams>;
  loading?: boolean;
}

export function TwitterSearchForm({
  onSearch,
  initialParams = {}
}: TwitterSearchFormProps) {
  const [params, setParams] = useState<TwitterSearchParams>({
    query: '',
    includeRetweets: true,
    includeReplies: true,
    sortBy: 'recency',
    ...initialParams
  } as TwitterSearchParams);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setParams(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      // 对于数字输入，如果为空，设置为undefined，否则转换为数字
      setParams(prev => ({ 
        ...prev, 
        [name]: value === '' ? undefined : parseInt(value, 10) 
      }));
    } else {
      setParams(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 查询字段 */}
        <div className="md:col-span-2">
          <label htmlFor="query" className="mb-1 block text-sm font-medium">
            搜索查询
          </label>
          <input
            id="query"
            name="query"
            type="text"
            value={params.query}
            onChange={handleChange}
            required
            placeholder="输入搜索关键词、用户名或标签 (例如: #AI 或 from:username)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            使用高级运算符: from:用户名, #标签, filter:media, -关键词(排除), min_retweets:10, min_faves:100, near:"北京", lang:zh
          </p>
        </div>

        {/* 日期范围 */}
        <div>
          <label htmlFor="fromDate" className="mb-1 block text-sm font-medium">
            开始日期
          </label>
          <input
            id="fromDate"
            name="fromDate"
            type="date"
            value={params.fromDate || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="toDate" className="mb-1 block text-sm font-medium">
            结束日期
          </label>
          <input
            id="toDate"
            name="toDate"
            type="date"
            value={params.toDate || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 语言 */}
        <div>
          <label htmlFor="language" className="mb-1 block text-sm font-medium">
            语言
          </label>
          <select
            id="language"
            name="language"
            value={params.language || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有语言</option>
            <option value="zh">中文</option>
            <option value="en">英文</option>
            <option value="ja">日文</option>
            <option value="es">西班牙语</option>
            <option value="fr">法语</option>
            <option value="de">德语</option>
            <option value="ru">俄语</option>
          </select>
        </div>

        {/* 排序方式 */}
        <div>
          <label htmlFor="sortBy" className="mb-1 block text-sm font-medium">
            排序方式
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={params.sortBy || 'recency'}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recency">最新</option>
            <option value="relevance">相关性</option>
          </select>
        </div>

        {/* 媒体类型 */}
        <div>
          <label htmlFor="mediaType" className="mb-1 block text-sm font-medium">
            媒体类型
          </label>
          <select
            id="mediaType"
            name="mediaType"
            value={params.mediaType || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有推文</option>
            <option value="images">含图片</option>
            <option value="videos">含视频</option>
            <option value="links">含链接</option>
            <option value="all">所有媒体</option>
          </select>
        </div>

        {/* 新增高级筛选区域 */}
        <div className="md:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">高级筛选</h3>
            <button 
              type="button"
              onClick={() => {
                // 使用样例搜索词
                const examples = [
                  'from:CCTV min_retweets:100', 
                  '#AI filter:images lang:zh',
                  '人工智能 min_faves:50 -chatgpt',
                  'near:"上海" within:15km',
                  'url:github.com filter:links'
                ];
                const randomExample = examples[Math.floor(Math.random() * examples.length)];
                setParams(prev => ({ ...prev, query: randomExample }));
              }}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              使用示例
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="min_retweets" className="mb-1 block text-sm font-medium">
                最少转发数
              </label>
              <input
                id="min_retweets"
                name="min_retweets"
                type="number"
                min="0"
                value={params.min_retweets || ''}
                onChange={handleChange}
                placeholder="例如: 10"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="min_faves" className="mb-1 block text-sm font-medium">
                最少点赞数
              </label>
              <input
                id="min_faves"
                name="min_faves"
                type="number"
                min="0"
                value={params.min_faves || ''}
                onChange={handleChange}
                placeholder="例如: 100"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="near_location" className="mb-1 block text-sm font-medium">
                地理位置
              </label>
              <div className="flex space-x-2">
                <input
                  id="near_location"
                  name="near_location"
                  type="text"
                  value={params.near_location || ''}
                  onChange={handleChange}
                  placeholder="地点，如: 北京"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  id="within_distance"
                  name="within_distance"
                  value={params.within_distance || ''}
                  onChange={handleChange}
                  className="w-24 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">范围</option>
                  <option value="5km">5km</option>
                  <option value="10km">10km</option>
                  <option value="25km">25km</option>
                  <option value="50km">50km</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 复选框选项 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:col-span-2">
          <div className="flex items-center">
            <input
              id="includeRetweets"
              name="includeRetweets"
              type="checkbox"
              checked={params.includeRetweets}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="includeRetweets" className="ml-2 block text-sm text-gray-700">
              包含转发
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="includeReplies"
              name="includeReplies"
              type="checkbox"
              checked={params.includeReplies}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="includeReplies" className="ml-2 block text-sm text-gray-700">
              包含回复
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="filterVerified"
              name="filterVerified"
              type="checkbox"
              checked={params.filterVerified}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="filterVerified" className="ml-2 block text-sm text-gray-700">
              仅显示已验证账号
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        搜索
      </button>
    </form>
  );
}
