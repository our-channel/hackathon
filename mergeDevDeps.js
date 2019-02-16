const path = require('path');
const fs = require('fs');

let argv = process.argv;

if(argv.length < 4) {
  console.log("ERROR: Must provide dependency file and package file as args", argv);
  process.exit(1);
}

let depFile = argv[2];
let pkgFile = argv[3];

let deps = JSON.parse(fs.readFileSync(depFile));
let pkg = JSON.parse(fs.readFileSync(pkgFile));

let pkgDepBlock = pkg.devDependencies;
if(!pkgDepBlock) {
   pkgDepBlock = {};
}
let scripts = pkg.scripts || {};
Object.assign(pkgDepBlock, deps.devDependencies);
Object.assign(scripts, deps.scripts);

pkg.devDependencies = pkgDepBlock;
pkg.scripts = scripts;
pkg.private = true;

fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2)); 
 
