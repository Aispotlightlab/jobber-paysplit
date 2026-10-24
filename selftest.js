// Extracts the <script> from index.html, runs the calc path against a fixture in a minimal DOM shim.
const fs=require('fs');const html=fs.readFileSync('index.html','utf8');
const src=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const els={};const mk=(id,extra={})=>els[id]=Object.assign({id,options:[],classList:{remove(){},add(){}},files:[],innerHTML:'',value:'',textContent:'',checked:true,set selectedIndex(i){this.value=this.options[i]?String(this.options[i].value):String(i);}, get selectedIndex(){return this.options.findIndex(o=>o.value===this.value)}},extra);
['file','paste','load','mapcard','techcol','revcol','revcol2','rate','split','calc','out','table','totals','dl'].forEach(id=>mk(id));
els.rate.value='28';
global.document={getElementById:id=>els[id],createElement:()=>({click(){}})};
global.alert=m=>{throw new Error(m)};global.URL={createObjectURL:()=>''};global.Blob=class{};
eval(src);
// options setter: emulate select innerHTML -> options
Object.defineProperty(els.techcol,'innerHTML',{set(v){this.options=[...v.matchAll(/value="(\d+)">([^<]*)/g)].map(m=>({value:m[1],text:m[2]}));},get(){return ''}});
Object.defineProperty(els.revcol2,'innerHTML',{set(v){this.options=[...v.matchAll(/value="(-?\d+)">([^<]*)/g)].map(m=>({value:m[1],text:m[2]}));},get(){return ''}});
Object.defineProperty(els.revcol,'innerHTML',{set(v){this.options=[...v.matchAll(/value="(\d+)">([^<]*)/g)].map(m=>({value:m[1],text:m[2]}));},get(){return ''}});
els.paste.value='Job #,Client,Assigned To,Total\n101,"Smith, J",Mike,450.00\n102,Jones,Mike,"$320.00"\n103,Lee,"Mike; Ana",600.00\n104,Park,Ana,0\n';
els.revcol2.value='-1';
els.load.onclick();
if(els.revcol2.value!=='-1') throw new Error('revcol2 should stay none for Jobs export, got '+els.revcol2.value);
if(els.techcol.value!=='2'||els.revcol.value!=='3') throw new Error('column guess failed '+els.techcol.value+' '+els.revcol.value);
els.calc.onclick();
const t=els.table.innerHTML;
const mike=t.match(/Mike<\/td><td>([\d.]+)<\/td><td>\$([\d,.]+)<\/td><td><strong>\$([\d,.]+)/);
const ana=t.match(/Ana<\/td><td>([\d.]+)<\/td><td>\$([\d,.]+)<\/td><td><strong>\$([\d,.]+)/);
console.log('mike',mike.slice(1),'ana',ana.slice(1));console.log(els.totals.textContent);
if(mike[2]!=='1,070.00'||mike[3]!=='299.60') throw new Error('mike wrong');
if(ana[2]!=='300.00'||ana[3]!=='84.00') throw new Error('ana wrong');
if(!els.totals.textContent.startsWith('3 jobs')) throw new Error('jobs count wrong');
// Test 2: Jobber Visits report shape (two revenue columns, TechSplit guide 2026-10-11)
els.paste.value='Date,Job #,Assigned to,Line items,One-off job ($),Visit based ($)\n2026-10-01,201,Mike,Mow,0,120.00\n2026-10-02,202,Mike,Install,800.00,0\n2026-10-03,203,"Mike, Ana",Cleanup,0,200.00\n';
els.load.onclick();
if(els.techcol.value!=='2'||els.revcol.value!=='4'||els.revcol2.value!=='5') throw new Error('visits column guess failed '+els.techcol.value+' '+els.revcol.value+' '+els.revcol2.value);
els.calc.onclick();
const t2=els.table.innerHTML;
const m2=t2.match(/Mike<\/td><td>([\d.]+)<\/td><td>\$([\d,.]+)<\/td><td><strong>\$([\d,.]+)/);
const a2=t2.match(/Ana<\/td><td>([\d.]+)<\/td><td>\$([\d,.]+)<\/td><td><strong>\$([\d,.]+)/);
console.log('visits mike',m2.slice(1),'ana',a2.slice(1));
if(m2[2]!=='1,020.00'||m2[3]!=='285.60') throw new Error('visits mike wrong');
if(a2[2]!=='100.00'||a2[3]!=='28.00') throw new Error('visits ana wrong');
if(!els.totals.textContent.startsWith('3 jobs')) throw new Error('visits jobs count wrong');
console.log('SELFTEST OK');
