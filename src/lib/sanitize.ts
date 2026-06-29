import sanitizeHtml from "sanitize-html";

/**
 * Sanitize HTML content from the blog editor (Tiptap).
 * 
 * Strips dangerous tags like <script>, <iframe>, event handlers (onclick, etc.)
 * while preserving all safe formatting tags used by the blog editor.
 */
export function sanitizeBlogContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      // Block elements
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "div", "blockquote", "pre", "code",
      "ul", "ol", "li",
      "table", "thead", "tbody", "tr", "th", "td",
      "hr", "br",
      // Inline elements
      "strong", "b", "em", "i", "u", "s", "strike",
      "a", "span", "sub", "sup", "mark",
      // Media (images only — no iframes/embeds)
      "img", "figure", "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      span: ["style"],
      p: ["style"],
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      "*": ["class", "id"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
    // Force all links to open in new tab safely
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    },
    // Strip all tags not in the allow list (don't just escape them)
    disallowedTagsMode: "discard",
  });
}
