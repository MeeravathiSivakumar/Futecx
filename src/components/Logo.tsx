import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`d-flex align-items-center ${className}`} style={{ userSelect: 'none' }}>
      <span className="fw-black" style={{ 
        fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif", 
        fontSize: '2.2rem', 
        fontWeight: 900, 
        fontStyle: 'italic',
        letterSpacing: '-1.5px',
        lineHeight: 1
      }}>
        <span style={{ color: '#0b1220' }}>FU</span>
        <span style={{ 
          background: 'linear-gradient(90deg, #0d6efd 0%, #0dcaf0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}>TECX</span>
      </span>
      <div className="ms-1" style={{ display: 'flex', flexDirection: 'column', gap: '3px', transform: 'skewX(-15deg)' }}>
        <div style={{ width: '12px', height: '4px', background: '#0d6efd', borderRadius: '2px' }}></div>
        <div style={{ width: '8px', height: '4px', background: '#0dcaf0', borderRadius: '2px' }}></div>
      </div>
    </div>
  );
}
