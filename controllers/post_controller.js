const Post = require('../models/post_model');
const User = require('../models/user_schema');

const Counter = require('../counter'); 

const getNextSequence = async (sequenceName) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { seq: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!counter) throw new Error(`Counter for ${sequenceName} could not be initialized.`);
        return counter.seq;
    } catch (error) {
        console.error("Error fetching next sequence:", error);
        throw error;
    }
};

// This will create the new psot
exports.addPost = async (req, res) => {
    const { title, post_body, lat, long } = req.body;

    if (!title || !post_body) {
        return res.status(400).json({ msg: 'Title and post body are required.' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const postId = await getNextSequence('postId');

        const post = new Post({
            postId,
            userId: req.user.id,
            username: user.username,
            title,
            post_body,
            lat,
            long
        });

        await post.save();
        res.status(201).json({ msg: 'Post added successfully', post });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

// This will fetch post by username though it checks for userId but the routes are written such that only username will be applcable
exports.retrievePost = async (req, res) => {
    const { userId, username } = req.params;

    if (!userId && !username) {
        return res.status(400).json({ msg: 'Either userId or username must be provided.' });
    }

    try {
        const filter = userId ? { userId } : { username };
        const posts = await Post.find(filter);

        if (posts.length === 0) return res.status(404).json({ msg: 'No posts found' });
        res.json({ posts });
    } catch (error) {
        console.error("Error retrieving posts:", error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};


exports.editPost = async (req, res) => {
    const { postId, title, post_body, lat, long } = req.body;
    try {      
        if (!Number.isInteger(postId)) {
            return res.status(400).json({ msg: 'Invalid postId. It must be an integer.' });
        }
       
        const post = await Post.findOne({ postId, userId: req.user.id });
        if (!post) return res.status(404).json({ msg: 'Post not found or unauthorized' });
        if (title) post.title = title;
        if (post_body) post.post_body = post_body;
        if (lat) post.lat = lat;
        if (long) post.long = long;

        await post.save();
        res.json({ msg: 'Post updated successfully', post });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const { postId } = req.params;

    if (!postId) return res.status(400).json({ msg: 'Post ID is required.' });
    try {
 
        if (!Number.isInteger(Number(postId))) {
            return res.status(400).json({ msg: 'Invalid postId. It must be an integer.' });
        }

        const post = await Post.findOneAndDelete({ postId, userId: req.user.id });
        if (!post) return res.status(404).json({ msg: 'Post not found or unauthorized' });

        res.json({ msg: 'Post deleted successfully' });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

exports.getNearbyPosts = async (req, res) => {
    const { lat, long, radius = 5000 } = req.query; 
    
    if (!lat || !long) {
        return res.status(400).json({
            msg: 'Both latitude and longitude are required query parameters'
        });
    }

  
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const radiusInMeters = parseFloat(radius);

  
    if (isNaN(latitude) || isNaN(longitude) || isNaN(radiusInMeters)) {
        return res.status(400).json({
            msg: 'Invalid coordinates or radius. Please provide valid numbers.'
        });
    }


    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({
            msg: 'Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180.'
        });
    }

    try {
        const posts = await Post.find({
            $and: [
                {
                    $expr: {
                        $lte: [
                            {
                                $sqrt: {
                                    $add: [
                                        {
                                            $pow: [
                                                { $multiply: [
                                                    { $subtract: ["$lat", latitude] },
                                                    111.32 
                                                ]},
                                                2
                                            ]
                                        },
                                        {
                                            $pow: [
                                                { $multiply: [
                                                    { $subtract: ["$long", longitude] },
                                                    { $multiply: [
                                                        111.32, 
                                                        { $cos: { $degreesToRadians: latitude }}
                                                    ]}
                                                ]},
                                                2
                                            ]
                                        }
                                    ]
                                }
                            },
                            radiusInMeters / 1000 
                        ]
                    }
                }
            ]
        })
        .select('-__v')
        .sort({ createdAt: -1 });

        if (posts.length === 0) {
            return res.status(404).json({
                msg: 'No posts found within the specified radius',
                posts: []
            });
        }

        res.json({
            posts: posts.map(post => ({
                _id: post._id,
                postId: post.postId,
                userId: post.userId,
                username: post.username,
                title: post.title,
                post_body: post.post_body,
                lat: post.lat,
                long: post.long,
                createdAt: post.createdAt,
                __v: post.__v
            }))
        });

    } catch (error) {
        console.error("Error fetching nearby posts:", error);
        res.status(500).json({
            msg: 'Server error',
            error: error.message
        });
    }
};