//@ts-nocheck
"use client"
import { useState } from "react"
import { CompactTable } from "@table-library/react-table-library/compact"
import { useTheme } from "@table-library/react-table-library/theme"
import { getTheme } from "@table-library/react-table-library/baseline"
import { useSort } from "@table-library/react-table-library/sort"
import { usePagination } from "@table-library/react-table-library/pagination"
import { Record } from "@/interfaces/record"
import Button from '@mui/material/Button'
import { Pagination } from "@mui/material"
import { RecordModal } from "./record-modal"
import Link from "next/link"
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { httpService } from "@/services/http.service"
import { SnackbarOrigin } from '@mui/material/Snackbar'
import { AlertBar } from "./alert-bar"
import { MdDeleteOutline, MdEdit } from "react-icons/md"


// TODO: Change the table from portable to avoid key error

interface State extends SnackbarOrigin {
    open: boolean;
}

export const RecordTable = ({ initialRecords }: { initialRecords: Record[] }) => {

    const { data: user, error, isLoading } = useSWR('/api/auth', fetcher)
    const [records, setRecords] = useState(initialRecords)
    const [search, setSearch] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)
    const [alertMsg, setAlertMsg] = useState("")
    const [alertState, setAlertState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    })



    const theme = useTheme([
        getTheme(),
        {
            Table: `
                margin-bottom: 1rem;
            `,
            HeaderRow: `
              background-color: #2A9FFF;
            `,
            Row: `
              &:nth-of-type(odd) {
                background-color: #d2e9fb;
              }
      
              &:nth-of-type(even) {
                background-color: #eaf5fd;
              }
            `,
            BaseCell: `
    
            text-align: center;
            padding: 0.8rem 0.5rem;
            &:first-of-type {
              text-align: center;
            }
    
            &:last-of-type {
              text-align: center;
            }
          `,
        },
    ])

    const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(target.value)
    }

    const pagination = usePagination(records, {
        state: {
            page: 0,
            size: 7,
        }
    })

    const handlePageChange = (ev, newPage) => {
        pagination.fns.onSetPage(newPage - 1)
    }

    let recordsToRender = {
        nodes: records.filter((record: any) =>
            record.startingPoint.toLowerCase().includes(search.toLowerCase()) ||
            record.driver.name.toLowerCase().includes(search.toLowerCase()) ||
            record.destinationPoint.toLowerCase().includes(search.toLowerCase())
        ).reverse(),
    }



    const sort = useSort(
        records,
        {
            onChange: onSortChange,
        },
        {
            sortFns: {
                ENDKM: (array: Record[]) => array.sort((a, b) => a.driveEndKm - b.driveEndKm),
                STARTKM: (array: Record[]) => array.sort((a, b) => a.startKm - b.startKm),
                startingPoint: (array: Record[]) => array.sort((a, b) => a.startingPoint.localeCompare(b.startingPoint)),
                destination: (array: Record[]) => array.sort((a, b) => a.destinationPoint.localeCompare(b.destinationPoint)),
            }
        }
    )

    function onSortChange(action: any, state: any) {
        console.log(action, state)
    }


    const COLUMNS = [
        { label: "תאריך סיום", renderCell: (record: Record) => new Date(record.endDate).toLocaleDateString('he-IL'), resize: true },
        { label: "תאריך התחלה", renderCell: (record: Record) => new Date(record.startDate).toLocaleDateString('he-IL'), resize: true },
        { label: 'ק"מ סוף נסיעה', renderCell: (record: Record) => record.driveEndKm.toLocaleString('he-IL'), resize: true, sort: { sortKey: "ENDKM" } },
        { label: 'ק"מ תחילת נסיעה', renderCell: (record: Record) => record.startKm.toLocaleString('he-IL'), resize: true, sort: { sortKey: "STARTKM" } },
        { label: "נקודת יעד", renderCell: (record: Record) => record.destinationPoint, resize: true, sort: { sortKey: "destination" } },
        { label: "נקודת מוצא", renderCell: (record: Record) => record.startingPoint, resize: true, sort: { sortKey: "startingPoint" } },
        { label: "נהג", renderCell: (record: Record) => <RecordModal record={record} />, resize: true },
    ]

    if (user?.isAdmin) {
        COLUMNS.unshift(
            {
                label: "פעולות", renderCell: (record: Record) => (
                    <div className="flex space-evenly admin-actions">
                        <div className="icon-wrapper" onClick={() => handleDelete(record._id)}>
                            <MdDeleteOutline color="white" />
                        </div>
                        <Link href={`/record/edit/${record._id}`}>
                            <div className="icon-wrapper">
                                <MdEdit color="white" />
                            </div>
                        </Link>
                    </div>
                ), resize: true
            },
        )
    }

    const handleDelete = async (recordId) => {
        const verifyAction = confirm("האם אתה בטוח רוצה למחוק את הרשומה ? ")
        if(verifyAction){
            setRecords(records.filter(rec => rec._id != recordId))
            const deletedRecord = await httpService.delete(`record?id=${recordId}`)
            setAlertMsg(`נסיעה נמחקה בהצלחה`)
            setAlertState(prevState => ({ ...prevState, open: true }))
        }
    }


    return (
        <>
            <div className="flex space-between table-top-toolbar">
                <Link href={`/record/edit?lastRideKm=${records.length > 0 ? records[records.length - 1].driveEndKm : 0}`}>
                    <Button variant="contained" color="success">הוסף נסיעה חדשה</Button>
                </Link>
                <input id="search" type="search" value={search} onChange={handleSearch} placeholder="חפש" />
            </div>
            <CompactTable columns={COLUMNS} data={recordsToRender} theme={theme} layout={{ fixedHeader: true }} sort={sort} pagination={pagination} />
            <Pagination count={pagination.state.getTotalPages(recordsToRender.nodes)} color="primary" onChange={handlePageChange} style={{ alignSelf: 'center' }} />
            <AlertBar msg={alertMsg} snackBarState={alertState} />
        </>
    )
}