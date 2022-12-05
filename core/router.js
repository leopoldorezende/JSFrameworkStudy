export default class Router {

    static version = '0.1'
    static description = 'Simple Router'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'

    /**
     * @param {object} config
     */
    constructor(config) {

        this.routes = config.routes
        this.pageContainer = config.pageContainer
        this.pathURL = config.pathURL
        this.pages = {}

        // Browser history change
        window.onpopstate = () => {
            this.#appendPage()
        }

        // Apply routes in menu
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('[route]').forEach((el) => {
                el.addEventListener('click', (el) => {
                    this.navigate(this.pathURL+el.target.getAttribute('route'))
                })
            })
        })

        this.#appendPage()
    }
    
    navigate(pathname) {
        // Navigate to route
        window.history.pushState(
            {},
            pathname,
            window.location.origin + pathname
        )
        this.#appendPage()
    }

    // Private methods
    #appendPage() {
        const path = new URL(window.location.href).pathname

        // Save page in cache
        if(typeof this.pages[path] === 'undefined') {
            this.pages[path] = this.routes[path]()
        }

        this.pageContainer.innerHTML = '' 
        this.pageContainer.append(this.pages[path].component) // Add new page in container

        // Run routeChanged in all components 
        Object.keys(root.historyChanged).forEach(key => {
            if(key != this.pages[path].constructor.name) {
                root.historyChanged[key]()
            }
        })

        if(typeof this.pages[path].routeChanged === 'function') {
            this.pages[path].routeChanged(this.pages[path].props)
        }
    }
}