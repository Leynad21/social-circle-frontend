import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Img1HomePage from '../assets/img/hp1.jpg'
import Img2HomePage from '../assets/img/hp2.jpg'
import Img3HomePage from '../assets/img/hp3.jpg'
import Img4HomePage from '../assets/img/hp4.jpg'
import Img5HomePage from '../assets/img/hp5.jpg'


const HomePage = () => {

    const carouselImages = [Img1HomePage, Img2HomePage, Img3HomePage,
        Img4HomePage, Img5HomePage]

    const [backgroundImg, setBackgroundImg] = useState(carouselImages[0])

    useEffect(() => {
        let currentIndex = 0

        const changeBackgroundImg = () => {
            currentIndex = (currentIndex + 1) % carouselImages.length
            setBackgroundImg(carouselImages[currentIndex])
        }

        const interval = setInterval(changeBackgroundImg, 6000)

        return () => {
            clearInterval(interval)
        }

    }, [])


    return (
        <>
            <div className=' bg-fixed bg-cover bg-center rounded-xl'
                style={{ backgroundImage: `url(${backgroundImg})`, transition: "2000ms" }}>
                <div className=' flex flex-col items-center rounded-xl mt-10 h-[650px]'>

                    <div className=' bg-white rounded-lg p-12 mt-12 lg:mr-[600px]' style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                        <h1 className=' font-semibold text-4xl md:text-6xl'>Welcome to Social Circle</h1>
                    </div>
                </div>
            </div >

        </>

    )
}

export default HomePage