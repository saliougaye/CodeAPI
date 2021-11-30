const Snippet = require('./schema/snippet');
const generateId = require('./util/generateId');

const upload = async (snippetData) => {

    const { name, category, language, snippet } = snippetData;
    
    const id = generateId();

    const snippet2save = new Snippet({
        searchId: id,
        name,
        category,
        language,
        snippet
    });


    await snippet2save.save();

}

module.exports = upload;