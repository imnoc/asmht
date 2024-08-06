import React from 'react'
import { useForm } from 'react-hook-form'
import { Category } from '../../../interfaces/product'
type Props = {
  onCategory: (data: Category) => void
}
const CategoryProduct = ({ onCategory }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Category>({})
  const onSubmit = (data: Category) => {
    onCategory(data)
  }
  return (
    <div>

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Category</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="category" >Name</label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter category"
                {...register("name", { required: true })}
              />
              {(errors.name) && <span className='text-red-700 text-[12px]'>Tên danh mục không được bỏ trống</span>}
            </div>
          </div>
          <div>
            <label htmlFor="name">Image</label>
            <div className="relative">
              <input
                id="image"
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter category"
                {...register("thumbnail", { required: true })}
              />
              {errors.thumbnail && <span className='text-red-700 text-[12px]'>image bỏ trống</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryProduct
