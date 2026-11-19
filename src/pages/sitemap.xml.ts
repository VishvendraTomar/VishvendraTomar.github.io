import {cases,writing} from '../lib/content';
export function GET({site}){
 const paths=['/','/work/','/architecture/','/writing/','/about/','/contact/',...cases.map(e=>'/work/'+e.frontmatter.slug+'/'),...writing.map(e=>'/writing/'+e.frontmatter.slug+'/')];
 return new Response('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+new URL(p,site).href+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});
}
