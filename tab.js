// const baseURL = 'https://forum.nexon.com/api/v1'
const apiURL = "https://api.blugon.kr/genshininfo"

const dataName = {
    adventure_rank: "모험 레벨",
    playtime_days: "활동 일수",
    character_count: "캐릭터 개수",
    achievement_count: "달성한 업적",
    spiral_abyss: "나선 비경"
}
const dataColor = {
    adventure_rank: "#fff4b055",
    playtime_days: "#b0ffb155",
    character_count: "#ffb9b055",
    achievement_count: "#ff9b5a55",
    spiral_abyss: "#b0b8ff55"
}
const dataJosa = {
    adventure_rank: "레벨",
    playtime_days: "일",
    character_count: "개",
    achievement_count: "개",
    spiral_abyss: "층"
}

const numberOfWallpapers = 19

const getAnnouncements = async () => {
    const threads = (await Promise.all(Object.keys(boardIds).map(async boardId => {
        try {
            const res = await fetch(`${baseURL}/board/${boardId}/threads?alias=bluearchive&pageNo=1&paginationType=PAGING&pageSize=4&blockSize=5`)
            const json = await res.json()
            const { threads } = json

            if (!threads) return []

            return threads
        } catch (error) {
            return []
        }
    }))).flat()
    
    return threads.sort((a, b) => b.createDate - a.createDate).slice(0, 4)
}

document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch(`${apiURL}?Cookie=${config.genshinImpactCookie}`)
    const data = await res.json()
    const info = data.info

    document.getElementById("genshin-impact-nickname").innerText = info.nickname
    document.getElementById("genshin-impact-uid").innerText = info.uid

    const threads = document.getElementById("genshin-impact-threads")
    threads.innerHTML+=`
    <div class="genshin-impact-data adventure-level">
        <h3 class="left">모험 레벨</h3>
        <h3 class="right" style="background-color:${dataColor["adventure_rank"]};">${info.adventure_rank}${dataJosa["achievement_count"]}</h3>
    </div>
    `
    for(d in info.data) {
        threads.innerHTML+=`
        <div class="genshin-impact-data ${d.replace("_", "-")}">
            <h3 class="left">${dataName[d]}</h3>
            <h3 class="right" style="background-color:${dataColor[d]}";>${info.data[d]}${dataJosa[d]}</h3>
        </div>
        `
    }
    // data.data
})


window.addEventListener('load', () => {
    // background-image: url('./wallpaper.jpg')
    const backgroundImage = document.getElementById('background-image')
    backgroundImage.style.setProperty('background-image', `url('./wallpapers/${Math.floor(Math.random() * numberOfWallpapers)}.jpg')`)
    backgroundImage.style.setProperty('opacity', 1)
})