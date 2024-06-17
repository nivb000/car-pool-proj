const MongoClient = require('mongodb').MongoClient

const config = require('../../config/index')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'carpoolDB'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.error('Failed to get Mongo collection', err)
        // logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL)
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.error('Cannot Connect to DB', err)
        // logger.error('Cannot Connect to DB', err)
        throw err
    }
}




