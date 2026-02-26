// supabase edge function to verify Cloudflare Turnstile token
// Follows best practices from production implementations

// ============================================================================
// CONFIGURATION
// ============================================================================
const CONFIG = {
  allowedOrigins: [
    "https://www.migrationsafaridirect.com",
    "https://migrationsafaridirect.com",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8000",
  ],
  turnstile: {
    secretKey: Deno.env.get("TURNSTILE_SECRET_KEY"),
    verifyUrl: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  },
};

// ============================================================================
// CORS HELPER
// ============================================================================
function getCorsHeaders(origin: string) {
  const isAllowed =
    CONFIG.allowedOrigins.includes(origin) ||
    origin?.includes("localhost") ||
    origin?.includes("127.0.0.1");

  return {
    "Access-Control-Allow-Origin": isAllowed
      ? origin
      : CONFIG.allowedOrigins[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };
}

// ============================================================================
// TURNSTILE VALIDATION
// ============================================================================
async function validateTurnstile(token: string, remoteip?: string) {
  if (!CONFIG.turnstile.secretKey) {
    console.warn("TURNSTILE_SECRET_KEY not configured — skipping validation");
    return { success: true, warning: "Validation skipped" };
  }

  if (!token) {
    console.error("No Turnstile token provided");
    return { success: false, error: "Missing token" };
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", CONFIG.turnstile.secretKey);
    params.append("response", token);
    if (remoteip) params.append("remoteip", remoteip);

    const response = await fetch(CONFIG.turnstile.verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const result = await response.json();

    console.log("Turnstile validation result:", {
      success: result.success,
      challengeTimestamp: result.challenge_ts,
      hostname: result.hostname,
      errorCodes: result["error-codes"],
    });

    if (!result.success) {
      console.error("Turnstile validation failed:", result["error-codes"]);
      return {
        success: false,
        error: result["error-codes"]?.join(", ") ?? "Verification failed",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile validation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Validation error",
    };
  }
}

// ============================================================================
// RESPONSE HELPER
// ============================================================================
function createResponse(data: any, status: number, corsHeaders: any) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
export default async (req: Request) => {
  const origin = req.headers.get("origin") || "";
  const corsHeaders = getCorsHeaders(origin);

  const clientIP =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  console.log("=== NEW REQUEST ===");
  console.log(
    `${new Date().toISOString()} - ${req.method} from ${origin} (IP: ${clientIP})`
  );
  console.log("Secrets check:", {
    TURNSTILE_SECRET_KEY: !!CONFIG.turnstile.secretKey,
  });

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return createResponse(
      { success: false, error: "Method not allowed" },
      405,
      corsHeaders
    );
  }

  try {
    let body: any;
    try {
      body = await req.json();
      console.log("Request received with token:", !!body.token);
    } catch {
      return createResponse(
        { success: false, error: "Invalid JSON in request body" },
        400,
        corsHeaders
      );
    }

    const { token } = body;
    const result = await validateTurnstile(token, clientIP);

    if (result.success) {
      console.log("Turnstile verification passed");
      return createResponse(
        { success: true, message: "Token verified successfully" },
        200,
        corsHeaders
      );
    } else {
      return createResponse(
        { success: false, error: result.error },
        400,
        corsHeaders
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return createResponse(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      500,
      corsHeaders
    );
  }
};
