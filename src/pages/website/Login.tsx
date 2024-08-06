import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../interfaces/user'
import instance from '../../apis'

const Login = () => {
    const navigate = useNavigate()
    const {register,handleSubmit,formState: { errors}} = useForm<User>({})
    const onSubmit = (user: User) => {
        (async () => {
            const {data} = await instance.post("login",user)
            alert("Đăng nhập thành công")
            // sessionStorage.setItem("token", JSON.stringify(data.accessToken));
            sessionStorage.setItem("user", JSON.stringify(data));
            navigate("/")
        })()
    }
  return (
    <div>  

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Đăng nhập</h1>
  </div>

  <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div>
      <label htmlFor="email">Email</label>

      <div className="relative">
        <input
          type="email"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter email"
          {...register("email",{required:true,pattern: /^\S+@(\S+\.)+\S{2,6}$/})}
        />
        {errors.email?.type == "required" && <span className='text-red-600'>Email không được bỏ trống</span>}
        {errors.email?.type == "pattern" && <span className='text-red-600'>Email không đúng định dạng</span>}
      </div>
    </div>

    <div>
      <label htmlFor="password">Password</label>

      <div className="relative">
        <input
          type="password"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter password"
          {...register("password",{required:true,minLength:6})}
        />
        {errors.password?.type == "required" && <span className='text-red-600'>Password không được bỏ trống</span>}
        {errors.password?.type == "min" && <span className='text-red-600'>Password không được nhỏ hơn 0</span>}
      </div>
    </div>

    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        No account?
        <Link className="underline" to={`/register`}> Sign up</Link>
      </p>
      <button
        type="submit"
        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
      >
        Đăng nhập
      </button>
    </div>
  </form>
</div>
    </div>
  )
}

export default Login