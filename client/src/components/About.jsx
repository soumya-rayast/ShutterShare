import React from 'react'
import logo from '../assets/shutter-camera.png';
const About = () => {
    return (
        <div className='mt-20'>
            <div className='bg-white flex flex-col justify-center items-center '>
                <h1 className='text-3xl font-semibold my-14 text-[#012641]'>About Platform</h1>
                <div className='flex md:flex-row flex-col md:mx-40 mx-10 mb-20 items-center justify-between gap-10 shadow-2xl shadow-[#012641] px-2 rounded-md'>
                    <img src={logo} alt="logo" className="md:w-[300px] md:h-[300px] p-1 " />
                    <p>
                        <span> Shutter Share</span> -  Shutter Share is an innovative platform that allows photographers to showcase and sell their photos to a global audience. With it, photographers can upload, promote, and monetize their work in a digital marketplace. Focused on high-quality imagery, Shutter Share provides tools for photographers to reach buyers, from individuals to businesses, offering opportunities for licensing and direct sales. It’s an ideal space for photographers to turn their passion into profit, gaining exposure while retaining control over their creative content.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
