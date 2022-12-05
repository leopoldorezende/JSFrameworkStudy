export default class Structure {

    static version = '0.1'
    static description = 'Structural class for components'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'
    
    // Private vars
    #container
    #defaultProps
    #renderComplete
    #stateContext

    /**
     * @param {object} defaultProps
     * @param {object} props
     */
    constructor(defaultProps, props) {
        
        const self = this 

        this.#container = document.createElement('div')
        this.#defaultProps = defaultProps
        this.#renderComplete = false

        // React to props change
        this.props = new Proxy({...defaultProps, ...props}, {
            set(target, property, value) {

                if(target[property] != value) {
                    Reflect.set(target, property, value)

                    var waitRendering = setInterval(function() {
                        if(self.#renderComplete) {
                            self.render()
                            clearInterval(waitRendering)
                        }
                    }, 0)
                }
                return true
            }
        })
        
        if(typeof this.routeChanged === 'function') {
            root.historyChanged[this.constructor.name] = () => {
                this.#stateContext = 'mounted'
                this.routeChanged(this.props)
            }
        }
        
        this.render()
        this.#applyStyle()
        
        return this
    }

    get getDefaultProps () {
        /// Return default properties

        return {...this.#defaultProps}
    }

    get component () {
        /// Return html component

        return this.#container
    }

    get _ () {
        /// Shortcut for this.props.injection

        return this.props.injection ? this.props.injection : {}
    }

    get $ () {
        /// Shortcut for this.component selector

        return this.component.querySelector.bind(this.component)
    }

    get $$ () {
        /// Shortcut for this.component selector all elements

        return this.component.querySelectorAll.bind(this.component)
    }

    /**
     * @param {object} obj
     */
    setState (obj) {
        /// Set value in root.state

        const key = Object.keys(obj)

        if(!root.stateCore) root.stateCore = {}
        
        if(root.state[key] != obj[key]) {
            root.state[key] = obj[key]

            if(root.stateCore[key]) {
                
                root.stateCore[key].forEach((instance) => {
                    instance.component.querySelectorAll('[data-state="'+key+'"]').forEach((el) => {
                        el.innerHTML = root.state[key]
                    })

                    if(typeof instance.stateChanged === 'function') {
                        instance.stateChanged(this.props)
                    }
                })
            }
        }

        const stateInContext = {
            template: '<ins data-state="'+key+'">'+root.state[key]+'</ins>',
            mounted: root.state[key]
        }

        return stateInContext[this.#stateContext]
    }

    /**
     * @param {any} value
     */
     getState (key) {
        /// Get value in root.state
        
        if(!root.stateCore) root.stateCore = {}

        const processedState = root.state[key] !== undefined ? root.state[key] : ''
        const stateInContext = {
            template: '<ins data-state="'+key+'">'+processedState+'</ins>',
            mounted: root.state[key]
        }
        
        //if(stateCore[key].map(el => el == this).length == 0) {
        if(!root.stateCore[key]) root.stateCore[key] = []
        root.stateCore[key].push(this)

        return stateInContext[this.#stateContext]
    }
    
    render () {
        /// Render method
        const focus = document.activeElement.id

        if(typeof this.init === 'function') {
            this.init(this.props)
        }
        if(typeof this.template === 'function') {
            this.#stateContext = 'template'
            this.component.innerHTML = this.template(this.props)
        }
        if(typeof this.mounted === 'function') {
            this.#stateContext = 'mounted'
            this.mounted(this.props)
        }
        if(focus != '') {
            this.component.querySelector('#'+focus).focus()
        }

        this.#renderComplete = true
    }

    /**
     * @param {function} fn
     */
    filled (fn) {
        /// Component callback

        fn(this)

        return this
    }

    /**
     * @param {element} target
     */
    include (target) {
        /// Include component in a HTML element (target)
        target.append(this.component)

        return this
    }
    
    #applyStyle () {
        /// Private method for factore the CSS style

        this.component.classList.add('component'+this.constructor.name)
        
        if(typeof this.style === 'function') {

            let styleTag
        
            if(document.querySelectorAll('[data-componentstyle]').length > 0) {
                styleTag = document.querySelector('[data-componentstyle]')
            }
            else {
                styleTag = document.createElement('style')
                styleTag.setAttribute('type', 'text/css')
                styleTag.setAttribute('data-componentstyle', true)

                styleTag.innerHTML = 'ins {text-decoration: none}\n'
            }
            
            if(styleTag.innerHTML.search('.component'+this.constructor.name+' {') == -1) {
                let css = this.style(this.props).replace(/\n\s+/g, '').split(/[{}]+/) // CSS disassemble
                let newcss = ''
                
                css.pop()
                css.forEach((el, i) => {
                    newcss += (i % 2 == 0) ? '.component'+this.constructor.name+' '+el+'{\n' : el+'\n}\n'
                }) 
                
                styleTag.innerHTML += newcss
                document.head.appendChild(styleTag)
            }
        }   
    }
}