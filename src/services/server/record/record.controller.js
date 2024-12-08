import recordService from './record.service'

export async function getRecords() {
    try {
        const records = await recordService.query()
        return records
    } catch (error) {
        throw error
    }
}

export async function getRecordById(id) {
    try {
        const record = await recordService.getById(id)
        return record
    } catch (error) {
        throw error
    }
}

export async function addRecord(req) {
    try {
        const newRecord = await req.json()
        const addedRecord = await recordService.add(newRecord)
        return addedRecord
    } catch (error) {
        throw error
    }
}

export async function updateRecord(req) {
    try {
        const record = await req.json()
        const updatedRecord = await recordService.update(record)
        return updatedRecord
    } catch (error) {
        console.log(error)
        
    }
}


export async function removeRecord(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        const removedRecord = await recordService.remove(id)
        return removedRecord
    } catch (error) {
        console.log(error)
        
        // res.status(500).send({ error: 'Failed to remove record' })
    }
}