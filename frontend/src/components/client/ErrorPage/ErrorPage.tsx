import React from 'react'
import Image from 'next/image'
import styles from './ErrorPage.module.scss'
import { useToast } from '@/hooks';

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center flex-col h-screen mr-5 ml-5">
            <div className="animate-fadeInUp">
                <div className="animate-float">
                    <Image
                        src="/errorSVG.svg"
                        alt="Error"
                        width={750}
                        height={750}
                    />
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
