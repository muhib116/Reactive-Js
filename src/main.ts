import { createApp } from './framework/index.js'
import Home from '@/pages/home.ts'
import './index.css'

const app = createApp(Home)
app.mount('#app')