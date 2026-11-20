import {cases,writing} from '../lib/content';
import {otherLangs,localize,isTranslated} from '../i18n/config';
export function GET({site}){
 const paths=['/','/work/','/work-with-me/','/countries/','/architecture/','/writing/','/about/','/contact/',...cases.map(e=>'/work/'+e.frontmatter.slug+'/'),...writing.map(e=>'/writing/'+e.frontmatter.slug+'/')];
 const all=[...paths,...otherLangs.flatMap(l=>paths.filter(isTranslated).map(p=>localize(p,l)))];
 return new Response('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+all.map(p=>'<url><loc>'+new URL(p,site).href+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});
}
