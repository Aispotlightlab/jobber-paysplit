// Extracts the <script> from index.html, runs the calc path against a fixture in a minimal DOM shim.
const fs=require('fs');const html=fs.readFileSync('index.html','utf8');
const src=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const els={};const mk=(id,extra={})=>els[id]=Object.assign({id,options:[],classList:{remove(){},add(){}},files:[],innerHTML:'',value:'',textContent:'',checked:true,set selectedIndex(i){this.value=String(i);}, get selectedIndex(){return +this.value}},extra);
['file','paste','load','mapcard','techcol','revcol','rate','split','calc','out','table','totals','dl'].forEach(id=>mk(id));
els.rate.value='28';
global.document={getElementById:id=>els[id],createElement:()=>({click(){}})};
global.alert=m=>{throw new Error(m)};global.URL={createObjectURL:()=>''};global.Blob=class{};
eval(src);
// options setter: emulate select innerHTML -> options
Object.defineProperty(els.techcol,'innerHTML',{set(v){this.options=[...v.matchAll(/value="(\d+)">([^<]*)/g)].map(m=>({value:m[1],text:m[2]}));},get(){return ''}});
Object.defineProperty(els.revcol,'innerHTML',{set(v){this.options=[...v.matchAll(/value="(\d+)">([^<]*)/g)].map(m=>({value:m[1],text:m[2]}));},get(){return ''}});
els.paste.value='Job #,Client,Assigned To,Total\n101,"Smith, J",Mike,450.00\n102,Jones,Mike,"$320.00"\n103,Lee,"Mike; Ana",600.00\n104,Park,Ana,0\n';
els.load.onclick();
if(els.techcol.value!=='2'||els.revcol.value!=='3') throw new Error('column guess failed '+els.techcol.value+' '+els.revcol.value);
els.calc.onclick();
const t=els.table.innerHTML;
const mike=t.match(/Mike<\/td><td>([\d.]+)<\/td><td>\$([\d,.]+)<\/td><td><strong>\$([\d,.]+)/);
const ana=t.match(/Ana<\/td><td>([\d.]+)<\/td><td>\$([\d,.]+)<\/td><td><strong>\$([\d,.]+)/);
console.log('mike',mike.slice(1),'ana',ana.slice(1));console.log(els.totals.textContent);
if(mike[2]!=='1,070.00'||mike[3]!=='299.60') throw new Error('mike wrong');
if(ana[2]!=='300.00'||ana[3]!=='84.00') throw new Error('ana wrong');
if(!els.totals.textContent.startsWith('3 jobs')) throw new Error('jobs count wrong');
console.log('SELFTEST OK');
