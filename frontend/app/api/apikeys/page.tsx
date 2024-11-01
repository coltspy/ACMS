// app/api/apikeys/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Key, Copy } from "lucide-react"

interface APIKey {
  key: string
  calls_made: number
  calls_limit: number
  created_at: string
}

export default function APIKeysPage() {
  const [apiKey, setApiKey] = useState<APIKey | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchApiKey()
  }, [])

  const fetchApiKey = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/key/')
      if (!response.ok) throw new Error('Failed to fetch API key')
      const data = await response.json()
      setApiKey(data)
    } catch (err) {
      setError('Failed to fetch API key')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <h1 className="text-4xl font-bold mb-4">API Key</h1>
        <p className="text-lg text-muted-foreground">
          Use this API key to access the ACMS API
        </p>
      </div>

      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          This API key has a limit of {apiKey?.calls_limit} calls per day.
          Current usage: {apiKey?.calls_made} calls.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Your API Key</CardTitle>
          <CardDescription>Use this key to authenticate your API requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {apiKey && (
              <div className="flex items-center gap-2 p-4 bg-secondary rounded-lg">
                <code className="flex-1 font-mono">{apiKey.key}</code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(apiKey.key)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-medium">How to use this API key:</h3>
              <pre className="p-4 bg-secondary rounded-lg overflow-x-auto">
                {`# Add this header to your requests:
X-API-Key: ${apiKey?.key || 'your-api-key'}`}
              </pre>

              <pre className="p-4 bg-secondary rounded-lg overflow-x-auto">
                {`# Example curl request:
curl -H "X-API-Key: ${apiKey?.key || 'your-api-key'}" https://api.yourdomain.com/api/vehicles/`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Limits</CardTitle>
          <CardDescription>Understanding API rate limits</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Daily limit: {apiKey?.calls_limit} calls</li>
            <li>Current usage: {apiKey?.calls_made} calls</li>
            <li>Resets daily at midnight UTC</li>
            <li>Created: {apiKey?.created_at && new Date(apiKey.created_at).toLocaleString()}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}