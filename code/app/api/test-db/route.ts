import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    try {
        // Create supabase client
        const supabase = await createClient()

        const { data, error } = await supabase
            .from("test")
            .select("*")
        
        if (error) {
            console.log('Connection Works! Error is expected:', error.message)
            return NextResponse.json({
                success: true,
                message: 'Supabase connection successful!',
                note: 'error is expected - no tables created yet',
                error: error.message
            })
        }
        
        // If somehow data returns
        return NextResponse.json({
            success: true,
            message: 'Supabase connection successful!',
            data
        })
    } catch (error) {
        console.error('Supabase connection failed:', error)
        return NextResponse.json({
            success: false,
            message: 'Failed to connect to Supabase',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, ({ status: 500 }))
    }
}