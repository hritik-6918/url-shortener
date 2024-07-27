import { createClient } from '@supabase/supabase-js'; 
import {nanoid} from 'nanoid';

const supabase = createClient( 
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_KEY 
);

export default async function handler (req, res) {

if (req.method === 'POST') {

const { originalUrl} = req.body;

const id = nanoid (8); // Generate a short ID using nanoid library

const { data, error } = await supabase 
     .from('urls')
     .insert([{id, original_url: originalUrl}])
     .single();

if (error) {
    res.status(500).json({ error: 'Failed to create short URL'});
} else {
    const shortUrl = `$(req.headers.host)/$(data.id)`; 
    res.status(200).json({ shortUrl});
    }
}
 else{
    res.status(405).json({error: 'Method not allowed' });
   }
}