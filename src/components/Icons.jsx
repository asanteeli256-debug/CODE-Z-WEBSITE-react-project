/* The little arrow icons that were repeated inline all over the HTML */

export function ArrowUpRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUp(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
