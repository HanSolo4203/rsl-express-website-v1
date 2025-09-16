// @ts-expect-error - Deno imports
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-expect-error - Deno imports  
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts"

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
}

interface CustomerData {
  full_name: string;
  email: string;
  business_name: string;
  service_area: string;
  number_of_rooms: string;
  estimated_linens: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { customerData } = await req.json() as { customerData: CustomerData }
    
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.titan.email", // Titan SMTP server
        port: 587,
        tls: true,
        auth: {
          username: Deno.env.get('TITAN_EMAIL'), // your-email@yourdomain.com
          password: Deno.env.get('TITAN_PASSWORD'), // your titan email password
        },
      },
    })

    // Send confirmation email to customer
    await client.send({
      from: Deno.env.get('TITAN_EMAIL'),
      to: customerData.email,
      subject: "Thank you for contacting RSL Express",
      content: `
        Dear ${customerData.full_name},

        Thank you for your inquiry about our linen services. We have received your request with the following details:

        Business: ${customerData.business_name}
        Service Area: ${customerData.service_area}
        Number of Rooms: ${customerData.number_of_rooms}
        Estimated Linens per Week: ${customerData.estimated_linens}

        Our team will review your requirements and get back to you within 24 hours with a customized quote.

        If you have any urgent questions, please don't hesitate to contact us directly.

        Best regards,
        RSL Express Team
        Phone: +27 834537517
        
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">Thank you for contacting RSL Express</h2>
          
          <p>Dear ${customerData.full_name},</p>
          
          <p>Thank you for your inquiry about our linen services. We have received your request with the following details:</p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Business:</strong> ${customerData.business_name}</p>
            <p><strong>Service Area:</strong> ${customerData.service_area}</p>
            <p><strong>Number of Rooms:</strong> ${customerData.number_of_rooms}</p>
            <p><strong>Estimated Linens per Week:</strong> ${customerData.estimated_linens}</p>
          </div>
          
          <p>Our team will review your requirements and get back to you within 24 hours with a customized quote.</p>
          
          <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
          
          <p>Best regards,<br>
          <strong>RSL Express Team</strong><br>
          Phone: +27 834537517<br>
          Email: dylan@rslexpress.com</p>
        </div>
      `,
    })

    await client.close()

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
