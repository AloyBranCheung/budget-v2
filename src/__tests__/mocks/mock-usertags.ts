import { Prisma } from "@prisma/client"

const mockUserTags: Prisma.TagGetPayload<object>[] = [
    {
        "id": "3ee87d42-8bb4-47b2-bd10-be717ba3702c",
        "createdAt": new Date("2024-04-27T13:25:00.829Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.829Z"),
        "name": "Food",
        "description": "Whether you’re grocery shopping and cooking at home or sampling the local culinary scene, you’ll need to account for food expenses. Many budgeters include grocery shopping and dining out in this category (e.g., restaurant meals, work lunches, food delivery, etc.)",
        "userId": null
    },
    {
        "id": "9986ca9a-d8c9-421a-9407-da119ba0b774",
        "createdAt": new Date("2024-04-27T13:25:00.829Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.829Z"),
        "name": "Housing",
        "description": "The amount you pay to have a roof over your head constitutes a housing cost. This includes everything from rent or mortgage payments to property taxes, HOA dues, and home maintenance costs. For most budgeters, this category is by far the biggest.",
        "userId": null
    },
    {
        "id": "fddbb21a-8afd-4cbd-a10e-6d8b173358c5",
        "createdAt": new Date("2024-04-27T13:25:00.922Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.922Z"),
        "name": "Medical & Healthcare",
        "description": "As the adage goes, “health is wealth,” so be sure to include enough in your budget to cover these costs. If you plan for essential medical care such as yearly physicals, dental appointments, and even mental health care, you’re much more likely to live a long, healthy life.",
        "userId": null
    },
    {
        "id": "f164f618-41b3-4b42-baab-bfccaa0ce47a",
        "createdAt": new Date("2024-04-27T13:25:01.039Z"),
        "updatedAt": new Date("2024-04-27T13:25:01.039Z"),
        "name": "Miscellaneous",
        "description": "This category is a catch-all for anything that doesn’t fit into any other category.",
        "userId": null
    },
    {
        "id": "31d05bb8-e10a-4071-8a91-505540f5a53b",
        "createdAt": new Date("2024-04-27T13:25:00.925Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.925Z"),
        "name": "Personal Spendings",
        "description": "This category is a catch-all for anything that could be considered a personal care or “lifestyle” expense.",
        "userId": null
    },
    {
        "id": "3e8601d5-e0f1-4ed6-b4dd-a8460ddcb681",
        "createdAt": new Date("2024-04-27T13:25:00.928Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.928Z"),
        "name": "Recreation & Entertainment",
        "description": "For most of us, carving out time for fun (and the money to afford it) is essential to maintaining a healthy work-life balance.",
        "userId": null
    },
    {
        "id": "d600f6bf-797b-4038-8596-1271e932fd9e",
        "createdAt": new Date("2024-04-27T13:25:00.923Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.923Z"),
        "name": "Savings",
        "description": "This often-overlooked (or dare we say, underfunded?) home budget category is arguably the most important — it can really set you up for financial health down the road.",
        "userId": null
    },
    {
        "id": "0519f708-8bb0-4e19-87c4-cf306b532098",
        "createdAt": new Date("2024-04-27T13:25:00.827Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.827Z"),
        "name": "Transportation",
        "description": "Regardless of your location or lifestyle, everyone needs to get from point A to point B. Typically, this budget category includes car payments, registration and DMV fees, gas, maintenance, parking, tolls, ridesharing costs, and public transit.",
        "userId": null
    },
    {
        "id": "301139fb-2b47-4290-b0be-2ac16713efbe",
        "createdAt": new Date("2024-04-27T13:25:00.920Z"),
        "updatedAt": new Date("2024-04-27T13:25:00.920Z"),
        "name": "Utilities",
        "description": "This category covers all the expenses that keep your essential household services up and running. Utilities generally include your gas, electricity, water, and sewage bills. Households may also factor in their “connectivity” expenses, like cell phone bills and internet expenses.",
        "userId": null
    }
]
export default mockUserTags