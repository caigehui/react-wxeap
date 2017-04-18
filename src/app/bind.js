import { connect } from 'dva';
import { createForm } from 'rc-form';

/**
 * 绑定视图到应用中
 * options可选值：createForm
 * @param {function} mapStateToProps 
 * @param {object} options 
 */
export default function bind(mapStateToProps, options = {}) {
    return (component) => {
        let enhancedComponent = connect(mapStateToProps)(component);
        if (options.createForm) {
            enhancedComponent = createForm()(enhancedComponent);
        }
        return enhancedComponent;
    };
}
