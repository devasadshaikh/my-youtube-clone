const YOUTUBE_API_URL =
    'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=PK&key=AIzaSyAWmp7zxwySbVM5_Go-SViZsT-MhDbmwpc';

export interface VideoItem {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    channelName: string;
    views: number;
    publishDate: string;
    timeDuration: string


}


export async function fetchTrendingVideos(): Promise<VideoItem[]> {
    try {
        const response = await fetch(YOUTUBE_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const videoItems: VideoItem[] = data.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.standard.url,
            channelName: item.snippet.channelTitle,
            views: item.statistics.viewCount,
            publishDate: item.snippet.publishedAt,
            timeDuration: item.contentDetails.duration

        }));

        return videoItems;
    } catch (error) {
        console.error('Error fetching YouTube trending videos:', error);
        return [];
    }
}