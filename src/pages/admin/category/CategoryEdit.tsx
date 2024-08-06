import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getIdCategory } from '../../../apis/products';
import { Category } from '../../../interfaces/product';

type Props = {
    onUpdate: (data: Category) => void;
}

const CategoryEdit = ({ onUpdate }: Props) => {
    const [category, setCategory] = useState<Category | null>(null);
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Category>({});

    const onSubmit = (data: Category) => {
        if (id) {
            console.log("Updating category with data:", { ...data, id });
            onUpdate({ ...data, id });
        }
    }

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const data = await getIdCategory(`${id}`);
                    setCategory(data);
                    reset(data);
                } catch (error) {
                    console.error('Failed to fetch category', error);
                }
            })();
        }
    }, [id, reset]);

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Edit Category</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="name">Name</label>
                        <div className="relative">
                            <input
                                id="name"
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter category"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className='text-red-700 text-[12px]'>Tên danh mục không được bỏ trống</span>}
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
                            {errors.name && <span className='text-red-700 text-[12px]'>Tên danh mục không được bỏ trống</span>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryEdit;
