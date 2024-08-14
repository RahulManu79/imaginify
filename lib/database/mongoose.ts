import mongoose, { Mongoose } from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

interface MogooseConnection {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
}

let cashed: MogooseConnection = (global as any).mongoose

if (!cashed) {
    cashed = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () => {
    if (cashed.conn) return cashed.conn

    if (!MONGO_URL) throw new Error('Missing mongo url')

    cashed.promise =
        cashed.promise ||
        mongoose.connect(
        MONGO_URL, { dbName: 'imaginify', bufferCommands: false }
    )

    cashed.conn = await cashed.promise
}