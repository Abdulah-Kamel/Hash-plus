"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";

const OtpCounter = () => {
    const [counter,setCounter] = useState(37);

    useEffect(() => {
        if (counter === 0) {
            return;
        }
        const intervalId = setInterval(() => {
            setCounter(prevCounter => prevCounter - 1);
        }, 1000);
        return () => clearInterval(intervalId);

    }, [counter]);
    return (
        <>
            <div className="mb-3 text-sm max-sm:text-xs flex items-center">
                لم يصلك الرمز؟ ({counter} ثانية)
                {
                    counter > 0
                        ?
                        <p className="ms-2 text-primary opacity-50">ارسل مرة اخرى</p>
                        :
                        <Link href="#" className="ms-2 text-primary hover:underline">ارسل مرة اخرى</Link>
                }
            </div>
        </>
    );
};

export default OtpCounter;