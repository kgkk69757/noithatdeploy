// Types for the API response
export interface MediaItem {
  id: number;
  title: string;
  type: string;
  section: string;
  embed_code: string;
  media_url: string;
  media_id: string;
  thumbnail_url: string | null;
  thumbnail_alt: string | null;
  thu_tu: number;
  is_youtube: boolean;
  is_tiktok: boolean;
}

export interface MediaData {
  video_section: MediaItem[];
  tiktok_section: MediaItem[];
}

export interface MediaMeta {
  total_videos: number;
  total_tiktoks: number;
  total_items: number;
  generated_at: string;
}

export interface MediaApiResponse {
  success: boolean;
  data: MediaData;
  meta: MediaMeta;
}

// API configuration
const API_BASE_URL = 'http://127.0.0.1:8000';
const MEDIA_CONTENTS_ENDPOINT = '/api/media-contents';

/**
 * Fetch media contents from the API
 * @returns Promise<MediaApiResponse>
 */
export async function fetchMediaContents(): Promise<MediaApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}${MEDIA_CONTENTS_ENDPOINT}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: MediaApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching media contents:', error);
    throw error;
  }
}

/**
 * Get video section items
 * @param data MediaData
 * @returns MediaItem[]
 */
export function getVideoItems(data: MediaData): MediaItem[] {
  return data.video_section || [];
}

/**
 * Get TikTok section items
 * @param data MediaData
 * @returns MediaItem[]
 */
export function getTikTokItems(data: MediaData): MediaItem[] {
  return data.tiktok_section || [];
}

/**
 * Generate YouTube iframe HTML from MediaItem
 * @param item MediaItem
 * @returns string
 */
export function generateYouTubeIframe(item: MediaItem): string {
  if (!item.is_youtube) {
    return '';
  }
  
  return `<iframe
    src="https://www.youtube.com/embed/${item.media_id}"
    title="${item.title}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>`;
}

/**
 * Generate TikTok embed HTML from MediaItem
 * @param item MediaItem
 * @returns string
 */
export function generateTikTokEmbed(item: MediaItem): string {
  if (!item.is_tiktok) {
    return '';
  }
  
  // Extract TikTok video ID from media_url if needed
  // This is a basic implementation - you might need to adjust based on your TikTok URL format
  return item.embed_code || '';
}

/**
 * Sort media items by thu_tu (order)
 * @param items MediaItem[]
 * @returns MediaItem[]
 */
export function sortMediaItems(items: MediaItem[]): MediaItem[] {
  return items.sort((a, b) => a.thu_tu - b.thu_tu);
}

/**
 * Filter media items by type
 * @param items MediaItem[]
 * @param type string
 * @returns MediaItem[]
 */
export function filterMediaItemsByType(items: MediaItem[], type: string): MediaItem[] {
  return items.filter(item => item.type === type);
}

/**
 * Get media statistics
 * @param data MediaData
 * @returns object with counts
 */
export function getMediaStats(data: MediaData) {
  return {
    totalVideos: data.video_section.length,
    totalTikToks: data.tiktok_section.length,
    totalItems: data.video_section.length + data.tiktok_section.length,
    youtubeVideos: data.video_section.filter(item => item.is_youtube).length,
    tiktokVideos: data.tiktok_section.filter(item => item.is_tiktok).length
  };
}

/**
 * Create video item HTML element
 * @param item MediaItem
 * @returns string
 */
export function createVideoItemHTML(item: MediaItem): string {
  return `
    <div class="video-item" data-id="${item.id}">
      ${item.is_youtube ? generateYouTubeIframe(item) : item.embed_code}
    </div>
  `;
}

/**
 * Create TikTok item HTML element
 * @param item MediaItem
 * @returns string
 */
export function createTikTokItemHTML(item: MediaItem): string {
  return `
    <div class="tiktok-item" data-id="${item.id}">
      ${item.embed_code}
    </div>
  `;
}

/**
 * Initialize media content in the DOM
 * @param containerId string - ID of the container element
 * @param items MediaItem[]
 * @param itemType 'video' | 'tiktok'
 */
export function initializeMediaContent(
  containerId: string, 
  items: MediaItem[], 
  itemType: 'video' | 'tiktok'
): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID ${containerId} not found`);
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Sort items by order
  const sortedItems = sortMediaItems(items);

  // Generate HTML for each item
  sortedItems.forEach(item => {
    const itemHTML = itemType === 'video' 
      ? createVideoItemHTML(item) 
      : createTikTokItemHTML(item);
    
    container.insertAdjacentHTML('beforeend', itemHTML);
  });

  // Load TikTok embed script if needed
  if (itemType === 'tiktok' && items.some(item => item.is_tiktok)) {
    loadTikTokScript();
  }
}

/**
 * Load TikTok embed script
 */
function loadTikTokScript(): void {
  if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.head.appendChild(script);
  }
}

/**
 * Initialize the entire media section with API data
 */
export async function initializeMediaSection(): Promise<void> {
  try {
    const response = await fetchMediaContents();
    
    if (!response.success) {
      throw new Error('API response indicates failure');
    }

    const { data } = response;

    // Initialize video section
    const videoItems = getVideoItems(data);
    if (videoItems.length > 0) {
      initializeMediaContent('videoSlider', videoItems, 'video');
    }

    // Initialize TikTok section
    const tiktokItems = getTikTokItems(data);
    if (tiktokItems.length > 0) {
      initializeMediaContent('tiktokSlider', tiktokItems, 'tiktok');
    }

    // Log statistics
    const stats = getMediaStats(data);
    console.log('Media content loaded:', stats);

  } catch (error) {
    console.error('Failed to initialize media section:', error);
    // You might want to show a fallback or error message to users
  }
}
