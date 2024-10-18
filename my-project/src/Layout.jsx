import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Cloud, Home, LayoutDashboard, Moon, Settings, Sun, User } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "./components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"

// ... rest of the Layout component code ...
export default function Layout({ children }) {
  const [theme, setTheme] = React.useState("light")
  const location = useLocation()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme}`}>
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-64 bg-card text-card-foreground p-4 space-y-4 h-screen"
        >
          <div className="flex items-center space-x-2 mb-8">
            <Cloud className="h-6 w-6" />
            <span className="text-lg font-bold">AI Cloud Scheduler</span>
          </div>
          <nav className="space-y-2">
            <Link to="/">
              <Button variant={location.pathname === '/' ? "default" : "ghost"} className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant={location.pathname === '/dashboard' ? "default" : "ghost"} className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant={location.pathname === '/settings' ? "default" : "ghost"} className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">AI Cloud Scheduler</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  )
}