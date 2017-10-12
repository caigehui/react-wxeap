# Search

`Search`比较特殊，它是以路由形式进行跳转的

note: 路由到Search而不是Modal

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