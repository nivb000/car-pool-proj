import dbService from '../db.service'
import { ObjectId } from 'mongodb'

export async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection('order')
        let orders = await collection.find().toArray()
        return orders
    } catch (error) {
        throw error
    }
}
export async function getById(id) {
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ _id: ObjectId.createFromHexString(id) })
        return order
    } catch (error) {
        throw error
    }
}
export async function remove(id) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
        return id
    } catch (error) {
        throw error
    }
}

export async function add(order) {
    try {
        order.createdAt = Date.now()
        const collection = await dbService.getCollection('order')
        const addedOrder = await collection.insertOne(order)
        return addedOrder
    } catch (error) {
        throw error
    }
}

export async function update(order) {
    try {
        console.log("received", order)
        
        let id = ObjectId.createFromHexString(order._id)
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: id }, { $set: { ...order } })
        return order
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