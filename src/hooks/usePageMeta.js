import { useEffect } from 'react';

/* Sets the tab title (and the meta description when a page has one),
   like the <title> / <meta> tags in each original .html file. */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let meta = null;
    let created = false;
    let prevContent = null;

    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
        created = true;
      } else {
        prevContent = meta.getAttribute('content');
      }
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (meta) {
        if (created) meta.remove();
        else if (prevContent !== null) meta.setAttribute('content', prevContent);
      }
    };
  }, [title, description]);
}
