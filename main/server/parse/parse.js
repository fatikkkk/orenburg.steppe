import axios from 'axios'
import cheerio  from 'cheerio';


export async function mainFunc(){
    await axios.delete('http://localhost:3001/api/grants/removeGrants')
    presidentGrant()
    fondGrant()
    cultureGrant()
}
    
    
export async function sendData(url, name_site, img_url, name_grant, desc_grant, financy, deadline, tags) {
    await axios.post('http://localhost:3001/api/grants/createGrant', {
        url: url,
        nameSite: name_site,    
        imgUrl: img_url,
        name: name_grant,
        desc: desc_grant,
        financy: financy,
        deadline: deadline,
        tags: tags,
    })
}

export async function cultureGrant() {
    try {
            
        let path_all_grant = ''
        let basic_path = `https://grants.culture.ru`
        let arrayUrl = []
        for (let page = 1; page <= 20; page++) {
            path_all_grant = `https://grants.culture.ru/grants/?PAGEN_2=${page}&ajax_load=Y`
            axios.get(path_all_grant).then(html => {
                const $$ = cheerio.load(html.data)
                let url_culture = ``
                for (let item = 4; item <= 9; item++) {
                    let selector_href_grant = `body > div.header > div:nth-child(${item}) > div.grantBox__top > div.left > div.grantBox__title > a`
                    $$(selector_href_grant).each((index, elem) => {
                        url_culture = basic_path + `${$$(elem).attr('href')}`
                    })
                    arrayUrl.push(url_culture)
                }
            })
        }

        setTimeout(() => {
            console.log(arrayUrl.length)
            for (let item of arrayUrl) {
                    axios.get(item).then(html => {
                            const $ = cheerio.load(html.data)
                            var desc = 'Для большей информации посетите сайт грантодателя'

                            let name_site_culture = `Культура. Гранты России`
                            let img_url_culture = `cultureicon.png`
                    
                            let tags_grant = []
                            var category = $(`body > div.container.grand.grand_info > div.grand_info__right > * :contains("Категория соискателя")`).next().text().trim()
                            tags_grant = category.split(/(?=[А-Я])/);
                    
                            var exampleName = ['Название субсидии', 'Название гранта', 'Название конкурса', 'Название премии']
                            var name = ''
                            for (let index = 0; index < exampleName.length; index++) {
                                name = $(`body > div.container.grand.grand_info > div.grand_info__right > * :contains(${exampleName[index]})`).next().text().trim()
                                if (name !== '') break
                            }
                    
                            var exmapleState = ['Статус субсидии', 'Статус гранта', 'Статус конкурса', 'Статус премии']
                            var state = ''
                            for (let index = 0; index < exmapleState.length; index++) {
                                state = $(`body > div.container.grand.grand_info > div.grand_info__left > * :contains(${exmapleState[index]})`).next().text().trim()
                                if (state !== '') break
                            }
                            
                            var deadline = $(`body > div.container.grand.grand_info > div.grand_info__left > * :contains("Дата окончания приема заявок")`).next().text().trim().split('.').reverse().join('-')
                            var deadline_grant = new Date(deadline)

                            
                            var region = $(`body > div.container.grand.grand_info > div.grand_info__left > * :contains("Регион")`).next().text().trim()
                    
                            var exampleFinance = ['Размер гранта', 'Размер субсидии', 'Размер конкурса', 'Размер премии']
                            var finance = ''
                            for (let index = 0; index < exampleFinance.length; index++) {
                                finance = $(`body > div.container.grand.grand_info > div.grand_info__right > * :contains(${exampleFinance[index]})`).next().text().replace(/\s+/g, ' ').trim()
                                if (finance !== '') break
                            }
                    
                    
                            if (state == 'Открыт' && (region == 'Все регионы' || region.includes('Оренбургская область') || region.includes('Оренбург'))) {
                                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                                deadline_grant = deadline_grant.toLocaleDateString("ru-US", options);
                                sendData(item, name_site_culture, img_url_culture, name, desc, finance, deadline_grant, tags_grant )
                                console.log('One grant send to server')
                            }
                    
                    })
            }
    },5000)

    } catch (error) {
        console.log('Culture grant error', error)
    }
}

