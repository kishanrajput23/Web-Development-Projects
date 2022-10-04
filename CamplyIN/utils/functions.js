module.exports.capitalize = (str) => {
    const arr1 = str.split(' ');
    const arr2 = arr1.map(s => s.slice(0, 1).toUpperCase() + s.slice(1));
    return arr2.join(' ');
}

// this function returns how many days ago the last update was
// takes in the date in milliseconds (saved in mongo)
module.exports.getLastUpdated = (ms) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const days = (Date.now() - ms) / oneDay;
    if (days < 1) {
        return 'Just today';
    } else if (days < 2) {
        return '1 day ago'
    }
    return Math.floor(days) + ' ago';
}