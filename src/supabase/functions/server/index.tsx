import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { supabase, initializeStorage } from "./database.tsx";

const app = new Hono();

// Initialize storage bucket on startup
initializeStorage();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-5e752b5e/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all prospects
app.get("/make-server-5e752b5e/prospects", async (c) => {
  try {
    const { data, error } = await supabase
      .from('prospects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return c.json({ prospects: data || [] });
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get prospect by slug (for public page)
app.get("/make-server-5e752b5e/prospects/slug/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    console.log('Looking for prospect with slug:', slug);
    
    const { data: prospect, error: prospectError } = await supabase
      .from('prospects')
      .select('*')
      .eq('company_slug', slug)
      .single();
    
    if (prospectError) {
      console.error('Prospect error:', prospectError);
      return c.json({ 
        error: 'Prospect not found', 
        message: prospectError.message,
        details: prospectError.details,
        hint: prospectError.hint,
        code: prospectError.code
      }, 404);
    }
    
    if (!prospect) {
      return c.json({ error: 'Prospect not found', message: `No prospect with slug "${slug}"` }, 404);
    }
    
    console.log('Found prospect:', prospect.id);
    
    // Get latest audit
    const { data: audit, error: auditError } = await supabase
      .from('audits')
      .select('*')
      .eq('prospect_id', prospect.id)
      .order('completed_at', { ascending: false })
      .limit(1)
      .single();
    
    if (auditError && auditError.code !== 'PGRST116') {
      console.error('Audit error:', auditError);
    }
    
    // Get assets
    const { data: assets, error: assetsError } = await supabase
      .from('assets')
      .select('*')
      .eq('prospect_id', prospect.id);
    
    if (assetsError) {
      console.error('Assets error:', assetsError);
    }
    
    return c.json({ 
      prospect, 
      audit: audit || null, 
      assets: assets || [] 
    });
  } catch (error) {
    console.error('Error fetching prospect by slug:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return c.json({ 
      error: 'Server error', 
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    }, 500);
  }
});

// Get prospect by ID (for audit form)
app.get("/make-server-5e752b5e/prospects/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const { data: prospect, error: prospectError } = await supabase
      .from('prospects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (prospectError) throw prospectError;
    
    // Get latest audit
    const { data: audit } = await supabase
      .from('audits')
      .select('*')
      .eq('prospect_id', id)
      .order('completed_at', { ascending: false })
      .limit(1)
      .single();
    
    // Get assets
    const { data: assets } = await supabase
      .from('assets')
      .select('*')
      .eq('prospect_id', id);
    
    return c.json({ 
      prospect, 
      audit: audit || null, 
      assets: assets || [] 
    });
  } catch (error) {
    console.error('Error fetching prospect:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Check if slug exists
app.get("/make-server-5e752b5e/prospects/check-slug/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const { data, error } = await supabase
      .from('prospects')
      .select('id')
      .eq('company_slug', slug)
      .single();
    
    return c.json({ exists: !!data });
  } catch (error) {
    return c.json({ exists: false });
  }
});

// Create prospect
app.post("/make-server-5e752b5e/prospects", async (c) => {
  try {
    const body = await c.req.json();
    
    const { data, error } = await supabase
      .from('prospects')
      .insert([body])
      .select()
      .single();
    
    if (error) throw error;
    return c.json({ prospect: data });
  } catch (error) {
    console.error('Error creating prospect:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Update prospect
app.put("/make-server-5e752b5e/prospects/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const { data, error } = await supabase
      .from('prospects')
      .update(body)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return c.json({ prospect: data });
  } catch (error) {
    console.error('Error updating prospect:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Create or update audit
app.post("/make-server-5e752b5e/audits", async (c) => {
  try {
    const body = await c.req.json();
    const { prospect_id, ...auditData } = body;
    
    // Check if audit exists
    const { data: existing } = await supabase
      .from('audits')
      .select('id')
      .eq('prospect_id', prospect_id)
      .single();
    
    let result;
    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('audits')
        .update(auditData)
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Create new
      const { data, error } = await supabase
        .from('audits')
        .insert([{ prospect_id, ...auditData }])
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    }
    
    return c.json({ audit: result });
  } catch (error) {
    console.error('Error saving audit:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Upload file and create asset record
app.post("/make-server-5e752b5e/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const prospectId = formData.get('prospect_id') as string;
    const companySlug = formData.get('company_slug') as string;
    const label = formData.get('label') as string;
    const kind = formData.get('kind') as string || 'screenshot';
    
    if (!file || !prospectId || !companySlug || !label) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Generate file path
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}_${label}.${fileExt}`;
    const filePath = `${companySlug}/${fileName}`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('screens')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      });
    
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('screens')
      .getPublicUrl(filePath);
    
    // Create asset record
    const { data: asset, error: assetError } = await supabase
      .from('assets')
      .insert([{
        prospect_id: prospectId,
        kind,
        label,
        url: publicUrl
      }])
      .select()
      .single();
    
    if (assetError) throw assetError;
    
    return c.json({ asset, url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Delete asset
app.delete("/make-server-5e752b5e/assets/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    // Get asset to find file path
    const { data: asset } = await supabase
      .from('assets')
      .select('*')
      .eq('id', id)
      .single();
    
    if (asset) {
      // Extract file path from URL
      const urlParts = asset.url.split('/screens/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('screens').remove([filePath]);
      }
    }
    
    // Delete asset record
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting asset:', error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);