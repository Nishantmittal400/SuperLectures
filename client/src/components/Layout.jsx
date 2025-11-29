/**
 * Layout.jsx
 * ----------
 * Outer shell for the app.
 *
 * - Provides full-height flex layout.
 * - Centers main content using .max-width.
 * - Renders a footer at the bottom.
 */

import React from 'react';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="app-root">
      <main className="max-width">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
