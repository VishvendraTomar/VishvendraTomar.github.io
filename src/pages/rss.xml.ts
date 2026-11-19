import {writing} from '../lib/content';
const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function GET({site}){
 const items=writing.map(({frontmatter:f})=>{const url=new URL('/writing/'+f.slug+'/',site).href;return `<item><title>${escape(f.title)}</title><description>${escape(f.summary)}</description><link>${url}</link><guid>${url}</guid><pubDate>${new Date(f.date).toUTCString()}</pubDate></item>`}).join('');
 return new Response(`<?xml version="1.0"?><rss version="2.0"><channel><title>Writing by Vishvendra Tomar</title><description>Backend and AI engineering</description><link>${site}</link>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml'}});
}
