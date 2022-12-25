import axios from 'axios'
import cheerio  from 'cheerio';
import cron from "node-cron"

let url = `url`;
let name_site = `namesite`
let img_url = `exmaple icon`
let name_grant = `name grant`
let desc_grant = `desc grant`
let financy = 'financy'
let deadline = 'deadline'

export async function mainFunc(){
    await axios.delete('http://localhost:3001/api/grants/removeGrants')
    cultureGrant()
}
    
    
    
    
export async function sendData() {
    await axios.post('http://localhost:3001/api/grants/createGrant', {
        url: url,
        nameSite: name_site,    
        imgUrl: img_url,
        name: name_grant,
        desc: desc_grant,
        financy: financy,
        deadline: deadline,
    })
}
    
export async function cultureGrant(){
    try {
        let name_site_culture = 'Культура. Гранты России'
        let url_culture = 'https://grants.culture.ru/'
        let img_url_culture = `cultureicon.png`
        let desc_grant_culture = `Отсутствует`
        await axios.get(url_culture).then(html => {
            const $ = cheerio.load(html.data)
    
            let name_grant_culture = ''
            let financy_culture = ''
            let url_grant = ''
            let deadline_culture = ''
            for (let index = 1; index < 7; index++) {
    
                setTimeout(() => {
                    let basic = `body > div.section_grants > div.container.flex.flex-jcsb.flex-wrap> div.grantBox.page:nth-child(${index})`
                    let selector_name_grant = basic + `> .grantBox__top > .left > .grantBox__title > a`
                    $(selector_name_grant).each((index,elem) => {
                        name_grant_culture = `${$(elem).text()}`.trim()
                    })
        
                    // let selector_desc_grant = basic + `> ` // пропуск нет описания
        
                    let selector_financy = basic + ` > .grantBox__money > .summ > span`
                    $(selector_financy).each( (index,elem) => {
                        financy_culture = `${$(elem).text()}`
                    })
        
                    $(selector_name_grant).each((index, elem) => {
                        url_grant = url_culture + `${$(elem).attr('href')}`
                    })
        
                    let selector_deadline_grant = basic + `> .grantBox__top > .left > .grantBox__date`
                    $(selector_deadline_grant).each((index, elem) => {
                        deadline_culture = `${$(elem).text()}`.replace('—','').replace(/\s+/g, ' ').trim()
                    })
        
                    url = url_grant
                    name_site = name_site_culture
                    img_url = img_url_culture
                    name_grant = name_grant_culture
                    desc_grant = desc_grant_culture
                    financy = financy_culture
                    deadline = deadline_culture
        
                    sendData()
                    console.log('One grant send to server')
                }, 2000);
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