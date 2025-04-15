import React from 'react'
import Image from 'next/image'
import styles from './Error.module.scss'
import { useToast } from '@/hooks';

const ErrorPage = () => {
    return (
        <div className={`flex justify-center items-center flex-col h-screen mr-5 ml-5 `}>
            <div className="animate-fadeInUp">
                <div className={` w-full max-w-[750px] aspect-square animate-float ${styles["image-container"]}`}>
                    <Image
                        src="/errorSVG.svg"
                        alt="Error"

                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
