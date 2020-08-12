/**
 * @description 根据docs下的自定义目录生成侧边栏配置
 * @example
 *    如docs下有 docs/部署 和 docs/配置
 *    则生成如下对象
 *    {
 *      '/配置/': ['/配置/first', '/配置/second'],
 *      '/部署/': ['/部署/one', '/部署/two']
 *    }
 *    默认主题侧边栏生成规则请参考：
 *      https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F
 */
function getCategorySidebar() {
  const fs = require('fs')
  // 过滤 docs 根目录下的 .vuepress 文件夹、md 文件
  return fs.readdirSync('./docs')
    .filter(fileName => !/.md|.vuepress/.test(fileName))
    .map(dir => ({
      title: dir, // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 2, // 可选的, 默认值是 1
      children: fs
          .readdirSync(`./docs/${dir}`)
          .filter(f => /.md/.test(f))
          .map(f => '/' + dir + '/' + f.replace('.md', ''))
      })
    )
}

module.exports = {
  title: 'Hello VuePress',
  description: '开箱即用的 VuePress 模板',
  markdown: {
    lineNumbers: true, // 代码块的左侧显示行号
    externalLinks: { target: '_blank', rel: 'noopener noreferrer' }, // 键和值对将被添加到指向外部链接的 <a> 标签，默认选项将在新窗口中打开外部链接
    anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }, // 锚点配置
    toc: { includeLevel: [1, 2, 3] } // [[toc]]目录
  },
  themeConfig: {
    nextLinks: true, // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    prevLinks: true, // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/home' },
      { text: '仓库', link: 'http://code.local/yx-property' },
      { text: 'Google', link: 'https://www.google.com' }
    ],
    displayAllHeaders: false,
    sidebarDepth: 2,
    sidebar: getCategorySidebar()
    },
}
