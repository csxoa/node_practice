const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async () => {
    try {
        return await axios.get('https://store.musinsa.com/app/goods/1624189')
    } catch (e) {
        console.log(error)
    }
}

getHtml().then(html => {
    const $ = cheerio.load(html.data);
    itemName = $('.product_title').children('em').text()
    return itemName
}).then(res => console.log(res))