const { v4 } = require('uuid')

module.exports = () => {

    const id = v4()

    return id;
}