import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseClient } from '@/lib/supabase'
import { computeEstimate } from '@/lib/estimate'
import { ItemCode } from '@/config/prices'

// Zod schema for request validation
const EstimateRequestSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  businessName: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  weeklyItems: z.record(z.string(), z.number()).optional(), // Allow unknown keys but ignore
  bulkByKg: z.object({
    wdifKg: z.number().optional(),
    wdfKg: z.number().optional(),
    colorSeparated: z.boolean().optional(),
  }).optional(),
  mode: z.enum(['per-item', 'per-kg', 'mixed']),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = EstimateRequestSchema.parse(body)

    // Filter weeklyItems to only include valid ItemCodes
    const validWeeklyItems: Partial<Record<ItemCode, number>> = {}
    if (validatedData.weeklyItems) {
      for (const [key, value] of Object.entries(validatedData.weeklyItems)) {
        if (typeof value === 'number' && value > 0) {
          // Only include if it's a valid ItemCode (will be validated in computeEstimate)
          validWeeklyItems[key as ItemCode] = value
        }
      }
    }

    // Compute estimate
    const estimateInput = {
      weeklyItems: validWeeklyItems,
      bulkByKg: validatedData.bulkByKg,
      mode: validatedData.mode,
    }

    const estimate = computeEstimate(estimateInput)

    // Get client IP and user agent
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Insert into Supabase
    const supabase = getSupabaseClient(true) // Use service role on server

    const { error } = await supabase
      .from('estimates')
      .insert({
        full_name: validatedData.fullName,
        business_name: validatedData.businessName || null,
        email: validatedData.email,
        phone: validatedData.phone || null,
        weekly_items: validatedData.weeklyItems || {},
        weekly_mode: validatedData.mode,
        bulk_by_kg: validatedData.bulkByKg || null,
        weekly_subtotals: estimate.lines,
        weekly_total: estimate.total,
        pricing_version: estimate.pricingVersion,
        ip,
        user_agent: userAgent,
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { ok: false, error: 'Failed to save estimate' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({
      ok: true,
      lines: estimate.lines,
      total: estimate.total,
    })

  } catch (error) {
    console.error('Estimate API error:', error)

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Invalid request data',
          details: error.issues.map((issue: z.ZodIssue) => ({ 
            field: issue.path.join('.'), 
            message: issue.message 
          }))
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { ok: false, error: 'Method not allowed' },
    { status: 405 }
  )
}
