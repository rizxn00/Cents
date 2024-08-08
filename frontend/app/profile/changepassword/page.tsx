'use client'

import HomeLayout from "@/app/home"
import { ErrorAlert, SuccessAlert } from "@/components/ui/Alerts"
import { Button } from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Label from "@/components/ui/Label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')

    const router = useRouter()

    function performLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("navigationOpen");
        localStorage.removeItem("currency");
    
        setTimeout(() => {
            router.push('/auth/signin') 
        }, 2000);
    }

    const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        try {
            const profileData = {
                id: localStorage.getItem('id'),
                currentPassword,
                newPassword
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(profileData)
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                if(response.statusText === 'Unauthorized') {
                    setError('Unauthorized')
                    performLogout()
                    return
                }
                console.error(data.error || "An error occurred while changing password");
                setError(data.message)
            }
    
            console.log(data)
            setSuccess(data?.message)
        } catch (error: any) {
            console.error("Error during changing password:", error);
            setError(error.error)
            throw error;
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <HomeLayout>
            <Card>
                <form onSubmit={changePassword} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="current">Current Password</Label>
                        <Input required type="text" id="current" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="new">New Password</Label>
                        <Input required type="text" id="new" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    {!isSubmitting ? 
                    <Button type='submit'>Submit</Button>
                    :
                    <Button type='button' disabled>submitting.....</Button>}
                </form>
            </Card>
            {success && success.length > 0 && <SuccessAlert message={success} onClose={() => setSuccess('')} />}
            {error && error.length > 0 && <ErrorAlert message={error} onClose={() => setError('')} />}
        </HomeLayout>
    )
}