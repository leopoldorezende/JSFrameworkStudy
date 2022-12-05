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

export default class MenuItem extends Structure {

    static version = '0.1'
    static description = 'Menu Item component'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'

    /**
     * @param {object} props
     */
    constructor(props) {

        const defaultProps = {
            text: 'Menu Item',
            path: '/',
        }
        super(defaultProps, props)
    }
    
    select() {
        this.$('a').classList.add('selected')
    }
    
    unselect() {
        this.$('a').classList.remove('selected')
    }

    template (props) {
        /// HTML template

        return `
            <a route="${props.path}">${props.text}</a></li>
        `
    }

    style () {
        /// CSS Template 
        /// All elements will automatically receive the component class prefix

        return `
            a {
                display: block;
                width: 80%;
                padding: 12px 16px;
                margin: 0 10% 0 10%;
                border: 1px solid transparent;
                color: #eee; 
                cursor: pointer;
                transition: all .3s;
                box-sizing: border-box;
            }
            a:hover {
                background: rgba(120,242,222,.12);
            }
            a.selected {
                border: 1px solid #065;
                color: #3fc;
                box-shadow: 0px 0px 8px 0px rgba(120,242,222,.12);
            }
        `
    }
}