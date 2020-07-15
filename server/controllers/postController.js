const { decodeBase64 } = require("bcryptjs")

module.exports = {
    getFilteredPosts: async (req, res) => {
        const {userposts, search} = req.query;
        const {userid} = req.session;
        const db = req.app.get('db');
        let results = [];
        if (userposts == 'true') {
            if (search) {
                results = await db.find_title({search});
            } else {
                results = await db.get_all_posts();
            }
        } else {
            if (search) {
                results = await db.get_all_other_by_title({search, userid});
            } else {
                results = await db.get_all_other({userid});
            }
        }
        return res.status(200).send(results);
    },
    getPost: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        const post = await db.get_post({id});

        return res.status(200).send(post[0]);
    },
    createPost: (req, res) => {
        const {userid} = req.session;
        const {title, img, content} = req.body;
        const db = req.app.get('db');

        db.create_post({userid, title, img, content})
        .then(response => res.sendStatus(200));
    },
    deletePost: async (req, res) => {
        const {id} = req.params;

        const db = req.app.get('db');

        const updatedList = await db.delete_post({id});
        res.status(200).send(updatedList);
    }
}