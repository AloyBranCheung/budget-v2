import addIconToDb from '../utils/add-icon-to-db';

const main = async () => {
    await addIconToDb('tag-home-icon.png', { connectToTag: true, tagName: 'Housing' })
    await addIconToDb('transportation-icon.png', { connectToTag: true, tagName: 'Transportation' })
    await addIconToDb('utilities-icon.png', { connectToTag: true, tagName: 'Utilities' })
    await addIconToDb('first-aid-icon.png', { connectToTag: true, tagName: 'Medical & Healthcare' })
    await addIconToDb('savings-icon.png', { connectToTag: true, tagName: 'Savings' })
    await addIconToDb('cutlery-icon.png', { connectToTag: true, tagName: 'Food' })
    await addIconToDb('budget-icon.png', { connectToTag: true, tagName: 'Personal Spendings' })
    await addIconToDb('entertainment-icon.png', { connectToTag: true, tagName: 'Recreation & Entertainment' })
    await addIconToDb('categorize-icon.png', { connectToTag: true, tagName: 'Miscellaneous' })
}

main()
