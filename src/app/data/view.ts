export function formatViewCount(views: number): string {
  if (views >= 1000 && views < 1000000) {
    return (views / 1000).toFixed(0) + 'K';
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else {
    return views.toString();
  }
}