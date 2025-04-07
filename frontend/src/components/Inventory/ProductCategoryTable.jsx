import { useNavigate } from "react-router"
import { getProductCategories, removeProductCategory} from "../api";
import { useEffect, useState } from "react";

const ProductCategoryTable = () => {

    const navigate = useNavigate();

    const [CategoryData, setCategoryData] = useState([]);

    const getCategoryData = async () => {
      const data = await getProductCategories(navigate);
      if(Array.isArray(data)) {
          setCategoryData(data)
          console.log(data)
      }
    }

    useEffect(() => {
      getCategoryData()
    }, [])

    return (
      <div className='flex-1 ml-4'>
          <div className='flex flex-row justify-between mt-4'>
              <h2 className='text-darkviolette font-bold text-2xl '>Product Category</h2>
              <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={ () => { navigate('/inventory/product_category/create') } }>Create</button>
          </div>
          <div className="mt-6 m-4">
            <table className="w-full table-auto">
              <thead>
                <tr className='border-b-4 border-darkviolette'>
                    <th className='text-left p-1'>Name</th>
                </tr>
              </thead>
              <tbody>
                {  
                  CategoryData.map((item) => {
                    return(
                      <tr className="bg-bwhite" id={item.id}>
                          <td className="p-2">{ item.category_name }</td>
                          <td className='p-2 text-green-500 font-bold text-right'>
                             <span
                                 onClick={async () => {
                                    let request = await removeProductCategory({
                                      id: item.id,
                                      category_name: item.category_name
                                    });
                                    console.log(request);
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
  
export default ProductCategoryTable