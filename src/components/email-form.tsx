"use client"

import type React from "react"
import {useState} from "react"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {sendEmail} from "@/app/actions/email"

export function EmailForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus(null)

        try {
            const result = await sendEmail({name, email})
            setStatus({
                success: result.success,
                message: result.message,
            })
            // Reset form on success
            if (result.success) {
                setName("")
                setEmail("")
            }
        } catch (error) {
            setStatus({
                success: false,
                message: "Failed to send email. Please try again.",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
            </div>

            {status && (
                <div
                    className={`p-3 rounded-md ${status.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {status.message}
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Send Email
            </button>
        </form>
    )
}
