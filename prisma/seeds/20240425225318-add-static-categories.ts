import { PrismaClient } from '@prisma/client';
import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
})

const prisma = new PrismaClient();

const main = async () => {
    const tags = [
        {
            name: "Housing",
            description: "The amount you pay to have a roof over your head constitutes a housing cost. This includes everything from rent or mortgage payments to property taxes, HOA dues, and home maintenance costs. For most budgeters, this category is by far the biggest."
        },
        {
            name: "Transportation",
            description: "Regardless of your location or lifestyle, everyone needs to get from point A to point B. Typically, this budget category includes car payments, registration and DMV fees, gas, maintenance, parking, tolls, ridesharing costs, and public transit."
        },
        {
            name: "Food",
            description: "Whether you’re grocery shopping and cooking at home or sampling the local culinary scene, you’ll need to account for food expenses. Many budgeters include grocery shopping and dining out in this category (e.g., restaurant meals, work lunches, food delivery, etc.)"
        },
        {
            name: "Utilities",
            description: "This category covers all the expenses that keep your essential household services up and running. Utilities generally include your gas, electricity, water, and sewage bills. Households may also factor in their “connectivity” expenses, like cell phone bills and internet expenses."
        },
        {
            name: "Medical & Healthcare",
            description: "As the adage goes, “health is wealth,” so be sure to include enough in your budget to cover these costs. If you plan for essential medical care such as yearly physicals, dental appointments, and even mental health care, you’re much more likely to live a long, healthy life."
        },
        {
            name: "Savings",
            description: "This often-overlooked (or dare we say, underfunded?) home budget category is arguably the most important — it can really set you up for financial health down the road."
        },
        {
            name: "Personal Spendings",
            description: "This category is a catch-all for anything that could be considered a personal care or “lifestyle” expense."
        },
        {
            name: "Recreation & Entertainment",
            description: "For most of us, carving out time for fun (and the money to afford it) is essential to maintaining a healthy work-life balance."
        },
        {
            name: "Miscellaneous",
            description: "This category is a catch-all for anything that doesn’t fit into any other category."
        }
    ]

    const categories = [
        {
            name: "Needs",
            description: "E.g. rent, groceries",
            percentageSplit: 50
        },
        {
            name: "Wants",
            description: "e.g. restaurants, movies, games",
            percentageSplit: 30
        },
        {
            name: "Savings",
            description: "e.g. investments, savings account... make sure to plan for emergencies!",
            percentageSplit: 20
        }
    ]

    // tags
    const tasks = [];
    const createTag = async (tag: { name: string; description: string; }) => {
        logger.info(`Creating tag ${tag.name}`)
        await prisma.tag.create({
            data: tag
        })
        logger.info(`Created tag ${tag.name}`)
    }
    for (const tag of tags) {
        const exists = await prisma.tag.findFirst({
            where: {
                name: tag.name
            }
        })
        if (exists) {
            logger.info(`Tag ${tag.name} already exists`)
            continue
        }
        tasks.push(createTag(tag))
    }

    // categories
    const categoryTasks = []
    const createCategory = async (category: { name: string, description: string, percentageSplit: number }) => {
        logger.info(`Creating category ${category.name}`)
        await prisma.category.create({
            data: category
        })
        logger.info(`Created category ${category.name}`)
    }
    for (const category of categories) {
        const exists = await prisma.category.findFirst({
            where: {
                name: category.name
            }
        })
        if (exists) {
            logger.info(`Category ${category.name} already exists`)
            continue
        }
        categoryTasks.push(createCategory(category))
    }

    //
    await Promise.all([...tasks])
    logger.info("Done adding tags and categories.")
}

main()
