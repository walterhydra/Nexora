import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env file manually into process.env for local serverless functions
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let val = parts.slice(1).join('=').trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      if (key) {
        process.env[key] = val;
      }
    }
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'api-serverless-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/')) {
            const apiPath = req.url.split('?')[0];
            const filePath = path.join(__dirname, apiPath + '.js');
            if (fs.existsSync(filePath)) {
              try {
                // Dynamically reload .env file on every API request to pick up changes instantly
                const localEnvPath = path.join(__dirname, '.env');
                if (fs.existsSync(localEnvPath)) {
                  const envContent = fs.readFileSync(localEnvPath, 'utf-8');
                  envContent.split('\n').forEach(line => {
                    const parts = line.split('=');
                    if (parts.length >= 2) {
                      const key = parts[0].trim();
                      let val = parts.slice(1).join('=').trim();
                      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                        val = val.substring(1, val.length - 1);
                      }
                      if (key) {
                        process.env[key] = val;
                      }
                    }
                  });
                  console.log('[Vite Config Middleware] Reloaded env. BREVO_API_KEY present:', !!process.env.BREVO_API_KEY);
                } else {
                  console.log('[Vite Config Middleware] .env file not found at:', localEnvPath);
                }

                let body = {};
                if (req.method === 'POST') {
                  body = await new Promise((resolve) => {
                    let data = '';
                    req.on('data', chunk => data += chunk);
                    req.on('end', () => {
                      try {
                        resolve(JSON.parse(data));
                      } catch {
                        resolve({});
                      }
                    });
                  });
                }
                
                const mockReq = {
                  method: req.method,
                  body,
                  headers: req.headers,
                };
                
                const mockRes = {
                  statusCode: 200,
                  status(code) {
                    res.statusCode = code;
                    this.statusCode = code;
                    return this;
                  },
                  json(data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                    return this;
                  },
                  setHeader(name, value) {
                    res.setHeader(name, value);
                    return this;
                  },
                  end(data) {
                    res.end(data);
                    return this;
                  }
                };

                const fileUrl = pathToFileURL(filePath).href;
                const module = await import(fileUrl);
                await module.default(mockReq, mockRes);
                return;
              } catch (err) {
                console.error('API middleware error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
                return;
              }
            }
          }
          next();
        });
      }
    }
  ],
})
