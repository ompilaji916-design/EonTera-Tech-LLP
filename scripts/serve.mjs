import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(process.argv[2] || "out");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};
const server = createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  let path;
  try {
    path = resolve(
      root,
      "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
    );
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  if (path !== root && !path.startsWith(root + sep)) {
    res.writeHead(403);
    res.end();
    return;
  }
  try {
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    const buf = await readFile(path);
    const headers = {
      "Content-Type": mime[extname(path)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
      "Accept-Ranges": "bytes",
    };
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]),
        end = range[2]
          ? Math.min(Number(range[2]), buf.length - 1)
          : buf.length - 1;
      if (start > end || start >= buf.length) {
        res.writeHead(416, { "Content-Range": `bytes */${buf.length}` });
        res.end();
        return;
      }
      res.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${buf.length}`,
        "Content-Length": end - start + 1,
      });
      res.end(req.method === "HEAD" ? undefined : buf.subarray(start, end + 1));
    } else {
      res.writeHead(200, { ...headers, "Content-Length": buf.length });
      res.end(req.method === "HEAD" ? undefined : buf);
    }
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    try {
      res.end(await readFile(resolve(root, "404.html")));
    } catch {
      res.end("Page not found");
    }
  }
});
server.listen(port, "0.0.0.0", () =>
  console.log(
    `EonTera static preview: http://localhost:${port}\nServing ${root}`,
  ),
);
