import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseClient } from "@/lib/supabase";

const ContactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  businessName: z.string().min(1, "Business name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  serviceArea: z.string().min(1, "Service area is required"),
  numberOfRooms: z.number().min(1, "Number of rooms must be at least 1"),
  estimatedLinens: z.number().min(1, "Estimated linens must be at least 1"),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validationResult = ContactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Invalid input", 
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;
    
    // Get client IP and user agent
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert into Supabase
    const supabase = getSupabaseClient(true); // Use service role for server-side operations
    
    const { data, error } = await supabase
      .from("contact_requests")
      .insert({
        full_name: formData.fullName,
        business_name: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        service_area: formData.serviceArea,
        number_of_rooms: formData.numberOfRooms,
        estimated_linens: formData.estimatedLinens,
        message: formData.message || null,
        ip_address: ip,
        user_agent: userAgent,
      })
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { 
          ok: false, 
          error: "Failed to save contact request",
          details: error.message 
        },
        { status: 500 }
      );
    }

    // Send confirmation email via Supabase Edge Function
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerData: {
            full_name: formData.fullName,
            email: formData.email,
            business_name: formData.businessName,
            service_area: formData.serviceArea,
            number_of_rooms: formData.numberOfRooms,
            estimated_linens: formData.estimatedLinens,
            message: formData.message || null,
          }
        }),
      });

      if (!emailResponse.ok) {
        console.error("Email sending failed:", await emailResponse.text());
        // Don't fail the entire request if email fails
      }
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Contact request submitted successfully",
      id: data?.[0]?.id 
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
