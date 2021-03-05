const puppeteer = require('puppeteer');

(async () => {
    // browser 실행
    const browser = await puppeteer.launch( {headless:false}
    );
    // 새로운 페이지 열기
    const page = await browser.newPage();
    // url 에 접속
    await page.goto('https://store.musinsa.com/app/goods/1624189');
    
    let itemName = await page.$eval(
        '#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > span > em'
        , element => {
            return element.textContent;
        })

    console.log(itemName)
    await page.close()
    await browser.close()
})();