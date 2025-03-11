"use client";

import { useState, useEffect, useRef } from "react";
import { TwitterTweet, TwitterSearchParams } from "@/types/twitter";
import { TwitterTweetCard } from "./tweet-card";
import { useTwitterSearch } from "@/hooks/use-twitter-search";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Filter, BarChart2, Download, ArrowUp } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TwitterSearchResultsProps {
  searchParams: TwitterSearchParams;
  onChangeParams?: (params: TwitterSearchParams) => void;
}

export const TwitterSearchResults = ({
  searchParams,
  onChangeParams,
}: TwitterSearchResultsProps) => {
  // 使用自定义Hook
  const {
    data,
    error,
    loading,
    hasMore,
    loadMore,
    // isLoading, 
    // fetchNextPage, 
    // hasNextPage, 
    // isFetchingNextPage,
    // pages
  } = useTwitterSearch({ initialParams: searchParams });

  const [activeView, setActiveView] = useState<"list" | "analytics">("list");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">(
    searchParams.sort_order || "latest"
  );
  const { ref: loadMoreRef, inView } = useInView();
  const scrollTopRef = useRef<HTMLDivElement>(null);

  // 当参数变化时重置滚动位置
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  // 自动加载更多
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  // 扁平化所有推文数据
  const tweets = data?.statuses || [];

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 处理查询参数变化
  const handleParamChange = (newParams: Partial<TwitterSearchParams>) => {
    if (onChangeParams) {
      onChangeParams({ ...searchParams, ...newParams });
    }
  };

  // 切换排序方式
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "latest" ? "popular" : "latest";
    setSortOrder(newOrder);
    handleParamChange({ sort_order: newOrder });
  };

  if (error) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-dark-100">
        <EmptyState
          icon="AlertCircle"
          title="获取数据时出错"
          description={error.message || "请稍后再试"}
          action={
            <Button onClick={() => window.location.reload()}>
              重试
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 顶部控制栏 */}
      <div className="sticky top-16 z-10 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-dark-100">
        <Tabs
          defaultValue="list"
          value={activeView}
          onValueChange={(value: string) => setActiveView(value as "list" | "analytics")}
          className="w-full"
        >
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="list">列表视图</TabsTrigger>
              <TabsTrigger value="analytics">分析视图</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2">
              <Tooltip content={sortOrder === "latest" ? "按热度排序" : "按最新排序"}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSortOrder}
                >
                  {sortOrder === "latest" ? "最新" : "热门"}
                </Button>
              </Tooltip>

              <Tooltip content="过滤选项">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} className="mr-1" />
                  过滤
                  <ChevronDown
                    size={14}
                    className={`ml-1 transform transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </Tooltip>

              <Tooltip content="导出数据">
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-1" />
                  导出
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* 过滤器面板 */}
          {isFilterOpen && (
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-dark-200">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    包含媒体
                  </label>
                  <select
                    className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-600 dark:bg-dark-100"
                    value={searchParams.filter_media || ""}
                    onChange={(e) => handleParamChange({ filter_media: e.target.value as TwitterSearchParams["filter_media"] || undefined })}
                  >
                    <option value="">全部推文</option>
                    <option value="images">包含图片</option>
                    <option value="videos">包含视频</option>
                    <option value="links">包含链接</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    推文类型
                  </label>
                  <select
                    className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-600 dark:bg-dark-100"
                    value={searchParams.filter_type || ""}
                    onChange={(e) => handleParamChange({ filter_type: e.target.value as TwitterSearchParams["filter_type"] || undefined })}
                  >
                    <option value="">全部类型</option>
                    <option value="verified">已验证用户</option>
                    <option value="replies">回复</option>
                    <option value="retweets">转发</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    发布时间
                  </label>
                  <select
                    className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-600 dark:bg-dark-100"
                    value={searchParams.time_range || ""}
                    onChange={(e) => handleParamChange({ time_range: e.target.value as TwitterSearchParams["time_range"] || undefined })}
                  >
                    <option value="">所有时间</option>
                    <option value="24h">过去24小时</option>
                    <option value="7d">过去7天</option>
                    <option value="30d">过去30天</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            {/* 列表视图 */}
            <TabsContent value="list" className="mt-0">
              {loading && tweets.length === 0 ? (
                // 加载状态
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-dark-100">
                      <div className="flex items-start space-x-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : tweets.length === 0 ? (
                // 无结果状态
                <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-dark-100">
                  <EmptyState
                    icon="Search"
                    title="无搜索结果"
                    description="尝试使用不同的关键词或调整过滤条件"
                  />
                </div>
              ) : (
                // 结果列表
                <div className="space-y-4">
                  {tweets.map((tweet: TwitterTweet) => (
                    <TwitterTweetCard key={tweet.id} tweet={tweet} />
                  ))}

                  {/* 加载更多指示器 */}
                  {hasMore && (
                    <div ref={loadMoreRef} className="py-4 text-center">
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-primary-500"></div>
                          <span className="text-sm text-slate-500 dark:text-slate-400">正在加载更多推文...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500 dark:text-slate-400">向下滚动加载更多</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* 分析视图 */}
            <TabsContent value="analytics" className="mt-0">
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-dark-100">
                <div className="mb-4 flex items-center">
                  <BarChart2 className="mr-2 text-primary-500" size={20} />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">数据分析</h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* 热门话题分析 */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-dark-200">
                    <h4 className="mb-3 text-base font-medium text-slate-800 dark:text-slate-200">热门话题</h4>
                    <div className="space-y-2">
                      {loading ? (
                        Array(5).fill(0).map((_, i) => (
                          <Skeleton key={i} className="h-6 w-full" />
                        ))
                      ) : (
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                          请先收集更多数据以查看话题分析
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 情感分析 */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-dark-200">
                    <h4 className="mb-3 text-base font-medium text-slate-800 dark:text-slate-200">情感分析</h4>
                    <div className="space-y-2">
                      {loading ? (
                        <Skeleton className="h-32 w-full" />
                      ) : (
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                          请先收集更多数据以查看情感分析
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 互动统计 */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-dark-200">
                    <h4 className="mb-3 text-base font-medium text-slate-800 dark:text-slate-200">互动统计</h4>
                    <div className="space-y-2">
                      {loading ? (
                        Array(3).fill(0).map((_, i) => (
                          <Skeleton key={i} className="h-8 w-full" />
                        ))
                      ) : (
                        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                          请先收集更多数据以查看互动统计
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* 回到顶部按钮 */}
      {tweets.length > 10 && (
        <div
          ref={scrollTopRef}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-colors hover:bg-primary-600"
        >
          <ArrowUp size={20} />
        </div>
      )}
    </div>
  );
};