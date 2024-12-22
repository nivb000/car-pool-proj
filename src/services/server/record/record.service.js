import dbService from '../db.service'
import { ObjectId } from 'mongodb'

export async function query(userId) {
    try {
        const collection = await dbService.getCollection('record')
        let records = await collection.find({ "car.ownerId": userId }).toArray()
        return records
    } catch (error) {
        throw error
    }
}
export async function queryByLicense(licenseNumber) {
    try {
        const collection = await dbService.getCollection('record')
        let records = await collection.find({ "car.licenseNumber": +licenseNumber }).toArray()
        return records
    } catch (error) {
        throw error
    }
}
export async function getById(id) {
    try {
        const collection = await dbService.getCollection('record')
        const record = await collection.findOne({ _id: ObjectId.createFromHexString(id) })
        return record
    } catch (error) {
        throw error
    }
}
export async function remove(id) {
    try {
        const collection = await dbService.getCollection('record')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
        return id
    } catch (error) {
        throw error
    }
}

export async function add(record) {
    try {
        record.updatedAt = Date.now()
        const collection = await dbService.getCollection('record')
        const addedRecord = await collection.insertOne(record)
        return addedRecord
    } catch (error) {
        throw error
    }
}

export async function update(record) {
    try {
        record.updatedAt = Date.now()
        let id = ObjectId.createFromHexString(record._id)
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