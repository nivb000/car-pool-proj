import { asyncStorageService } from './async-storage.service.js'
import { records as demoData } from './demoData.ts'

export const recordService = {
    getById,
    query,
    remove,
    save
}

const KEY = 'record'

function getById(recordId) {
    return asyncStorageService.get(KEY, recordId)
}

function remove(recordId) {
    return asyncStorageService.remove(KEY, recordId)
}

function save(record) {
    if (record._id) return asyncStorageService.put(KEY, record)
    else return asyncStorageService.post(KEY, record)
}

function query(filterBy) {

    return asyncStorageService.query(KEY)
        .then(records => {
            if (!records || !records.length) {
                records = _creadeRecords()
                return asyncStorageService.postMany(KEY, records)
            }
            if (filterBy) {
                let { vendor, minSpeed, maxSpeed } = filterBy
                if (!minSpeed) minSpeed = 0;
                if (!maxSpeed) maxSpeed = Infinity
                records = records.filter(record => (
                    record.vendor.includes(vendor) &&
                    record.speed >= minSpeed &&
                    record.speed <= maxSpeed
                ))
            }
            return records
        })
}


function _creadeRecords() {
    console.log('Creating new demo data...')
    const records = demoData
    return records
}