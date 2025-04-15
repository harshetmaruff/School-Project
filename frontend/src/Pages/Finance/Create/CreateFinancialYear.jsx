import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate } from 'react-router'
import { postFinancialYear } from '../../../components/api'

const CreateFinancialYear = () => {
  const navigate = useNavigate()

  const Link = [
    {
      id: 1,
      name: "Journal",
      logo: Receipts,
      link: "/finance/journal",
      selected: false
    },
    {
      id: 2,
      name: "Receipt",
      logo: Receipts,
      link: "/finance/receipt",
      selected: false
    },
    {
      id: 3,
      name: "Payments",
      logo: Receipts,
      link: "/finance/payments",
      selected: false
    },
    {
      id: 4,
      name: "Credit Note",
      logo: Receipts,
      link: "/finance/credit_note",
      selected: false
    },
    {
      id: 5,
      name: "Debit Note",
      logo: Receipts,
      link: "/finance/debit_note",
      selected: false
    },
    {
      id: 6,
      name: "Ledger",
      logo: Receipts,
      link: "/finance/ledger",
      selected: false
    },
    {
      id: 7,
      name: "Bank",
      logo: Receipts,
      link: "/finance/bank",
      selected: false
    },
    {
      id: 8,
      name: "Exchange Rate",
      logo: Receipts,
      link: "/finance/exchange_rate",
      selected: false
    },
    {
      id: 9,
      name: "Financial Year",
      logo: Receipts,
      link: "/finance/financial_year",
      selected: true
    }
  ]

  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    status: 'Open',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postFinancialYear(formData, navigate);
    navigate("/finance/financial_year");
  };

  return (
    <div className="flex w-screen">
      <Sidebar selected='Finance' option={Link} />
      <form className="flex-1 ml-4 p-4" onSubmit={handleSubmit}>
        <h2 className="text-darkviolette text-2xl font-bold my-6">Create Financial Year</h2>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="ring-2 ring-gray-300 p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="ring-2 ring-gray-300 p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="ring-2 ring-gray-300 p-2"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="ring-2 ring-gray-300 p-2"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-darkviolette text-white px-6 py-2 font-bold text-lg"
          >
            Create
          </button>
          <button
            className="bg-darkviolette text-white px-6 py-2 font-bold text-lg"
            onClick={() => navigate("/finance/financial_year")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFinancialYear;
