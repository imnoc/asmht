
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import instance from '../../../apis';
import { Category, Product } from '../../../interfaces/product';


type Props = {
  onAdd: (data: Product) => void;
}

const ProductAdd = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<Product>({
  });
  const onSubmit: SubmitHandler<Product> = (data) => {
    onAdd(data)
  }
  const [categorys, setCategorys] = useState<Category[]>([])
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`categorys`)
      setCategorys(data)
    })()
  }, [])
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Add Product</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Thêm mới sản phẩm</p>

            <div>
              <label htmlFor="title">Name</label>

              <div className="relative">
                <input id='name'
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter name"
                  {...register("name", { required: true, minLength: 6 })}
                />
                {errors.name?.type === "required" && <span className="text-red-500">Tên không được bỏ trống</span>}
                {errors.name?.type === "minLength" && <span className="text-red-500">Tên phải lớn hơn 6 kí tự</span>}
              </div>
            </div>

            <div>
              <label htmlFor="price">Price</label>

              <div className="relative">
                <input id='price'
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter price"
                  {...register("price", { required: true, min: 0 })}
                />
                {errors.price?.type === "required" && <span className="text-red-500">Giá không được bỏ trống</span>}
                {errors.price?.type === "min" && <span className="text-red-500">Giá phải lớn hơn 0</span>}
              </div>
            </div>

            <div>
              <label htmlFor="description">Description</label>

              <div className="relative">
                <input id='description'
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Description"
                  {...register("short_description")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="images">Images</label>

              <div className="relative">
                <input id='thumbnail'
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter images"
                  {...register("thumbnail")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <div className="relative">
                <select className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" {...register("category")} id="category">
                  <option value="">Select category</option>
                  {categorys.map(item => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  ))}
                </select>
                {errors.category && <span className="text-red-500">Vui lòng chọn danh mục</span>}
              </div>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductAdd
