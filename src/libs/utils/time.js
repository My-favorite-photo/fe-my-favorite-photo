export function hoursAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);

  const diff = now - past;
  const diffHour = Math.floor(diff / (1000 * 60 * 60));

  if (diffHour === 0) {
    return '방금 전';
  }

  return `${diffHour}시간 전`;
}
