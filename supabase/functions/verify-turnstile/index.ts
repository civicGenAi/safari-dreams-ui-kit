// supabase edge function to verify Cloudflare Turnstile token
// This function expects a POST request with JSON body: { token: string }
// It forwards the token to Cloudflare's siteverify endpoint using the secret key stored in the environment.
// Returns { success: boolean, error?: string }

export default async (req: Request) => {
    try {
        const { token } = await req.json();
        if (!token) {
            return new Response(JSON.stringify({ success: false, error: 'Missing token' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const secret = Deno.env.get('TURNSTILE_SECRET_KEY');
        if (!secret) {
            return new Response(JSON.stringify({ success: false, error: 'Server misconfiguration' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const form = new URLSearchParams({
            secret,
            response: token,
        });

        const cfResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: form.toString(),
        });
        const cfData = await cfResp.json();

        if (cfData.success) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ success: false, error: cfData['error-codes']?.join(', ') ?? 'Verification failed' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: (e as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
