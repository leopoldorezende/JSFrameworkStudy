import Structure from  "./core/structure.js"

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

export default class App extends Structure {
 
    /**
     * @param {object} props
     */
    constructor(props) {
        /// Creating component
       
        const defaultProps = {}
        super(defaultProps, props)
    }

    mounted () {
        /// Component builder

        this.$('#menu').append(this._.Menu.component)
        this.$('#header').append(this._.Header.component)
    }

    template () {
        /// HTML template

        return  `
            <aside id="menu"></aside>
            <div id="header"></div>

            <main>
                <div id="page"></div>
            </main>
        `
    }

    style () {
        /// CSS Template 
        /// All elements will automatically receive the component class prefix

        return `
            main {
                position: relative;
                min-height: 100%;
                overflow-x: hidden;
                margin-left: 200px;
                transition: margin-left 0.2s;
                box-sizing: border-box;
                padding: 40px;
                margin-bottom: -160px;
                padding-bottom: 160px;
            }
            #page {
                padding-top: 50px;
            }
        `
    }
}