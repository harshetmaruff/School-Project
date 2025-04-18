import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Receipts from '../../../assets/MenuBarOptions/receipt.svg';
import { useNavigate, useParams } from 'react-router';
import { getFinancialYear, editFinancialYear } from '../../../components/api';

const EditFinancialYear = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const Link = [
    {
      id: 1,
      name: "Journal",
      logo: Receipts,
      link: "/finance/journal",
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
  ];

  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    status: 'Open'
  });

  useEffect(() => {
    const fetchData = async () => {
      const financialYears = await getFinancialYear(navigate);
      const current = financialYears.find((item) => item.id === parseInt(id));

      if (current) {
        setFormData({
          name: current.name,
          start_date: current.start_date,
          end_date: current.end_date,
          status: current.status
        });
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      id: parseInt(id),
      name: formData.name,
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: formData.status
    };
    await editFinancialYear(data, navigate);
    navigate("/finance/financial_year");
  };

  return (
    <div className="flex w-screen">
      <Sidebar selected="Finance" option={Link} />
      <form className="flex-1 ml-4" onSubmit={handleEdit}>
        <div className="flex justify-between mt-4 mb-12">
          <h2 className="text-darkviolette font-bold text-2xl">Edit Financial Year</h2>
        </div>
        <div className="mb-8 flex flex-col">
          <div className="flex flex-row items-center">
            <p className="m-2 w-40">Name:</p>
            <input
              className="m-2 ring-2 ring-gray-300 p-1"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center">
            <p className="m-2 w-40">Start Date:</p>
            <input
              className="m-2 ring-2 ring-gray-300 p-1"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center">
            <p className="m-2 w-40">End Date:</p>
            <input
              className="m-2 ring-2 ring-gray-300 p-1"
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center">
            <p className="m-2 w-40">Status:</p>
            <select
              className="m-2 ring-2 ring-gray-300 p-1"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row">
          <button
            type="submit"
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
          >
            Edit
          </button>
          <button
            type="button"
            className="font-bold text-xl p-2 px-4 bg-darkviolette text-white"
            onClick={() => navigate("/finance/financial_year")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFinancialYear;
