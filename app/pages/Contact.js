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

export default class Contact extends Structure {

    /**
     * @param {object} props
     */
    constructor(props) {
       
        const defaultProps = {
            title: 'Contat us',
            text: 'Exemplo de reatividade'
        }
        super(defaultProps, props)
    }

    init (props) {
        /// Pre component builder

        this.setState({test: 'Olá mundo'})
    }

    mounted (props) {
        /// Component builder
        
        this.$('#changeTitle').addEventListener('change', (el) => {
            props.text = el.target.value
        })
    }

    stateChanged (props) {
        console.log('Opa reagi!')
    }

    routeChanged (props) {
        /// Changed route
        
        root.app._.Header.props.title = props.title
    }

    template (props) {
        /// HTML template
        
        return `
            <h2>${props.text}</h2>
            <ul id="contact">
                <li> ${this.getState('test')} </li>
                <li> (v) reactive (setters) </li>
                <li> (v) components </li>
                <li> (v) classes </li>
                <li> (v) routes </li>
                <li> (v) dependency injection </li>
                <li> ( ) API REST </li>
                <li> ${this.setState({test: 'Jesus'})} </li>
                <li> ${this.getState('test')} </li>
            </ul>
            <p>
                Isso é um exemplo de variável reativa: <b> ${props.text} </b>
            </p>
            <input id="changeTitle" type="text" value="${props.text}" />
        `
    }
}
