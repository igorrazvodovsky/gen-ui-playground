/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@json-render/core", "@json-render/react"],
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
