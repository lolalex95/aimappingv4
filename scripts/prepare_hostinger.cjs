const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'AiMapping_Hostinger_Public_HTML');

console.log('--- Preparando paquete de producción para Hostinger ---');

// 1. Rebuild production bundle first to be 100% up to date
console.log('1. Compilando bundle de produccion con Vite...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

// 2. Clean/Create output directory
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

function copyFileSafe(srcRel, destRel) {
  const src = path.join(rootDir, srcRel);
  const dest = path.join(outDir, destRel);
  const parent = path.dirname(dest);
  if (!fs.existsSync(parent)) {
    fs.mkdirSync(parent, { recursive: true });
  }
  if (!fs.existsSync(src)) {
    console.error(`ERROR: Archivo fuente no existe: ${srcRel}`);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  const sizeMb = (fs.statSync(dest).size / (1024 * 1024)).toFixed(2);
  console.log(`  + Copiado: ${destRel} (${sizeMb} MB)`);
}

function copyDirSafe(srcRel, destRel) {
  const src = path.join(rootDir, srcRel);
  const dest = path.join(outDir, destRel);
  if (!fs.existsSync(src)) {
    console.error(`ERROR: Directorio fuente no existe: ${srcRel}`);
    process.exit(1);
  }
  fs.cpSync(src, dest, { recursive: true });
  console.log(`  + Carpeta copiada: ${destRel}`);
}

console.log('2. Copiando archivos raiz obligatorios...');
copyFileSafe('dist/index.html', 'index.html');
copyFileSafe('public/favicon.svg', 'favicon.svg');
copyFileSafe('public/logo.png', 'logo.png');
copyFileSafe('public/logo-white.png', 'logo-white.png');
copyFileSafe('public/robots.txt', 'robots.txt');
copyFileSafe('public/sitemap.xml', 'sitemap.xml');
copyFileSafe('public/demo.mp4', 'demo.mp4');

console.log('3. Copiando frames de la seccion "Como Funciona"...');
copyDirSafe('public/frames', 'frames');

console.log('4. Copiando videos y poster del Hero y Demo...');
copyFileSafe('public/Assets/hero-poster.webp', 'Assets/hero-poster.webp');
copyFileSafe('public/Assets/Vids/hero/herobg.mp4', 'Assets/Vids/hero/herobg.mp4');
copyFileSafe('public/Assets/Vids/demo/demo.mp4', 'Assets/Vids/demo/demo.mp4');

console.log('5. Copiando unicamente imagenes activas en la web...');
// Seccion Problema / Antes y Despues
copyFileSafe('public/Assets/img/1/Antes.jpg', 'Assets/img/1/Antes.jpg');
copyFileSafe('public/Assets/img/1/Despues.jpg', 'Assets/img/1/Despues.jpg');
copyFileSafe('public/Assets/img/2/problem.png', 'Assets/img/2/problem.png');

// Seccion Que Recibes
copyFileSafe('public/Assets/img/6/1a.jpg', 'Assets/img/6/1a.jpg');
copyFileSafe('public/Assets/img/6/2a.jpg', 'Assets/img/6/2a.jpg');
copyFileSafe('public/Assets/img/6/3a.jpg', 'Assets/img/6/3a.jpg');

// Seccion Sectores (Acordeon interactivo)
copyFileSafe('public/Assets/img/6/telecomunicaciones-sf.jpg', 'Assets/img/6/telecomunicaciones-sf.jpg');
copyFileSafe('public/Assets/img/6/Telecomunicaciones.jpg', 'Assets/img/6/Telecomunicaciones.jpg');
copyFileSafe('public/Assets/img/6/Energia_y_Serv_Publicos(normal).jpg', 'Assets/img/6/Energia_y_Serv_Publicos(normal).jpg');
copyFileSafe('public/Assets/img/6/Energia_y_Serv_Publicos-02(hover).jpg', 'Assets/img/6/Energia_y_Serv_Publicos-02(hover).jpg');
copyFileSafe('public/Assets/img/6/Infraestructura_Vial-(normal).jpg', 'Assets/img/6/Infraestructura_Vial-(normal).jpg');
copyFileSafe('public/Assets/img/6/Infraestructura_Vial-(hover).jpg', 'Assets/img/6/Infraestructura_Vial-(hover).jpg');

// Seccion Beneficios
if (fs.existsSync(path.join(rootDir, 'public/Assets/img/bg map.svg'))) {
  copyFileSafe('public/Assets/img/bg map.svg', 'Assets/img/bg map.svg');
}

console.log('6. Generando archivo .htaccess optimizado para Hostinger...');
const htaccessContent = `# ----------------------------------------------------------------------
# AiMapping - Hostinger Production Configuration (.htaccess)
# ----------------------------------------------------------------------

# 1. Forzar conexion segura HTTPS
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 2. Desactivar throttling / 429 de LiteSpeed para bots de IA legitimos y buscadores
RewriteCond %{HTTP_USER_AGENT} (GPTBot|ChatGPT|ClaudeBot|Claude-Web|PerplexityBot|Google-Extended|Googlebot|Applebot|bingbot|OAI-SearchBot) [NC]
RewriteRule .* - [E=nothrottle:1,E=noabort:1]

# 3. SPA Fallback / Enrutamiento limpio
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# 4. Tipos MIME correctos (WebP, MP4, SVG, WOFF2)
<IfModule mod_mime.c>
  AddType image/svg+xml .svg
  AddType image/webp .webp
  AddType video/mp4 .mp4
  AddType font/woff2 .woff2
  AddType font/woff .woff
</IfModule>

# 4. Compresion GZIP / Brotli
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# 5. Cache de navegador de alto rendimiento (PageSpeed & SEO)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  
  # HTML siempre actualizado
  ExpiresByType text/html "access plus 0 seconds"
  
  # Multimedia e Imagenes
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  
  # Fuentes
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  
  # Estilos y Scripts
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>

# 6. Encabezados de seguridad
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;

fs.writeFileSync(path.join(outDir, '.htaccess'), htaccessContent, 'utf-8');
console.log('  + Creado: .htaccess');

// 7. Calculate total size
function getDirSizeBytes(dirPath) {
  let total = 0;
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const full = path.join(dirPath, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      total += getDirSizeBytes(full);
    } else {
      total += stat.size;
    }
  }
  return total;
}

const totalBytes = getDirSizeBytes(outDir);
const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
console.log(`\n=== Paquete listo en: ${outDir} ===`);
console.log(`Tamano total optimizado: ${totalMb} MB`);

// 8. Sincronizar carpeta Hostinger/AiMapping_Hostinger y generar ZIP con fecha
const hostingerDir = path.join(rootDir, 'Hostinger');
const hostingerSubDir = path.join(hostingerDir, 'AiMapping_Hostinger');
if (!fs.existsSync(hostingerDir)) {
  fs.mkdirSync(hostingerDir, { recursive: true });
}
if (fs.existsSync(hostingerSubDir)) {
  fs.rmSync(hostingerSubDir, { recursive: true, force: true });
}
fs.cpSync(outDir, hostingerSubDir, { recursive: true });
console.log(`  + Sincronizado en: ${hostingerSubDir}`);

// Nombre del archivo zip con la fecha
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const dateStr = `${year}-${month}-${day}`;
const zipFileName = `AiMapping_Hostinger_${dateStr}.zip`;
const zipPathHostinger = path.join(hostingerDir, zipFileName);
const zipPathRoot = path.join(rootDir, zipFileName);

console.log(`\n7. Comprimiendo paquete en: ${zipFileName}...`);
// Usamos powershell Compress-Archive para incluir directamente el contenido de outDir
const psCommand = `powershell -NoProfile -Command "Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipPathHostinger}' -Force"`;
execSync(psCommand, { stdio: 'inherit' });

// Copiar también a la raíz para fácil acceso
fs.copyFileSync(zipPathHostinger, zipPathRoot);

// Mantener actualizado también el estándar AiMapping_Hostinger.zip
fs.copyFileSync(zipPathHostinger, path.join(hostingerDir, 'AiMapping_Hostinger.zip'));

const zipSizeMb = (fs.statSync(zipPathHostinger).size / (1024 * 1024)).toFixed(2);
console.log(`\n*** EXITO TOTAL ***`);
console.log(`Archivo ZIP generado: ${zipFileName} (${zipSizeMb} MB)`);
console.log(`Ubicaciones del ZIP:`);
console.log(`  1. ${zipPathHostinger}`);
console.log(`  2. ${zipPathRoot}`);
