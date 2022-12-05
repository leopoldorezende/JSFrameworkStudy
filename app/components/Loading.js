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

export default class Loading extends Structure {

    static version = '0.1'
    static description = 'Loading component'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'
    
    /**
     * @param {object} props
     */
    constructor(props) {

        const defaultProps = {}
        super(defaultProps, props)
    }

    show (container) {
        container.append(this.component)
    }

    hide (container) {
        container.querySelector('.componentLoading').remove()
    }

    template () {
        /// HTML Template

        return `
            <div class="loading-container">
                <span class="loading-text">
                    Loading...
                </span>
            </div>
        `
    }

    style () {
        /// CSS Template
        /// All elements will automatically receive the component class prefix

        return `
            .loading-container {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(20,30,30,.9);
                z-index: 10;
            }
            .loading-text {
                font-size: 18px;
            }
        `
    }
}