import { connect } from 'dva';
import { createForm } from 'rc-form';
export default function bind(mapStateToProps, options = {}) {
    return (component) => {
        let enhancedComponent = connect(mapStateToProps)(component)
        if (options.createForm) {
            enhancedComponent = createForm()(enhancedComponent);
        }
        return enhancedComponent;
    }
}