export async function presidentGrant(){
    try {
        let url_president = `https://xn--80afcdbalict6afooklqi5o.xn--p1ai/public/contest/index`
        await axios.get(url_president).then(html => {
            var currentDate = new Date();
            let name_site_president = `Президетский Фонд культурных инициатив`
            let name_grant_president = `Фонд Президентских грантов`
            let financy_president = 'В зависимости от проекта'
            let img_url_president = `presidenticon.jpg`
            let tags_president = ['Некоммерческие организации']
            // С 1 февраля по 15 марта 
            if((currentDate.getUTCMonth() + 1) >= 2 && (currentDate.getUTCMonth() + 1) <= 3 && (currentDate.getUTCDate() >= 1 && currentDate.getUTCDate() <= 16)){
                    const $ = cheerio.load(html.data)

                    let deadline_president = ``
                    let desciption_grant_president = ''
            
                    let basic_selector_deadline_grant = `body > div > main > div > div > div > div.acceptance-projects-competitions > div > div > div:nth-child(1) > div > div:nth-child(2) > p:nth-child(2)`
                    let selector_desciption_president = 'body > div > main > div > div > div > div:nth-child(6) > div.contest-docs > div > div.docs__table > div > div:nth-child(2) > div.table__cell.table__cell--txt.js-docs-txt-clone-from > span'

                    $(selector_desciption_president).each((index, elem) => {
                        desciption_grant_president = `${$(elem).text()}`.charAt(0).toUpperCase() +  `${$(elem).text()}`.slice(1)
                    })

                    $(basic_selector_deadline_grant).each((index, elem) => {
                        deadline_president = `${$(elem).text()}`
                    })
                    tags_president.push('Физические лица')

                    sendData(url_president, name_site_president, img_url_president, name_grant_president, desciption_grant_president, financy_president, deadline_president, tags_president)
                    console.log('One grant send to server')

            }


            // С 1 сентября по 16 октября
            else if((currentDate.getUTCMonth() + 1) >= 9 && (currentDate.getUTCMonth() + 1) <= 10 && (currentDate.getUTCDate() >= 1 && currentDate.getUTCDate() <= 16)){
                    const $ = cheerio.load(html.data)

                    let deadline_president = ``
                    let desciption_grant_president = ''

                    let basic_selector_deadline_grant = `body > div > main > div > div > div > div.acceptance-projects-competitions > div > div > div:nth-child(2) > div > div:nth-child(2) > p:nth-child(2)`
                    let selector_desciption_president = 'body > div > main > div > div > div > div:nth-child(6) > div.contest-docs > div > div.docs__table > div > div:nth-child(2) > div.table__cell.table__cell--txt.js-docs-txt-clone-from > span'
                    $(selector_desciption_president).each((index, elem) => {
                        desciption_grant_president = `${$(elem).text()}`.charAt(0).toUpperCase() +  `${$(elem).text()}`.slice(1)
                    })

                    $(basic_selector_deadline_grant).each((index, elem) => {
                        deadline_president = `${$(elem).text()}`
                    })

                    sendData(url_president, name_site_president, img_url_president, name_grant_president, desciption_grant_president, financy_president, deadline_president, tags_president)
                    console.log('One grant send to server')
            }
            else{
                console.log('Does not satisfy the condition')
            }
    })
    } catch (error) {
        console.log('President grant error', error)
    }
}

export async function fondGrant(){
    try {
        let url_fond = `https://xn--80aeeqaabljrdbg6a3ahhcl4ay9hsa.xn--p1ai/`
        axios.get(url_fond).then(html => {
            let name_site_fond = `Президетский Фонд культурных инициатив`
            let name_grant_fond = `Конкурс от Президентского Фонда культурных инициатив`
            let desc_grant_fond = `Президентский фонд культурных инициатив объявил о старте грантового конкурса, направленного на поддержку проектов в области культуры, искусства и креативных (творческих) индустрий.`
            let img_url_fond = 'fond.png'
            let deadline_grant_fond = ``
            let financy_fond = `4 млрд. рублей`
            let tags_grant_fond = []

            const $ = cheerio.load(html.data)
            
            let basic_selector_deadline_grant = `#calendar-block > div > div > div:nth-child(4) > div.calendar-item__date`
            
            //      Convert String Date to Date format

            let day, month, year, fulldate, todayDate = ''

            let selector_deadline_grant_day = basic_selector_deadline_grant + ` > span.num`
            $(selector_deadline_grant_day).each((index, elem) => {
                    day = `${$(elem).text()}`
            })

            let selector_deadline_grant_year = basic_selector_deadline_grant + ` > span.year`
            $(selector_deadline_grant_year).each((index, elem) => {
                    year = `${$(elem).text()}`
                })
                
            let list_month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

            let selector_deadline_grant_fullDate = basic_selector_deadline_grant
            $(selector_deadline_grant_fullDate).each((index, elem) => {
                fulldate = `${$(elem).text()}`.trim()
            })

            for(var i=0; i<list_month.length; i++){
                var d = list_month[i]
                if (fulldate.indexOf(d) > -1){
                    month = i+1
                    break
                }
            }
            fulldate = year + '-' + month + '-' + day
            deadline_grant_fond = new Date(fulldate)

            for (var i = 1; i <= 4; i++){
                    let basic_selector_tags_grant = `#participants-block > div > div.participants-left > ul > li:nth-child(${i})`
                    $(basic_selector_tags_grant).each((index, elem) => {
                        tags_grant_fond.push(`${$(elem).contents()
                            .filter(function(){
                                    return this.nodeType !== 1;
                        }).text().trimStart().trimEnd()}`
                    )})
            }
            
            todayDate = new Date()
            if (todayDate < deadline_grant_fond){
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                deadline_grant_fond = deadline_grant_fond.toLocaleDateString("ru-US", options);
                sendData(url_fond, name_site_fond, img_url_fond, name_grant_fond, desc_grant_fond, financy_fond, deadline_grant_fond, tags_grant_fond)
                console.log('One grant send to server')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// export async function gorodSredaGrant(){
//     try {
//         // //  GorodSreda (fifth)
//         let name_site_gorodsreda = `ГородСреда. Конкурс`
//         let name_grant_gorodsreda = `Всероссийский конкурс лучших проектов создания комфортной городской среды`
//         let url_gorodsreda = `https://konkurs.gorodsreda.ru/`
//         axios.get(url_gorodsreda).then(html => {
//                 const $ = cheerio.load(html.data)
            
//                 let desc_grant_gorodsreda = ``
//             let selector_desc_grant = `body.t-body > #allrecords > #rec316409945 > div > div > .t677__col.t-col.t-col_5.t-prefix_1.t677__top-indent > div > div > div:nth-child(2) > div`
//             $(selector_desc_grant).each((index, elem) => {
//                     desc_grant_gorodsreda = `${$(elem).text()}`
//             })

//             console.log(url_gorodsreda)
//             console.log(name_site_gorodsreda)
//             console.log(name_grant_gorodsreda)
//             console.log(desc_grant_gorodsreda)
//         })
//         //  GorodSreda
//     } catch (error) {    
//         console.log(error)
//     }
// }