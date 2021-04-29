const { execSync } = require('child_process');
const { readFileSync } = require('fs');
console.log('Running webpack');
execSync('yarn webpack --mode=development ./src/index.jsx', { encoding: 'utf8' });

console.log('Checking the output js for identical versions');
const webpacked = readFileSync('./dist/main.js', { encoding: 'utf8' });
const srcFiles = [...webpacked.matchAll(/\!\*\*\* (\.\/\.yarn\/.*) \*\*\*\!/g)]
  .map(m => {
     const [prefix, suffix] =  m[1].split('/cache/');
     return {
       prefix, 
       suffix
     }
  })
  .filter(f => f.prefix && f.suffix)
  .sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0);
// console.log(JSON.stringify(srcFiles, null, 2));
const duplicates = findDuplicates(srcFiles);

if (duplicates.length > 0) {
  console.log('🚨 Found duplicate code included in webpacked bundle for versions :', duplicates);
  // console.log('All included files:', [...srcFiles]);
  process.exit(1);
}
console.log('👍 No duplicates');
process.exit(0);

function findDuplicates(arr) {
  const results = [];
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    const curr = arr[i];
    const next = arr[i+1];
    if (curr?.suffix === next?.suffix) {
      if (!results.includes(curr)) {
        results.push(curr);
      } 
      if (!results.includes(next)) {
        results.push(next);
      }      
    }
  }
  return results;
}