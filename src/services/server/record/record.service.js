import dbService from '../db.service'
import { ObjectId } from 'mongodb'

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}
// queryUserrecords

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection('record')
        let records = await collection.find().toArray()
        return records
    } catch (error) {
        throw error
    }
}
async function getById(id) {
    try {
        const collection = await dbService.getCollection('record')
        const record = collection.findOne({ _id: ObjectId.createFromHexString(id) })
        return record
    } catch (error) {
        throw error
    }
}
async function remove(id) {
    try {
        const collection = await dbService.getCollection('record')
        await collection.deleteOne({ _id: ObjectId(id) })
        return id
    } catch (error) {
        throw error
    }
}

async function add(record) {
    try {
        record.createdAt = Date.now()
        const collection = await dbService.getCollection('record')
        const addedrecord = await collection.insertOne(record)
        return addedrecord
    } catch (error) {
        throw error
    }
}

async function update(record) {
    try {
        let id = ObjectId(record._id)
        delete record._id
        const collection = await dbService.getCollection('record')
        await collection.updateOne({ _id: id }, { $set: { ...record } })
        return record
    } catch (error) {
        throw error
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.guests) criteria.guests = filterBy.guests
    if (filterBy.location) criteria.location = filterBy.location
    return criteria
}