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

export default class Header extends Structure {

    static version = '0.1'
    static description = 'Header component'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'

    /**
     * @param {object} props
     */
    constructor(props) {

        const defaultProps = {
            title: 'Título da Aplicação'
        }
        super(defaultProps, props)
    }

    template (props) {
        /// HTML template

        return `
            <header>
                <h1>${props.title}</h1>
            </header>
        `
    }

    style () {
        /// CSS Template 
        /// All elements will automatically receive the component class prefix

        return `
            h1 {
                margin: 0;
                padding: 20px 40px;
                font-size: 20px;    
                background: #2a303a
            }
            header {
                position: fixed;
                top: 0;
                right: 0;
                left: 200px;
                z-index: 2;
                transition: left 0.2s;
                color: #fff;
            }
        `
    }
}