import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="navbar-brand d-flex align-items-center" style={{ textDecoration: 'none' }}>
      <img src="/image/futecx-logo.png" alt="FUTECX" style={{ height: "28px", width: "auto" }} />
    </Link>
  );
}

