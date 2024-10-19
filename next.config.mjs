/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['res.cloudinary.com']
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.cloudinary.com', // Asegúrate de que sea el dominio correcto
              port: '',
              pathname: '/**',
            },
          ],
    }
};

export default nextConfig;
