import mysql from "mysql2/promise";
type Query = {
  query: string;
  values?: any[];
};
export async function query({ query, values = [] }: Query) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  try {
    const [result] = await connection.execute(query, values);
    connection.end();
    return result;
  } catch (error) {
    console.error(error);
  }
}
