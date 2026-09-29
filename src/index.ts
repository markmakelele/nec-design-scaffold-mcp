import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const TOKENS = {
  colors: { light: { bg: "#FFFFFF", fg: "#000000", line: "#000000" }, dark: { bg: "#000000", fg: "#FFFFFF", line: "#FFFFFF" } },
  typography: { display: "Xanh Mono", structure: "Overpass Mono", body: "Fira Code", trackingPx: ["0.8px", "1.2px", "1.6px", "2.4px"], leadingPt: ["1.2pt", "1.6pt", "2.0pt", "2.4pt"] },
  layout: { railDesktop: "92px", railMobile: "54px", padding: "clamp(24px,4vw,62px)" },
  motion: { flipDuration: "820ms", flipEase: "cubic-bezier(.22,.78,.18,1)", perspective: "1400px" },
  structure: { rule: "1px solid currentColor", disclosure: "front → flip → back → enter" }
};

const result = (value: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] });
const server = new McpServer({ name: "nec-design-scaffold-mcp", version: "0.1.0" });

server.tool("nec_tokens", "Return the NEC design tokens.", {}, async () => result(TOKENS));

server.tool("nec_typography", "Return NEC typography guidance.", { level: z.enum(["system","H1","H2","H3","body","meta"]).default("system") }, async ({ level }) => {
  const system = { display: "Xanh Mono", structure: "Overpass Mono", body: "Fira Code", tracking: "0.8–2.4px", leading: "1.2–2.4pt breathing space" };
  const levels = { H1: ["Xanh Mono","1.2–2.4px"], H2: ["Xanh Mono","1.2px"], H3: ["Xanh Mono","1.2px"], body: ["Fira Code","0.8px"], meta: ["Overpass Mono","1.6–2.4px"] } as const;
  return result(level === "system" ? system : { font: levels[level][0], tracking: levels[level][1], leading: "open" });
});

server.tool("nec_layout", "Return the NEC layout system.", {}, async () => result({ rail: "92px", mobileRail: "54px", padding: TOKENS.layout.padding, grid: "editorial / asymmetric", rules: "1px structural rules", principle: "proportion rather than ornament" }));
server.tool("nec_motion", "Return NEC motion rules.", {}, async () => result({ duration: "820ms", easing: TOKENS.motion.flipEase, perspective: "1400px", transform: "rotateY(180deg)", reducedMotion: "disable transitions" }));

server.tool("nec_tile", "Generate an NEC flip tile.", { index: z.string(), title: z.string(), description: z.string(), href: z.string().optional() }, async ({ index, title, description, href }) => result({ html: `<article class="nec-tile" tabindex="0"><div class="nec-tile-inner"><div class="nec-face nec-front"><span class="nec-index">${index}</span><h2>${title}</h2></div><div class="nec-face nec-back"><span class="nec-index">${index}</span><h3>${title}</h3><p>${description}</p>${href ? `<a href="${href}">Open page ↗</a>` : ""}</div></div></article>`, css: `.nec-tile{perspective:1400px}.nec-tile-inner{position:relative;min-height:360px;transform-style:preserve-3d;transition:transform 820ms cubic-bezier(.22,.78,.18,1)}.nec-tile.is-flipped .nec-tile-inner{transform:rotateY(180deg)}.nec-face{position:absolute;inset:0;backface-visibility:hidden;padding:24px}.nec-back{background:#000;color:#fff;transform:rotateY(180deg)}` }));

server.tool("nec_scaffold", "Generate a bare-bones NEC HTML scaffold.", { title: z.string().default("NEC") }, async ({ title }) => result({ html: `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>:root{--bg:#fff;--fg:#000;--line:#000;--flip:820ms;--ease:cubic-bezier(.22,.78,.18,1)}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:'Overpass Mono',monospace}.rail{position:fixed;inset:0 auto 0 0;width:92px;border-right:1px solid #000}.main{margin-left:92px;padding:clamp(24px,4vw,62px)}h1{font:400 clamp(76px,14vw,190px)/1 'Xanh Mono',serif;letter-spacing:1.2px}</style></head><body><nav class="rail"></nav><main class="main"><h1>${title}</h1></main></body></html>` }));

server.tool("nec_validate", "Check source against NEC scaffold requirements.", { source: z.string() }, async ({ source }) => {
  const checks = [
    ["Xanh Mono", /XanhMono|Xanh Mono/.test(source)], ["Overpass Mono", /OverpassMono|Overpass Mono/.test(source)], ["Fira Code", /FiraCode|Fira Code/.test(source)], ["1px rule", /1px\s+solid/.test(source)], ["92px rail", /92px/.test(source)], ["820ms flip", /820ms/.test(source)], ["NEC easing", /cubic-bezier\(\.22,\.78,\.18,1\)/.test(source)], ["3D flip", /rotateY\(180deg\)/.test(source)]
  ];
  return result({ status: checks.every(([, ok]) => ok) ? "aligned" : "partial", checks: checks.map(([name, ok]) => ({ name, ok })) });
});

await server.connect(new StdioServerTransport());
