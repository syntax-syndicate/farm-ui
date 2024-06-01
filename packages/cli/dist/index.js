import"dotenv/config";import{Command as z}from"commander";import"dotenv/config";import{existsSync as b,promises as P}from"fs";import m from"path";import F from"gradient-string";import{Command as G}from"commander";import N from"ora";import{execa as U}from"execa";import v from"prompts";var x=`
\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591 
\u2591\u2592\u2593\u2588\u2593\u2592\u2591     \u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591 
\u2591\u2592\u2593\u2588\u2593\u2592\u2591     \u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591 
\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591 
\u2591\u2592\u2593\u2588\u2593\u2592\u2591     \u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591 
\u2591\u2592\u2593\u2588\u2593\u2592\u2591     \u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591  
\u2591\u2592\u2593\u2588\u2593\u2592\u2591     \u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2591\u2592\u2593\u2588\u2593\u2592\u2591  v0.0.1 

                                                                               
`;import f from"chalk";var e={error(...t){console.log(f.red(...t))},warn(...t){console.log(f.yellow(...t))},info(...t){console.log(f.cyan(...t))},success(...t){console.log(f.green(...t))},break(){console.log("")}};import{z as w}from"zod";import{detect as E}from"@antfu/ni";async function I(t){let n=await E({programmatic:!0,cwd:t});return n==="yarn@berry"?"yarn":n==="pnpm@6"?"pnpm":n==="bun"?"bun":n??"npm"}process.on("SIGINT",()=>process.exit(0));process.on("SIGTERM",()=>process.exit(0));var D="https://farmui-api.vercel.app/api/components",J=w.object({id:w.string(),cwd:w.string()});console.log(F("pink","blue")(x));var T=new G().name("add").description("add a new component or UI from farmui").argument("<string>","id of the component from https://farmui.com").option("-c, --cwd <cwd>","the working directory. defaults to the current directory.",process.cwd()).action(async(t,n)=>{let l=J.parse({id:t,...n}),s=m.resolve(l.cwd),g="react";b(s)||(e.error(`There is no ${s} exists your paths.`),process.exit(0));let y="components",R=process.cwd()===l.cwd;try{if(!R)e.info(`We are dumping the component inside of ${s} `);else{let{dir:o}=await v({type:"text",name:"dir",message:"A directory to dump the components? ",hint:"components "});o&&(y=o)}let h=m.join(s,y),i=m.join(h,"/farmui"),r=(await(await fetch(D)).json()).find(o=>o.id===l.id);if(r||(e.error("No such component exists with in this ID."),process.exit(0)),b(i)){let{proceed:o}=await v({type:"confirm",name:"proceed",message:"Ready to install components and dependencies. Proceed?",initial:!0});o||(e.info("Make sure you have the right path to dump the components"),process.exit(0))}else await P.mkdir(i,{recursive:!0});let c=[],S=r.files[0].root.name;console.log(r.files[0].root.contents[g]);let $=r.files[0].root.contents[g].content,j=m.join(i,S),k=[];r[1]&&(k=r.files[1].child),c.push({comp_content:$,comp_path:j});let H=[];k.map(o=>{let p=o.name,_=o.contents[g].content,d=m.join(i,p);c.push({comp_content:_,comp_path:d})});let u=N("Dumping your components...");u.start();let a=r.dependencies;c?c.map(async({comp_content:o,comp_path:p})=>{await P.writeFile(`${p}.tsx`,o)}):e.warn("No component to add");let A=await I(s);if(a?.length&&await U(`${A}`,["install",...a],{cwd:process.cwd()}),u.stop(),a.length&&(e.info(`Dependencies - ${a.length} added`),a.map(o=>{e.success(` + ${o}`)})),c){let o=i.split("/"),p=o[o.length-2]+"/"+o[o.length-1];e.info(`Components - ${c.length} added inside of ${p}`),c.map(_=>{let d=_.comp_path.split("/"),C=d[d.length-1];e.success(` + ${C}`)})}u.succeed("Successfully installed")}catch(h){e.error("Error has occured!"),console.log("Error: ",h)}});import O from"path";import B from"fs-extra";function M(){let t=O.join("package.json");return B.readJSONSync(t)}process.on("SIGINT",()=>process.exit(0));process.on("SIGTERM",()=>process.exit(0));async function L(){let t=await M(),n=new z().name("farmui").description("Add natively farmed farmUI blocks ").version(t.version||"0.1.0","-v, --version","display the version number");n.addCommand(T),n.parse()}L();
//# sourceMappingURL=index.js.map