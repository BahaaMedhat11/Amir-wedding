const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwVRo3asubzmq2DkqlaR2ncwOepcB0381YVKO1o9s34Rn-PFoIFXPSK1f0PjkgcoyToaQ/exec";

export interface WishPayload {
  name: string;
  message: string;
}

export interface WishRecord {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed ${response.status}: ${text}`);
  }
  return response.json();
}

export async function addWish(wish: WishPayload) {
  const response = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      name: wish.name,
      message: wish.message,
      timestamp: Date.now(),
    }),
  });

  return handleResponse<{ status: string; message?: string }>(response);
}

export async function getWishes() {
  const response = await fetch(`${GAS_URL}?t=${Date.now()}`);
  return handleResponse<WishRecord[]>(response);
}
