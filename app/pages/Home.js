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

export default class Home extends Structure {

    /**
     * @param {object} props
     */
    constructor(props) {

        const defaultProps = {
            title: 'Home',
            a: 'n/a',
            b: 'n/a',
            c: 'n/a'
        }
        super(defaultProps, props)
    }

    mounted (props) {
        /// Component builder

        const Form = this._.Form
        const Input = this._.Input

        new Form({
            injection: {
                Input: Input
            },
            info: [
                {
                    type: 'Descrição',
                    value: props.a,
                },
                {
                    type: 'Autor',
                    value: props.b,
                },
                {
                    type: 'E-mail',
                    value: props.c,
                },
            ]
        }).filled(
            form => {
                form.component.append('Sou um callback!')
            }
        ).include(
            this.$('#home')
        )

        // Change vars... but this is reactive
        props.a = 'Estrutura para componentes'
        props.b = 'Leopoldo Rezende'
        props.c = 'leopoldorezende@gmail.com'
    }

    routeChanged (props) {
        /// Changed route
        
        root.app._.Header.props.title = props.title
    }

    template (props) {
        /// HTML template

        return `
            <div id="home"></div>
        `
    }
}