import Structure from  "../../core/structure.js"

/**
 * Structure default events:
 * 
 * init(props)         ->  Runs before applying the template
 * mounted(props)      ->  Runs after mounting the template
 * stateChanged(props) ->  Function runs after state change
 * routeChanged(props) ->  Function runs after route change
 * template(props)     ->  Applies the component template into DOM
 * style ()            ->  Applies the component CSS in <style> tag
 */

export default class Menu extends Structure {

    static version = '0.1'
    static description = 'Menu component'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'

    /**
     * @param {object} props
     */
    constructor(props) {

        const defaultProps = {
            menuTitle: 'honestJS',
            menuItems: [
                {
                    text: 'Inicial',
                    path: '/'
                },
                {
                    text: 'Sobre',
                    path: '/about'
                },
                {
                    text: 'Contato',
                    path: '/contact'
                },
            ],
            elementItems: {}
        }
        super(defaultProps, props)
    }

    mounted (props) {
        /// Mounted

        props.menuItems.forEach(el => {

            const li = document.createElement('li')
            
            props.elementItems[el.path] = new this._.MenuItem({
                text: el.text,
                path: el.path,
            })

            li.append(props.elementItems[el.path].component)

            this.$('#menuItems').append(li)
        })
    }

    routeChanged (props) {
        /// Changed route

        Object.keys(props.elementItems).forEach(key => {
            props.elementItems[key].unselect()
        })

        const currentPath = new URL(window.location.href).pathname
        props.elementItems[currentPath].select()
    }

    template (props) {
        /// HTML template

        return `
            <nav>
                <h2>${props.menuTitle}</h2>
                <ul id="menuItems"></ul>
            </nav>
        `
    }
    
    style () {
        /// CSS Template 
        /// All elements will automatically receive the component class prefix

        return `
            nav {
                position: fixed;
                top: 0;
                bottom: 0;
                width: 200px;
                left: -200px;
                border-right: 1px solid #2a303a;
                background: #19181d;
                overflow: auto;
                transform: translate(200px);
                box-sizing: border-box;
                z-index: 2;
            }
            h2 {
                padding: 22px 16px;
                margin: 0 10% 0px 10%;
                color: #3fc;
            }
            ul {
                padding: 0;
                margin: 0;
            }
            ul li {
                margin-bottom: 8px;
                list-style: none;
            }
        `
    }
}