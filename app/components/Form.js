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

export default class Form extends Structure {

    static version = '0.1'
    static description = 'Form component'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'

    /**
     * @param {object} props
     */
    constructor(props) {

        const defaultProps = {
            title: 'Novo Formulário',
            info: []
        }
        super(defaultProps, props)
    }

    init(props) {
        this.setState({test: props.title})
    }

    mounted (props) {
        /// Component builder
        
        const Input = this._.Input

        new Input({
            label: 'Título',
            type: 'text',
            placeholder: 'Experimente!',
            isRequired: true,
            value: ''
            
        }).on('input', (el) => {
            el.classList[el.value != '' ? 'add' : 'remove']('selected')

        }).include(
            this.$('.fieldsContent')
        )

        // Click send button
        this.$('.sendButton').addEventListener('click', () => {
            this.computed.formSent(this.$('input').value)
        })
    }

    get computed () {
        /// Computed returns

        return {
            formSent: (value) => {
                this.setState({test: value != '' ? value : this.props.title })
            }
        }
    }

    template (props) {
        /// HTML template

        return `
            <h3>${this.getState('test')}</h3>
            <div class='fieldsContent'></div>
            <ul>
            ${
                props.info.map((el) => 
                    `<li><b>${el.type}:</b> ${el.value}</li>`
                ).join('')
            }
            </ul>
            <button class="sendButton"> Enviar formulário </button>
        `
    }

    style () {
        /// CSS Template 
        /// All elements will automatically receive the component class prefix

        return `
            h3 {
                color: #69f;
            }
            .selected {
                background: rgba(255,255,255,.1);
                border-color: #aca;
                color: #3fc;
            }
            ul {
                padding-bottom: 16px;
            }
            li {
                padding-bottom: 4px;
            }
            button {
                padding: 8px 16px;
                font-size: 12px;
                border: 1px solid #69f;
                color: #69f;
                cursor: pointer;
                transition: all .2s;
                background: transparent;
            }
            button:hover {
                border: 1px solid #065;
                color: #3fc;
            }
        `
    }
}