import { useEffect, useRef } from "preact/hooks";

interface Props {
  name: string;
  value: string;
}

export default function MarkdownEditor({ name, value }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/easymde@2.18.0/dist/easymde.min.css";
    document.head.appendChild(link);

    const hljsLink = document.createElement("link");
    hljsLink.rel = "stylesheet";
    hljsLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css";
    document.head.appendChild(hljsLink);

    const darkStyles = document.createElement("style");
    darkStyles.textContent = `
      .editor-toolbar, .CodeMirror, .editor-preview, .editor-statusbar {
        border-color: #e2e8f0 !important;
      }
      html.dark .editor-toolbar, html.dark .CodeMirror,
      html.dark .editor-preview, html.dark .editor-statusbar {
        background: #1e293b !important;
        color: #e2e8f0 !important;
        border-color: #334155 !important;
      }
      html.dark .CodeMirror-cursor { border-color: #22d3ee !important; }
      html.dark .CodeMirror-selected { background: #334155 !important; }
      html.dark .editor-toolbar a { color: #e2e8f0 !important; }
      html.dark .editor-toolbar a:hover, html.dark .editor-toolbar a.active {
        background: #334155 !important; color: #22d3ee !important;
      }
      html.dark .CodeMirror-gutters { background: #1e293b !important; border-color: #334155 !important; }
      html.dark .editor-preview-side { background: #1e293b !important; border-color: #334155 !important; }
      html.dark .editor-preview { color: #e2e8f0 !important; }
      html.dark .editor-preview h1, html.dark .editor-preview h2, html.dark .editor-preview h3,
      html.dark .editor-preview h4, html.dark .editor-preview h5 { color: #f1f5f9 !important; }
      html.dark .editor-preview pre { background: #0f172a !important; border-color: #334155 !important; }
      html.dark .editor-statusbar { color: #64748b !important; }
    `;
    document.head.appendChild(darkStyles);

    if (!textareaRef.current) return;

    import("easymde").then(({ default: EasyMDE }) => {
      new EasyMDE({
        element: textareaRef.current!,
        initialValue: value,
        spellChecker: false,
        status: ["lines", "words", "cursor"],
        toolbar: [
          "bold", "italic", "heading", "|",
          "quote", "unordered-list", "ordered-list", "|",
          "link", "image", "|",
          "preview", "side-by-side", "fullscreen", "|",
          "guide",
        ],
      });
    });
  }, []);

  return (
    <div>
      <textarea ref={textareaRef} name={name}>{value}</textarea>
    </div>
  );
}
