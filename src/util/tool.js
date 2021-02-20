function swapStatus(status) {
    return (status % 2) === 1
}

function swapStatusInt(status) {
    return (status % 2) == 0 ? 1 : 2
}

function assetIsNull(obj) {
    if (obj === null || obj === undefined || obj == '') {
        return true
    }
    return false
}

function assetNotNull(obj) {
    if (obj === null || obj === undefined || obj == '') {
        return false
    }
    return true
}

export default {
    swapStatus,
    assetIsNull,
    assetNotNull,
    swapStatusInt
}
