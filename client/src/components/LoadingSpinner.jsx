/**
 * LoadingSpinner.jsx
 * ------------------
 * Tiny visual spinner that you can plug in anywhere.
 *
 * Currently not wired into all buttons, but you can easily add it later
 * for a more polished loading feel.
 */

import React from 'react';

function LoadingSpinner({ size = 18 }) {
  const borderWidth = Math.max(2, Math.floor(size / 9));

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '999px',
        border: `${borderWidth}px solid rgba(255, 255, 255, 0.15)`,
        borderTopColor: '#ffffff',
        display: 'inline-block',
        animation: 'spin 0.8s linear infinite'
      }}
    />
  );
}

export default LoadingSpinner;
