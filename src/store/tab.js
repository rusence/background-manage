import Cookie from "js-cookie"
export default {
    state: {
        isCollapse: false,
        tablist: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home',
        }],
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                const index = state.tablist.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tablist.push(val)
                }
            }
        },
        closeTag(state, item) {
            // console.log(item, 'item')
            const index = state.tablist.findIndex(val => val.name === item.name)
            state.tablist.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                    if (item.children) {
                        item.children.map(item => {
                            item.component = () =>
                                import (`../views/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                    } else {
                        item.component = () =>
                            import (`../views/${item.url}`)
                        menuArray.push(item)
                    }
                })
                // console.log(menuArray)
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}