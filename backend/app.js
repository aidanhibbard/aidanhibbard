// Express and Env vars
const 
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    ip = process.env.IP || 'localhost';

// Middleware imports
const 
    cors = require('cors')

// Utils
const 
    path = require('path'),
    fs = require('fs/promises'),
    fm = require('front-matter');


// Middleware
app.use(cors());

// Paths
const 
    posts_path = path.join(__dirname, 'posts');

// Routes
app.get('/', (req, res) => {
    res.json({
        routes_info: [
            {
                get_posts: "/blog/posts",
                info: "Fetches posts",
                params: {
                    page: "Integer",
                    limit: "Integer"
                }
            },
            {
                get_post: "/blog/posts/:post_name",
                info: "Returns single post JSON"
            }
        ]
    });
});

app.get('/blog/posts', async (req, res) => {
    try { 
            const 
                page = parseInt(req.query.page),
                limit = 5,
                files = await fs.readdir(posts_path),
                start_index = (page - 1) * limit,
                end_index = page * limit,
                filtered_files = files.slice(start_index, end_index),
                result = [];
            for (let i = 0;i<filtered_files.length;i++) {
                const
                    data = await fs.readFile(`./posts/${filtered_files[i]}/index.md`, 'utf8'),
                    post = fm(data),
                    meta = {
                        attributes: post.attributes
                    };
                result.push(meta);
            };
            if (end_index < files.length) {
                result.push({
                    page: page + 1,
                    limit: limit
                });
            };
            if (start_index > 0) {
                result.push({
                    page: page - 1,
                    limit: limit
                });
            };
            res.json(result);
            res.status(200);
    } catch (error) {
        res.json({ error });
        res.status(400);
    };
});

app.get('/blog/posts/:post_name', (req, res) => {
    fs.readFile(`./posts/${req.params.post_name}/index.md`, 'utf8', (err, data) => {
        if (err){ res.json({ error: err }); res.status(404); }
        const post = fm(data)
        res.json(post)
        res.status(200)
    });
});

app.listen(port, () => {
    console.log(`App running at http://${ip}:${port}`);
});
// filtered_files.forEach(async (file) => {
//     const 
//         data = await fs.readFile(`./posts/${file}/index.md`, 'utf8'),
//         post = fm(data),
//         meta = {
//             attributes: post.attributes
//         };
//     result.push(meta);
// });