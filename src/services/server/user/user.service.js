import dbService from '../db.service'
import { ObjectId } from 'mongodb'

export async function query() {

    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find().toArray()
        users = users.map(user => {
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        throw err
    }
}

export async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId.createFromHexString(id) })
        delete user.password
        return user
    } catch (err) {
        throw err
    }
}
export async function getByEmail(email) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        throw err
    }
}

export async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId.createFromHexString(id) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

export async function update(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(user._id),
            username: user.username,
            fullname: user.fullname,
            isHost: user.isHost
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        throw err
    }
}

export async function add(user) {
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            isHost: false
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        throw err
    }
}