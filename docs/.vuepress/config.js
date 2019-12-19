module.exports = {
    title: 'Garfield的个人空间',
    description: 'Tech Otakus Save The World',
    base: '/impact-md/',
    markdown: {
        lineNumbers: true // 代码行数
    },
    themeConfig: {
        lastUpdated: '最后更新时间', // 最后更新时间
        sidebarDepth: 3,
        nav: [
            {
                text: 'javascript',
                link: '/javascript/'
            },{
                text: 'css',
                link: '/css/'
            },{
                text: 'react',
                link: '/react/'
            },{
                text: 'tools',
                link: '/tools/'
            }

        ],
        sidebar:{
            '/javascript/':[
                '/javascript/作用域是什么',
            ]
        }
    },
};