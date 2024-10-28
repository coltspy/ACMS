'use client';
import React from 'react';
import Link from 'next/link';

const APIReference = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">API Reference</h1>
      <p className="mt-2">Explore our API endpoints to manage vehicles, routes, and depots effectively.</p>
      <ul className="mt-4 space-y-2">
        <li><Link href="/api/vehicles">Vehicles API</Link></li>
        <li><Link href="/api/routes">Routes API</Link></li>
        <li><Link href="/api/depots">Depots API</Link></li>
      </ul>
    </div>
  );
};

export default APIReference;