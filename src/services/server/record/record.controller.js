const recordService = require('./server.record.service')

module.exports = {
    getRecords,
    getRecordById,
    addRecord,
    updateRecord,
    removeRecord
}

async function getRecords(req, res) {
    try {
        const records = await recordService.query()
        return records
    } catch (error) {
        res.status(500).send({ error: 'Failed to get all records' })
    }
}

// async function getRecordById(req, res) {
async function getRecordById(id) {
    try {
        const { id } = req.params
        const record = await recordService.getById(id)
        return record
        // res.json(record)
    } catch (error) {
        return {error: 'Failed to get record'}
        // res.status(500).send({ error: 'Failed to get record' })
    }
}

async function addRecord(req, res) {
    try {
        const record = req.body
        const newrecord = await recordService.add(record)
        res.json(newrecord)
    } catch (error) {
        res.status(500).send({ error: 'Failed to add new record' })
    }
}

async function updateRecord(req, res) {
    try {
        const record = req.body
        const updatedrecord = await recordService.update(record)
        res.json(updatedrecord)
    } catch (error) {
        res.status(500).send({ error: 'Failed to update record' })
    }
}

async function removeRecord(req, res) {
    try {
        const { id } = req.params
        const removedrecord = await recordService.remove(id)
        res.send(removedrecord)
    } catch (error) {
        res.status(500).send({ error: 'Failed to remove record' })
    }
}