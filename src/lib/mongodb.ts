// src/lib/mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.DB_NAME || 'sweas';

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');

type MongooseConnectionCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseConnectionCache | undefined;
}

const globalCache: MongooseConnectionCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

export async function connectToDatabase(): Promise<Mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });
  }

  globalCache.conn = await globalCache.promise;
  global.mongooseCache = globalCache;
  return globalCache.conn;
}
