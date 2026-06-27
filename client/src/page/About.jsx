import React from 'react';

const About = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">About This Project</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Learn more about the AI Image Generation platform</p>
      </div>

      <div className="mt-10 space-y-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#222328] mb-4">What is This?</h2>
          <p className="text-[#666e75] leading-relaxed">
            This is an AI-powered image generation web application that allows users to create stunning visual content using natural language prompts. 
            Built with modern web technologies, it leverages ERNIE-ViLG, a powerful AI model developed by Baidu, to transform text descriptions into beautiful images.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#222328] mb-4">Features</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#6469ff] text-white rounded-full flex items-center justify-center text-sm">1</span>
              <span className="text-[#222328]">AI Image Generation</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#6469ff] text-white rounded-full flex items-center justify-center text-sm">2</span>
              <span className="text-[#222328]">Community Showcase</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#6469ff] text-white rounded-full flex items-center justify-center text-sm">3</span>
              <span className="text-[#222328]">Save Favorites</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#6469ff] text-white rounded-full flex items-center justify-center text-sm">4</span>
              <span className="text-[#222328]">Explore & Discover</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#6469ff] text-white rounded-full flex items-center justify-center text-sm">5</span>
              <span className="text-[#222328]">Edit & Manage Posts</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#6469ff] text-white rounded-full flex items-center justify-center text-sm">6</span>
              <span className="text-[#222328]">User Profiles</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#222328] mb-4">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-[#222328] mb-2">Frontend</h3>
              <ul className="text-sm text-[#666e75] space-y-1">
                <li>React 18</li>
                <li>Vite 8</li>
                <li>Tailwind CSS 3</li>
                <li>React Router</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-[#222328] mb-2">Backend</h3>
              <ul className="text-sm text-[#666e75] space-y-1">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>Cloudinary</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#222328] mb-4">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-[#6469ff] text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <h3 className="font-medium text-[#222328]">Enter a Prompt</h3>
                <p className="text-sm text-[#666e75]">Describe the image you want to create using natural language</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-[#6469ff] text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <h3 className="font-medium text-[#222328]">Generate Image</h3>
                <p className="text-sm text-[#666e75]">Click generate and let ERNIE-ViLG create your image</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-[#6469ff] text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <h3 className="font-medium text-[#222328]">Share with Community</h3>
                <p className="text-sm text-[#666e75]">Publish your creation and share it with other users</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default About;