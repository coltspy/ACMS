'use client';

import { Badge } from "@/components/ui/badge";
import { FileCode, Terminal } from "lucide-react";
import Link from "next/link";

export default function ExamplesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Examples</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Code Examples</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Python Examples */}
        <Link href="/examples/python">
          <div className="p-6 border rounded-lg cursor-pointer hover:border-blue-500 transition-all">
            <div className="flex items-center space-x-2 mb-4">
              <FileCode className="h-5 w-5 text-blue-500" />
              <h3 className="text-xl font-semibold">Python Examples</h3>
            </div>
            <p className="text-gray-600">
              Python code examples for integrating with our API.
            </p>
          </div>
        </Link>

        {/* JavaScript Examples */}
        <Link href="/examples/javascript">
          <div className="p-6 border rounded-lg cursor-pointer hover:border-yellow-500 transition-all">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-5 w-5 text-yellow-500" />
              <h3 className="text-xl font-semibold">JavaScript Examples</h3>
            </div>
            <p className="text-gray-600">
              JavaScript code examples for integrating with our API.
            </p>
          </div>
        </Link>

        {/* Tracking Examples */}
        <Link href="/examples/tracking">
          <div className="p-6 border rounded-lg cursor-pointer hover:border-green-500 transition-all">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-5 w-5 text-green-500" />
              <h3 className="text-xl font-semibold">Tracking Examples</h3>
            </div>
            <p className="text-gray-600">
              Examples of vehicle tracking implementation.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}