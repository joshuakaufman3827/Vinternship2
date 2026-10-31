export interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

const API = 'https://us-central1-summaristt.cloudfunctions.net';

// The "selected" endpoint can return one object while the others return arrays,
// so always hand back an array.
export async function fetchBooksByStatus(
  status: 'selected' | 'recommended' | 'suggested'
): Promise<Book[]> {
  const res = await fetch(`${API}/getBooks?status=${status}`);
  if (!res.ok) throw new Error(`Could not load ${status} books`);
  const data: unknown = await res.json();
  if (Array.isArray(data)) return data as Book[];
  return data ? [data as Book] : [];
}

// The book page endpoint. Returns null when no book matches the id.
export async function fetchBookById(id: string): Promise<Book | null> {
  const res = await fetch(`${API}/getBook?id=${encodeURIComponent(id)}`);
  if (!res.ok) return null;
  const data: unknown = await res.json();
  const book = Array.isArray(data) ? data[0] : data;
  return book && typeof book === 'object' && 'id' in book ? (book as Book) : null;
}

const pad = (n: number) => String(n).padStart(2, '0');

// 204 seconds -> "03:24"
export function formatClock(totalSeconds: number): string {
  return `${pad(Math.floor(totalSeconds / 60))}:${pad(Math.floor(totalSeconds % 60))}`;
}

// 203 seconds -> "3 mins 23 secs"
export function formatMinSec(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m} ${m === 1 ? 'min' : 'mins'} ${s} ${s === 1 ? 'sec' : 'secs'}`;
}
