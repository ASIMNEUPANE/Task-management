import React, { useState } from 'react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import usePost from '@/hooks/usePost'
import { otpValidation } from '@/validator/otp.schema'
import { Button } from './ui/button'
import { URLS } from "@/constants";
import Loader from './Loader'

type user = {
    email: string,
    otp: string,
}
export function Otp({ email }: { email: string }) {

    const { postMutation, data, success, error, isPending } = usePost('')
    const [regenOtp, setRegenOtp] = useState<boolean>(true)
    const [zodErr, setZodErr] = useState<string | null>(null)
    const [user, setUser] = useState<user>({

        email: email,
        otp: ''
    })
    const handleSubmit = () => {
        let data = user
        const isValid = otpValidation.safeParse(user);
        if (isValid.success) {
            postMutation({ urls: URLS.AUTH + '/verify', data })


        }
        else {
            setZodErr(isValid.error.message)
        }
    }


    const regenHandler = () => {
        setUser({ ...user, otp: '' })
        let email = user.email
        let data = { email }
        try {
            postMutation({ urls: URLS.AUTH + '/regenerateToken', data })
            setRegenOtp(true)
        }
        catch (error) {
            console.error('Error regenerating token:', error);
            setRegenOtp(false);
        }

    }
    if (isPending) {
        return <div className="flex h-screen items-center justify-center">

            <Loader />
        </div>
    }



    if (regenOtp) {
        return (

            <div className="w-screen bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] via-30% to-[#481EDC] to-90% flex items-center justify-center h-screen">

                <div className="max-w-[960px] bg-black-dark  items-center gap-10 p-5 rounded-2xl flex flex-col">

                    <div className=''>
                        <div className='bg-none  p-1 rounded-md text-white'><h1>{email}</h1></div>
                    </div>
                    <div>
                        <InputOTP value={user.otp} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(value) => setUser({ ...user, otp: value })}>
                            <InputOTPGroup>
                                <InputOTPSlot className='text-white' index={0} />
                                <InputOTPSlot className='text-white' index={1} />
                                <InputOTPSlot className='text-white' index={2} />
                                <InputOTPSlot className='text-white' index={3} />
                                <InputOTPSlot className='text-white' index={4} />
                                <InputOTPSlot className='text-white' index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {zodErr && <p className="text-red-500">{zodErr}</p>}
                    </div>
                    <div>
                        <Button onClick={handleSubmit}>Submit</Button>
                        {error && <div className="text-red-500">{error}
                            <Button onClick={regenHandler}>regenrate token</Button>
                        </div>}

                    </div>
                </div>
            </div>

        )
    }
    if (success) {
        return <div>succesfully do it</div>
    }
}

export default Otp