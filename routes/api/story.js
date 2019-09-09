const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

// Require Models
const Story = require("../../models/Story");
const User = require("../../models/User");

// @route   POST api/story
// @desc    Create a story
// @access  Private
router.post("/", [auth,
    [
        check("title", "Title is required").not().isEmpty(),
        check("story", "Story is required").not().isEmpty()
    ]
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const newStory = new Story({
                title: req.body.title,
                story: req.body.story,
                category: req.body.category
            })

            const story = await newStory.save();

            res.json(story);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")
        }
    }
);

// @route   GET api/story
// @desc    Get all stories
// @access  Public
router.get("/", async (req, res) => {
    try {
        const stories = await Story.find().sort({ date: -1 });
        res.json(stories)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

// @route   GET api/story/:id
// @desc    GET story by id
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({ msg: "Story not found" })
        }

        res.json(story);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Story not found" })
        }
        res.status(500).send("Server Error")
    }
});

/////////////////////
// BEGIN ORIGINAL STORY ROUTE
////////////////////
// const storyController = require("../../controllers/storyController")

// router.route("/")
//     .get(storyController.findAll)
//     .post(storyController.create);


// // api/story/:cat
// // find all stories with category
// router.route("/category/:cat")
//     .get(storyController.findCat);

// // find a single story
// router.route("/top")
//     .get(storyController.findOne);

/////////////////////
// END ORIGINAL STORY ROUTE
////////////////////



module.exports = router;