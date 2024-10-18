import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"

export default function Settings() {
  const [cloudLink, setCloudLink] = useState('')

  useEffect(() => {
    const savedLink = localStorage.getItem('cloudModelLink')
    if (savedLink) {
      setCloudLink(savedLink)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('cloudModelLink', cloudLink)
    alert('Cloud model link saved successfully!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your AI Cloud Scheduler</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cloudLink">Cloud Model Link</Label>
              <Input
                id="cloudLink"
                placeholder="Enter your cloud model API endpoint"
                value={cloudLink}
                onChange={(e) => setCloudLink(e.target.value)}
              />
            </div>
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}