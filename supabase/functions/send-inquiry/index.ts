import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  location?: string;
  service?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const inquiryData: InquiryRequest = await req.json();
    
    console.log("Received inquiry:", inquiryData);

    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
          New Inquiry from Emidio Films Website
        </h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Contact Information</h3>
          <p><strong>Name:</strong> ${inquiryData.name}</p>
          <p><strong>Email:</strong> ${inquiryData.email}</p>
          ${inquiryData.phone ? `<p><strong>Phone:</strong> ${inquiryData.phone}</p>` : ''}
        </div>

        ${inquiryData.eventDate || inquiryData.location || inquiryData.service ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Event Details</h3>
          ${inquiryData.eventDate ? `<p><strong>Event Date:</strong> ${inquiryData.eventDate}</p>` : ''}
          ${inquiryData.location ? `<p><strong>Location:</strong> ${inquiryData.location}</p>` : ''}
          ${inquiryData.service ? `<p><strong>Service:</strong> ${inquiryData.service}</p>` : ''}
        </div>
        ` : ''}

        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Message</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${inquiryData.message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>This inquiry was submitted through the Emidio Films website contact form.</p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Emidio Films <onboarding@resend.dev>",
      to: ["hello@emidiofilms.com"],
      replyTo: inquiryData.email,
      subject: `New Inquiry from ${inquiryData.name}${inquiryData.service ? ` - ${inquiryData.service}` : ''}`,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Inquiry sent successfully" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);