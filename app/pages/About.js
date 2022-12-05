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

export default class About extends Structure {

    /**
     * @param {object} props
     */
    constructor(props) {
       
        const defaultProps = {
            title: 'About'
        }
        super(defaultProps, props)
    }

    mounted() {
        /// Component builder
        
        new root.shortRequest({

            url: 'https://jsonplaceholder.typicode.com/posts/',
            params: {},
            context: this

        }).then(data => {
            
            this.$('article').innerHTML = `
                <h2>${data[0].title}</h2>
                <p>${data[0].body}</p>
            `
        }).catch(error => {
            
            let errorMessage = '<b>Ocorreu um erro, tente mais tarde.</b> <br /> '+error
            this.$('article').innerHTML = errorMessage
        })
    }

    routeChanged (props) {
        /// Changed route
        
        root.app._.Header.props.title = props.title
    }

    template (props) {
        /// HTML template

        return `
            <h3>${this.getState('test')}</h3>
            <article></article>
        `
    }
}