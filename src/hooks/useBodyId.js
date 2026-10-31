import { useLayoutEffect } from 'react';

/* The About and Services pages had <body id="top"> (the "Back to top" target). */
export default function useBodyId(id) {
  useLayoutEffect(() => {
    document.body.id = id;
    return () => document.body.removeAttribute('id');
  }, [id]);
}
