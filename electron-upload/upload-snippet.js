const Snippet = require('./schema/snippet');
const generateId = require('./util/generateId');

const upload = () => {

    const uploadFromFile = async (path) => {


    }

    const uploadSingle = async (snippetData) => {

        const { name, category, language, snippet } = snippetData;
        
        const id = generateId();

        const snippet = new Snippet({
            searchId: id,
            name,
            category,
            language,
            snippet
        });


        await snippet.save();

    }


    return {
        uploadFromFile,
        uploadSingle
    }
}

module.exports = upload;