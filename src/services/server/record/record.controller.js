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

export async function updateRecord(req, res) {
    try {
        const record = req.json()
        // const record = req.body
        const updatedrecord = await recordService.update(record)
        res.json(updatedrecord)
    } catch (error) {
        res.status(500).send({ error: 'Failed to update record' })
    }
}

export async function removeRecord(req, res) {
    try {
        const { id } = req.params
        const removedrecord = await recordService.remove(id)
        res.send(removedrecord)
    } catch (error) {
        res.status(500).send({ error: 'Failed to remove record' })
    }
}