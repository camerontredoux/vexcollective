export default function getStats(json: any) {
  const timePlayed =
    json["Response"]["activities"]["0"]["values"]["0"]["basic"]["displayValue"];

  return {
    timePlayed,
  };
}
