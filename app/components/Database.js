const json = require('../../assets/list.json')

const DBImages = []

for (let i=0; i<json.length; i++) {
    const item = json[i]
    const title = item.title
    const link = item.link
    const songName = link.replace('https://wintersunset95.github.io/UnitySongBook/lyrics/', '')
    const newItem = {
        title: title
    }
    DBImages.push(newItem)
}

export default DBImages