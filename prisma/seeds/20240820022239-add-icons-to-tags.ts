import addIconToDb from '../utils/add-icon-to-db';

const main = async () => {
    await Promise.all([
        addIconToDb('tag-home-icon.png', { connectToTag: true, tagName: 'Housing' }),
        addIconToDb('transportation-icon.png', { connectToTag: true, tagName: 'Transportation' }),
        addIconToDb('utilities-icon.png', { connectToTag: true, tagName: 'Utilities' }),
        addIconToDb('first-aid-icon.png', { connectToTag: true, tagName: 'Medical & Healthcare' }),
        addIconToDb('savings-icon.png', { connectToTag: true, tagName: 'Savings' }),
        addIconToDb('cutlery-icon.png', { connectToTag: true, tagName: 'Food' }),
        addIconToDb('budget-icon.png', { connectToTag: true, tagName: 'Personal Spendings' }),
        addIconToDb('entertainment-icon.png', { connectToTag: true, tagName: 'Recreation & Entertainment' }),
        addIconToDb('categorize-icon.png', { connectToTag: true, tagName: 'Miscellaneous' }),
        addIconToDb('edit-icon.png')
    ])
}

main()
