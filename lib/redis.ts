import Redis from "ioredis";

const redis = new Redis();

const initialData = {
  "1702459181837":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837":
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

const key = "notes";

export interface Note {
  id: string;
  title: string;
  content: string;
  updateTime: string;
}

export async function getAllNotes() {
  const data = await redis.hgetall(key);
  if (Object.keys(data).length == 0) {
    await redis.hset(key, initialData);
  }
  const result = await redis.hgetall(key);
  const keys = Object.keys(data);
  return Object.values(result).map((value, index) => {
    const note: Note = JSON.parse(value);
    note.id = keys[index];
    return note;
  });
}

export async function addNotes(data: Note) {
  const uuid = Date.now().toString();
  await redis.hset(key, uuid, JSON.stringify(data));
  return uuid;
}

export async function updateNote(uuid: string, data: Note) {
  await redis.hset(key, uuid, JSON.stringify(data));
}

export async function getNote(uuid: string) {
  const data = await redis.hget(key, uuid);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

export async function delNote(uuid: string) {
  return redis.hdel(key, uuid);
}

export default redis;
