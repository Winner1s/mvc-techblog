const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const users = [
    { username: "Tommy", password: "whateverworks1!" },
    { username: "Shelia", password: "Eandtheartist2" },
    { username: "Marvin", password: "Gayewhatsgoinon3*" },
];

const blogs = [
    { title: "Coding is hard to learn", content: "make sure you have time to study", userId: 1 },
    { title: "If you learn how to code it will be rewarding", content: "everything is hard to learn starting out, but coding is harder", userId: 1 },
    { title: "Be persistent", content: "You may need to spend more time learning", userId: 2 },
    { title: "Dont give up", content: "keep trying and be persistent", userId: 3 },
];

const comments = [
    { body: "It took me over 2 years to understand javascript!", blogId: 1, userId: 1 },
    { body: "If you learn it will mean you dedicated all your available time to learning!", blogId: 3, userId: 2 },
    { body: "If you quit you will never know if you are capable of learning to code! keep trying even when you dont understand.  Force yourself to keep going!", blogId: 4, userId: 1 },
    { body: "At least you will learn as much as U can learn given your circumstances!", blogId: 2, userId: 3 },
];

const plantSeeds = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(users, { individualHooks: true });
        console.log("Users seeded successfully");

        await Blog.bulkCreate(blogs);
        console.log("Blogs seeded successfully");

        await Comment.bulkCreate(comments);
        console.log("Comments seeded successfully");

        process.exit(0);
    } catch (err) {
        console.error("Error seeding data:", err);
        process.exit(1);
    }
};

plantSeeds();