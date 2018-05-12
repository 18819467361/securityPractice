$(function () {
  // 文章简介去除富文本标签
  function delHtmlTag (text) {
    if (typeof text !== 'number') {
      return String(text).replace(/<(?:\/?).*?>/ig, '')
    } else {
      return text
    }
  }

  function getArticles () {
    $.ajax({
      type: 'get',
      url: '/api/get_articles',
      success: data => {
        const articles = data.articles || []
        let template = ''
        articles.forEach(article => {
          const date = COMMON.formatDate('MM月DD日hh时', delHtmlTag(article.date))
          template += `
          <div class="article">
            <img class="cover" src=${delHtmlTag(article.cover)} width="300" height="180" />
            <div class="title"><a href="/detail.html?id=${delHtmlTag(article.id)}">${delHtmlTag(article.title)}</a></div>
            <div class="sub-title">
              <span class="author">${delHtmlTag(article.author)}</span> 于
              <span class="date">${delHtmlTag(date)}</span> 发布
            </div>
            <div class="content">${delHtmlTag(article.content)}</div>
          </div>
        `
        }, this)
        $('.articles').append(template)
      }
    })
  }

  function init () {
    getArticles()
  }

  init()
})
