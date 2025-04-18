import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { getProducts, getPOSReceiptItems, getLedger } from '../components/api'
import { useNavigate } from 'react-router'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

// Register necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Register ArcElement for Pie charts
  Title,
  Tooltip,
  Legend
)

const Analytics = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [receipts, setReceipts] = useState([])
  const [ledgers, setLedgers] = useState([])
  const [productSales, setProductSales] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [productData, receiptData, ledgerData] = await Promise.all([
        getProducts(navigate),
        getPOSReceiptItems({}, navigate),
        getLedger({}, navigate)
      ])

      if (Array.isArray(productData)) setProducts(productData)
      if (Array.isArray(receiptData)) setReceipts(receiptData)
      if (Array.isArray(ledgerData)) setLedgers(ledgerData)
    }

    fetchData()
  }, [navigate])

  useEffect(() => {
    if (products.length && receipts.length) {
      const salesMap = {}

      receipts.forEach((r) => {
        if (!salesMap[r.product_id]) {
          salesMap[r.product_id] = 0
        }
        salesMap[r.product_id] += r.quantity
      })

      const result = products.map((p) => ({
        id: p.id,
        name: p.product_name,
        quantity: salesMap[p.id] || 0
      }))

      setProductSales(result.sort((a, b) => b.quantity - a.quantity))
    }
  }, [products, receipts])

  const Link = [
    { id: 1, name: 'Analytics', logo: '', link: '/analytics', selected: true }
  ]

  // Data for Bar Chart
  const barChartData = {
    labels: productSales.map(p => p.name),
    datasets: [
      {
        label: 'Quantity Sold',
        data: productSales.map(p => p.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  // Data for Pie Chart (Ledger)
  const pieChartData = {
    labels: ledgers.map(l => l.name),
    datasets: [
      {
        data: ledgers.map(l => l.closing_balance || 0),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF4560', '#3E98CC', '#FFB23B', '#43BDBD']
      }
    ]
  }

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar selected='Analytics' option={Link} />
      <div className='flex-1 p-10 overflow-auto'>
        <h2 className='text-darkviolette text-2xl font-bold mb-6'>Analytics Dashboard</h2>

        {/* Bar Chart for Top Selling Products */}
        <div className='mb-10'>
          <h3 className='text-xl font-semibold mb-3'>Top Selling Products</h3>
          <div style={{ height: '400px' }}>
            <Bar data={barChartData} />
          </div>
        </div>

        {/* Pie Chart for Ledger Summary */}
        <div>
          <h3 className='text-xl font-semibold mb-3'>Ledger Summary</h3>
          <div style={{ height: '400px' }}>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
