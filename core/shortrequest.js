export default class ShortRequest {

    static version = '0.1'
    static description = 'ShortRequest with data factored and loading'
    static author = 'Leopoldo Rezende - leopoldorezende@gmail.com'
    
    /**
     * @param {object} config
     */
    constructor(props) {

        const defaultProps = {   
            url: '',
            params: {},
            context: {},
        }

        this.props = {...defaultProps, ...props}
        
        root.loading.show(this.props.context.component)
        
        return (async () => {
            try {
                return await fetch(this.props.url, this.props.params).then(r => r.json())
            }
            finally {
                root.loading.hide(this.props.context.component)
            }
        })()
    }
}