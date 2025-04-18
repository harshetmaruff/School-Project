import React, { useEffect, useState } from 'react'
import { getJournal, getLedger, getPartner } from '../api'
import { useNavigate } from 'react-router'

const JournalTable = () => {
    const navigate = useNavigate()

    const [journalData, setJournalData] = useState([])
    const [ledgerList, setLedgerList] = useState([])
    const [partnerList, setPartnerList] = useState([])

    const getAllData = async () => {
        const journal = await getJournal(navigate)
        const ledgers = await getLedger(navigate)
        const partners = await getPartner(navigate)
        if (Array.isArray(journal)) {
            setJournalData(journal)
        }
        if (Array.isArray(ledgers)) {
            setLedgerList(ledgers)
        }
        if (Array.isArray(partners)) {
            setPartnerList(partners)
        }
    }

    const getLedgerName = (id) => {
        const ledger = ledgerList.find(l => l.id === id)
        return ledger ? ledger.name : id
    }

    const getPartnerName = (id) => {
        console.log(id);
        console.log(partnerList);
        console.log(journalData);
        const partner = partnerList.find(p => p.id === id)
        
        return partner ? partner.name : id
    }

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    useEffect(() => {
        getAllData()
    }, [])

    return (
        <div className='flex-1 ml-4'>
            <div className='flex flex-row justify-between mt-4'>
                <h2 className='text-darkviolette font-bold text-2xl'>Journal Entries</h2>
                <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={() => { navigate("/finance/journal/create") }}>Create</button>
            </div>
            <div className='mt-6 m-4'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr className='border-b-4 border-darkviolette'>
                            <th className='text-left p-1'>Reference</th>
                            <th className='text-left p-1'>Ledger</th>
                            <th className='text-left p-1'>Partner</th>
                            <th className='text-left p-1'>Date</th>
                            <th className='text-left p-1'>Debit</th>
                            <th className='text-left p-1'>Credit</th>
                            <th className='text-left p-1'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            journalData.map((item, index) => (
                                <tr className='bg-bwhite' key={index}>
                                    <td className='p-2'>{`${item.transaction_reference}-${item.voucher_id}`}</td>
                                    <td className='p-2'>{getLedgerName(item.ledger_id)}</td>
                                    <td className='p-2'>{getPartnerName(item.partner_id)}</td>
                                    <td className='p-2'>{formatDate(item.transaction_date)}</td>
                                    <td className='p-2'>{item.debit}</td>
                                    <td className='p-2'>{item.credit}</td>
                                    {/* <td className='p-2'>
                                        <button
                                            onClick={() => navigate(`/finance/journal/edit/${item.id}`)}
                                            className="text-darkviolette font-bold"
                                        >
                                            Edit
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default JournalTable
