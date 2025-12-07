import pg from 'pg'
const { Pool } = pg

const client = new Pool({
  // host: process.env.POSTGRES_HOST,
  // port: Number(process.env.POSTGRES_PORT),
  // database: process.env.POSTGRES_DBNAME,
  // user: process.env.POSTGRES_USERNAME,
  // password: process.env.POSTGRES_PASSWORD,
  // ssl: {
  //   rejectUnauthorized: false, // Needed for Supabase SSL
  // }
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    require: true,
    rejectUnauthorized: false 
  }
})

client.connect()

export const query = async (text, params) => {
  try {
    console.log("Executing query:", text)
    const res = await client.query(text, params)
    return res
  } catch (err) {
    console.error("Error executing query", err)
    throw err
  }
}