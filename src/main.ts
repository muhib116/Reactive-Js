import { createApp } from './framework/index.js'
import Home from '@/pages/home.js'
import './index.css'

const app = createApp(Home)
app.mount('#app')