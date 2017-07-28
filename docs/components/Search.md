# Search

路由到Search

```

this.props.dispatch(routerRedux.push({
    pathname: '/SearchComponent',
    state: {
        onSearch: this.props.onSearch,
        renderRow: this.props.renderRow,
        placeholder: this.props.placeholder,
        label: this.props.label,
        notFoundLabel: this.props.notFoundLabel,
        onCancel: this.props.onCancel
    }
}));

```