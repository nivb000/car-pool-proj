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
import Link from "next/link"

export const RecordTable = async({ records }: any) => {

    const [search, setSearch] = useState("")
    

    const theme = useTheme([
        getTheme(),
        {
            Table: `
                margin-bottom: 1rem;
            `,
            HeaderRow: `
              background-color: #0062ff;
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
            size: 5,
        }
    })

    const handlePageChange = (ev, newPage) => {
        pagination.fns.onSetPage(newPage - 1)
    }

    let recordsToRender = {
        nodes: records.filter((record: any) =>
            record.startingPoint.toLowerCase().includes(search.toLowerCase()) ||
            record.driver.fullName.toLowerCase().includes(search.toLowerCase()) ||
            record.destinationPoint.toLowerCase().includes(search.toLowerCase())
        ),
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
        { label: 'ק"מ סוף נסיעה', renderCell: (record: Record) => record.driveEndKm, resize: true, sort: { sortKey: "ENDKM" } },
        { label: 'ק"מ תחילת נסיעה', renderCell: (record: Record) => record.startKm, resize: true, sort: { sortKey: "STARTKM" } },
        { label: "נקודת יעד", renderCell: (record: Record) => record.destinationPoint, resize: true, sort: { sortKey: "destination" } },
        { label: "נקודת מוצא", renderCell: (record: Record) => record.startingPoint, resize: true, sort: { sortKey: "startingPoint" } },
        { label: "נהג", renderCell: (record: Record) => <Link href={`/record/${record._id}`}>{record?.driver?.fullName}</Link>, resize: true },
        // { label: "מזהה נסיעה", renderCell: (record: Record) => record._id, resize: true },
    ]


    return (
        <>
            <div className="flex space-between table-top-toolbar">
                <Link href={`/record/edit?lastRideKm=${records.length > 0 ? records[records.length - 1].driveEndKm : 0}`}>
                    <Button variant="contained" color="warning">הוסף נסיעה חדשה</Button>
                </Link>
                <input id="search" type="search" value={search} onChange={handleSearch} placeholder="חפש" />
            </div>
            <CompactTable columns={COLUMNS} data={recordsToRender} theme={theme} layout={{ fixedHeader: true }} sort={sort} pagination={pagination} />
            <Pagination count={pagination.state.getTotalPages(recordsToRender.nodes)} color="primary" onChange={handlePageChange} style={{ alignSelf: 'center' }} />
        </>
    )
}