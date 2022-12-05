// Import app
import App from './App.js'
import style from './App.css' assert { type: 'css' }

// Import pages
import Home from './app/pages/Home.js'
import About from './app/pages/About.js'
import Contact from './app/pages/Contact.js'

// Import components
import Header from  './app/components/Header.js'
import Menu from  './app/components/Menu.js'
import MenuItem from  './app/components/MenuItem.js'
import Form from  './app/components/Form.js'
import Input from  './app/components/Input.js'
import Loading from  './app/components/Loading.js'

// Import core
import Router from './core/router.js'
import ShortRequest from './core/shortrequest.js'

// Root
const root = window.root = {state: {}, historyChanged: {}}

root.loading = new Loading()
root.shortRequest = ShortRequest

// App
root.app = new App({
    injection: {
        Header: new Header(),
        Menu: new Menu({
            injection: {
                MenuItem: MenuItem
            }
        })
    }
})

// Routes
new Router({
    routes: {
        '/': () => new Home({
            title: 'Wellcome!',
            injection: {
                Form: Form,
                Input: Input
            }
        }), 
        '/about': () => new About(),
        '/contact': () => new Contact()
    },
    pathURL: '',
    pageContainer: root.app.$('#page'),
})

// DOM
document.adoptedStyleSheets = [style]
document.getElementById('root').append(root.app.component)