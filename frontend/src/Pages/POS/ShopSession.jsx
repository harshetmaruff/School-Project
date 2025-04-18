import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Receipts from "../../assets/MenuBarOptions/receipt.svg";
import { getPOSShops, getPOSShopSessions } from '../../components/api';

const ShopSession = () => {
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState('');
  const [sessions, setSessions] = useState([]);

  const Link = [
    {
      id: 1,
      name: "Counters",
      logo: Receipts,
      link: "/pos/counters",
      selected: false
    },
    {
      id: 2,
      name: "Sessions",
      logo: Receipts,
      link: "/pos/shop_session",
      selected: true
    }
  ];

  useEffect(() => {
    const fetchShops = async () => {
      const data = await getPOSShops();
      setShops(data);
    };
    fetchShops();
  }, []);

  const handleShopChange = async (e) => {
    const shopId = e.target.value;
    setSelectedShopId(shopId);

    if (shopId) {
      const selectedShop = shops.find(s => s.id === parseInt(shopId));
      const data = {
        id: selectedShop.id,
        shop_name: selectedShop.shop_name,
        warehouse_id: selectedShop.warehouse_id
      };

      const sessionData = await getPOSShopSessions(data);
      setSessions(sessionData);
    } else {
      setSessions([]);
    }
  };

  return (
    <div className="flex w-screen">
      <Sidebar selected='POS' option={Link} />

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-darkviolette">Shop Sessions</h2>

        <div className="mb-6">
          <label htmlFor="shopDropdown" className="font-semibold mr-2">Select Shop:</label>
          <select
            id="shopDropdown"
            value={selectedShopId}
            onChange={handleShopChange}
            className="p-2 ring-2 ring-gray-300 rounded"
          >
            <option value="">-- Select Shop --</option>
            {shops.map(shop => (
              <option key={shop.id} value={shop.id}>{shop.shop_name}</option>
            ))}
          </select>
        </div>

        {selectedShopId && (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">Session Date</th>
                <th className="p-3 border">User</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{session.session_date}</td>
                  <td className="p-3 border">{session.user_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShopSession;
