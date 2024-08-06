import { Link } from 'react-router-dom'
import { Product } from '../../../interfaces/product'
type Props = {
  products: Product[]
  onDel: (id: number) => void
}
const ProductList = ({ products, onDel }: Props) => {
  return (
    <div className='w-auto ml-60'>

      <div className="overflow-x-auto">
        <Link to="/admin/add"
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 ml-10 mt-4"
        >
          Add Product
        </Link>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr >
              <th className=" px-4 py-2 font-medium text-gray-900">Name</th>
              <th className=" px-4 py-2 font-medium text-gray-900">Price</th>
              <th className=" px-4 py-2 font-medium text-gray-900">Image</th>
              <th className=" px-4 py-2 font-medium text-gray-900">Description</th>
              <th className=" px-4 py-2 font-medium text-gray-900">Category</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className=" px-4 py-2 font-medium text-gray-900">{product.name}</td>
                <td className=" px-4 py-2 text-gray-700">{product.price}</td>
                <td className=" px-4 py-2 text-gray-700">
                  <img src={product.thumbnail} alt="" />
                </td>
                <td className=" px-4 py-2 text-gray-700">{product.short_description}</td>
                <td className=" px-4 py-2 text-gray-700">{product.category}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <Link
                    to={`/admin/edit/${product.id}`}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => onDel(Number(product.id))}
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
            )}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList
