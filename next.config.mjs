/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : false, //리액트 한번만 실행시켜줌. (true로 해도 dev에서만 두번씩 실행되는거라는 말을 들음.)
    typescript : {
        //ignoreBuildErrors: true,
    }
};

export default nextConfig;
