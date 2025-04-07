import { useNavigate } from "react-router"
import { getAddress, getCustomer, removeAddress, removePartner } from "../api";
import { useEffect, useState } from "react";

const EmployeeTable = () => {

    const navigate = useNavigate();

    const [VendorData, setVendorData] = useState([]);

    const getVendorData = async () => {
      const data = await getCustomer(navigate);
      if(Array.isArray(data)) {
          setVendorData(data)
          console.log(data)
      }
    }

    useEffect(() => {
      getVendorData()
    }, [])

    return (
      <div className='flex-1 ml-4'>
          <div className='flex flex-row justify-between mt-4'>
              <h2 className='text-darkviolette font-bold text-2xl '>Employee</h2>
              <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={ () => { navigate('/teams/vendor/create') } }>Create</button>
          </div>
          <div className="mt-6 m-4">
            <table className="w-full table-auto">
              <thead>
                <tr className='border-b-4 border-darkviolette'>
                    <th className='text-left p-1'>Name</th>
                    <th className='text-left p-1'>GST Number</th>
                    <th className='text-left p-1'>PAN Number</th>
                </tr>
              </thead>
              <tbody>
                {  
                  VendorData.map((item) => {
                    return(
                      <tr className="bg-bwhite" id={item.id}>
                          <td className="p-2">{ item.name }</td>
                          <td className="p-2">{ item.gst_number }</td>
                          <td className="p-2">{ item.pan_number }</td>
                          <td className='p-2 text-green-500 font-bold text-right'>
                             <span
                                 onClick={async () => {
                                    navigate("/teams/vendor/" + item.id + "/edit")
                                 }}
                             >EDIT</span> 
                             <span
                                 onClick={async () => {
                                    let request = await getAddress(navigate);
                                    let data;

                                    for (let i = 0; i < request.length; i++) {
                                      if(request[i].partner_id == item.id) {
                                        data = request[i];
                                        request = await removeAddress(data, navigate);
                                        console.log(request);
                                        break;
                                      }
                                    }

                                    request = await removePartner(item, navigate);
                                    console.log(request)
                                    if(request.success) {
                                      navigate(0);
                                    }
                                 }}
                                 className='ml-8 text-red-500'
                             >X</span>
                          </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
      </div>
    )
  }
  
export default EmployeeTable