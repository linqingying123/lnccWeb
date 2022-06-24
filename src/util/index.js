//存储数据到本地的方法
function setIdAndParentId(id, parentId) {
    let navid = getIdAndParentId()

    if (id === undefined || id == null) {
        id = navid.id
    }
    if (parentId === undefined || parentId == null) {
        parentId = navid.parentId
    }
    window.localStorage.setItem("navId", JSON.stringify({'id': id, 'parentId': parentId}))
}

// function setId(id){
//     window.localStorage.setItem("navId",id)
// }
// function  setParentId(parentId){
//     window.localStorage.setItem("navParentId",parentId)
// }

function getIdAndParentId() {
    return JSON.parse(window.localStorage.getItem("navId"))
}


function setAllData(data) {
    window.localStorage.setItem("data", JSON.stringify(data))
}

function getAllData() {
    return new Promise((resolve, reject) => {
        resolve(JSON.parse(window.localStorage.getItem("data")))
    })

}


export default {
    setIdAndParentId,
    getIdAndParentId,
    setAllData,
    getAllData
}
