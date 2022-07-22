import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Fonts
import 'typeface-inter'
import 'fontsource-inconsolata'

// Styles
import './styles/_index.scss'

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<App />)
