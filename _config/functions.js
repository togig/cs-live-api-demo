
exports.isValidDate = (value) => {
    if (!value.match('^20[0-9]{2}-[0-9]{2}-[0-9]{2}$')) return false;

    const date = new Date(value);
    if (!date.getTime()) return false;
    return date.toISOString().slice(0, 10) === value;
}

module.exports