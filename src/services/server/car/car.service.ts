import dbService from '../db.service'
import { ObjectId } from 'mongodb'
import { Car } from '@/interfaces/car'

export async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection('car')
        let cars = await collection.find().toArray()
        return cars
    } catch (error) {
        throw error
    }
}
export async function queryByOwner(managerId: string | null) {
    try {
        const collection = await dbService.getCollection('car')
        let cars = await collection.aggregate([
            {
                $match: { "owner._id": managerId } // Filter by managerId
            },
            {
                $project: {
                    licenseNumber: 1, // Include licenseNumber
                    ownerId: "$owner._id", // Rename owner._id to ownerId
                    _id: 0, // Exclude _id field
                }
            }
        ]).toArray()
        
        return cars
    } catch (error) {
        console.log(error)
        
        throw error
    }
}
export async function getById(id: string) {
    try {
        const collection = await dbService.getCollection('car')
        const car = await collection.findOne({ _id: ObjectId.createFromHexString(id) })
        return car
    } catch (error) {
        throw error
    }
}
export async function remove(id: string) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(id) })
        return id
    } catch (error) {
        throw error
    }
}

export async function add(car: Car) {
    try {
        car.updatedAt = Date.now()
        const collection = await dbService.getCollection('car')
        const addedCar = await collection.insertOne(car)
        return addedCar
    } catch (error) {
        throw error
    }
}

export async function update(car: Car) {
    try {
        if (car && (car._id !== undefined)) {
            let id = ObjectId.createFromHexString(car._id)
            delete car._id
            const collection = await dbService.getCollection('car')
            await collection.updateOne({ _id: id }, { $set: { ...car } })
        }
        return car
    } catch (error) {
        throw error
    }
}

function _buildCriteria(filterBy: any) {
    const criteria = { guests: null, location: null }
    if (filterBy.guests) criteria.guests = filterBy.guests
    if (filterBy.location) criteria.location = filterBy.location
    return criteria
}