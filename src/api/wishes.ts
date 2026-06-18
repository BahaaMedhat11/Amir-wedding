const API_URL =
  "https://script.google.com/macros/s/AKfycbwIzOFsUionqo2DRn0QbRoROEfwrulZ7ZHvgL-N5z_MFj1d3TjcG92RSkmhXRKj1QnjNQ/exec";

export const addWish = async (wish: { name: string; message: string }) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      name: wish.name,
      message: wish.message,
      timestamp: Date.now(), // ← بنبعته من هنا
    }),
    mode: "no-cors",
  });
};

export const getWishes = async () => {
  const res = await fetch(API_URL + "?t=" + Date.now());
  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return [];
  }

  return (data || []).map((wish: any) => ({
    id: wish.timestamp?.toString() || crypto.randomUUID(),
    name: String(wish.name || ""),
    message: String(wish.message || ""),
    timestamp: Number(wish.timestamp) || Date.now(),
  }));
};
