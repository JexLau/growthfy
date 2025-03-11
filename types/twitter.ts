// types/twitter.ts

export interface TwitterUser {
  id: string;
  id_str: string;
  name: string;
  screen_name: string;
  location: string | null;
  description: string | null;
  url: string | null;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  verified: boolean;
  statuses_count: number;
  profile_image_url_https: string;
  profile_banner_url?: string;
  default_profile: boolean;
  default_profile_image: boolean;
  withheld_in_countries?: string[];
  withheld_scope?: string;
  protected: boolean;
}

export interface TwitterEntities {
  hashtags: Array<{
    text: string;
    indices: [number, number];
  }>;
  symbols: Array<{
    text: string;
    indices: [number, number];
  }>;
  user_mentions: Array<{
    screen_name: string;
    name: string;
    id: number;
    id_str: string;
    indices: [number, number];
  }>;
  urls: Array<{
    url: string;
    expanded_url: string;
    display_url: string;
    indices: [number, number];
  }>;
  media?: Array<{
    id: number;
    id_str: string;
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: 'photo' | 'video' | 'animated_gif';
    sizes: {
      thumb: { w: number; h: number; resize: string };
      small: { w: number; h: number; resize: string };
      medium: { w: number; h: number; resize: string };
      large: { w: number; h: number; resize: string };
    };
    indices: [number, number];
  }>;
}

export interface TwitterExtendedEntities {
  media: Array<{
    id: number;
    id_str: string;
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: 'photo' | 'video' | 'animated_gif';
    sizes: {
      thumb: { w: number; h: number; resize: string };
      small: { w: number; h: number; resize: string };
      medium: { w: number; h: number; resize: string };
      large: { w: number; h: number; resize: string };
    };
    indices: [number, number];
    video_info?: {
      aspect_ratio: [number, number];
      duration_millis: number;
      variants: Array<{
        bitrate?: number;
        content_type: string;
        url: string;
      }>;
    };
  }>;
}

export interface TwitterTweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  source: string;
  in_reply_to_status_id: number | null;
  in_reply_to_status_id_str: string | null;
  in_reply_to_user_id: number | null;
  in_reply_to_user_id_str: string | null;
  in_reply_to_screen_name: string | null;
  user: TwitterUser;
  coordinates: {
    type: string;
    coordinates: [number, number];
  } | null;
  place: {
    id: string;
    url: string;
    place_type: string;
    name: string;
    full_name: string;
    country_code: string;
    country: string;
    bounding_box: {
      type: string;
      coordinates: Array<Array<[number, number]>>;
    };
  } | null;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  is_quote_status: boolean;
  quoted_status?: TwitterTweet;
  retweeted_status?: TwitterTweet;
  quote_count?: number;
  reply_count?: number;
  retweet_count: number;
  favorite_count: number;
  entities: TwitterEntities;
  extended_entities?: TwitterExtendedEntities;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive?: boolean;
  filter_level?: string;
  lang: string;
  full_text?: string;
  display_text_range?: [number, number];
  extended_tweet?: {
    full_text: string;
    display_text_range: [number, number];
    entities: TwitterEntities;
    extended_entities?: TwitterExtendedEntities;
  };
}

export interface TwitterSearchResponse {
  statuses: TwitterTweet[];
  search_metadata: {
    completed_in: number;
    max_id: number;
    max_id_str: string;
    next_results?: string;
    query: string;
    refresh_url?: string;
    count: number;
    since_id: number;
    since_id_str: string;
  };
}

export interface TwitterSearchParams {
  query: string;
  limit?: number;
  fromDate?: string;
  toDate?: string;
  includeRetweets?: boolean;
  filterVerified?: boolean;
  includeReplies?: boolean;
  mediaType?: 'images' | 'videos' | 'links' | 'all';
  language?: string;
  sortBy?: 'relevance' | 'recency';

  // 添加过滤参数
  filter_media?: 'images' | 'videos' | 'links';
  filter_type?: 'verified' | 'replies' | 'retweets';
  time_range?: '24h' | '7d' | '30d';
  sort_order?: 'latest' | 'popular';
  
  // 添加高级搜索操作符
  min_retweets?: number;
  min_faves?: number;
  min_replies?: number;
  near_location?: string;
  within_distance?: string;
}