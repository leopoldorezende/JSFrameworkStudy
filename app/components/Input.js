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

export default class Input extends Structure {

    static version = '0.1'
    static description = 'Input field component'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'
    
    /**
     * @param {object} props
     */
    constructor(props) {

        const defaultProps = {   
            label: 'Label',
            type: 'text',
            value: '',
            placeholder: '',
            isRequired: false
        }
        super(defaultProps, props)
    }

    on (eventName, fn) {
        /// Apply event to input element

        this.$('input').addEventListener(eventName, function() {
            fn(this)
        })

        return this
    }

    template (props) {
        /// HTML Template

        return `
            <label>${props.label}: </label>
            <input 
                type="${props.type}" 
                value="${props.value}" 
                placeholder="${props.placeholder}" 
            />
            <span class="required">${props.isRequired ? '*' : ''}</span>
        `
    }

    style () {
        /// CSS Template
        /// All elements will automatically receive the component class prefix

        return `
            label {
                padding-right: 12px;
                font-size: 14px;
            }
            input {
                padding: 8px;
                margin-bottom: 16px;
                border: 1px solid #065;
                outline: none;
                background: transparent;
                color: #abc;
            }
        `
    }
}