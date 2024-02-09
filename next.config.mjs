/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MYSQL_HOST:'localhost',
    MYSQL_USER:'root',
    MYSQL_PASS:'',
    MYSQL_DATABASE:'idoldb',
    MYSQL_PORT: '3306',

    API_URL:'http://localhost:8000/api',
    RES_URL:'http://localhost:8000/storage',
    JWT_KEY:'secret'
  },
  output: "export",
};

export default nextConfig;
