
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/website/Home'
import ProductDetail from './pages/website/ProductDetail'
import { useEffect, useState } from 'react'
import { addProduct, CategoryAdd, CategoryList, deleteCategory, deleteProduct, editCategory, editProduct, getAllProduct } from './apis/products'
import { Product } from './interfaces/product'

import Header from './components/header'
import Footer from './components/footer'
import Shops from './pages/website/Shop'
import Login from './pages/website/Login'
import Register from './pages/website/Register'
import CategoryProduct from './pages/admin/category/CategoryProduct'
import ListCategory from './pages/admin/category/ListCategory'
import ProductList from './pages/admin/component/ProductList'
import ProductAdd from './pages/admin/component/ProductAdd'
import EditProduct from './pages/admin/component/EditProduct'
import LayoutAdmin from './pages/admin/LayoutAdmin'
import CategoryEdit from './pages/admin/category/CategoryEdit'
import Search from './pages/website/Search'
import Category from './pages/website/Category'
import Cart from './pages/website/Cart'
import Checkout from './pages/website/Checkout'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import PrivaterRouter from './PrivateRouter'


function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [products, setProducts] = useState<Product[]>([])
  const [categorys, setCategorys] = useState<Category[]>([])
  useEffect(() => {
    (async () => {
      const data = await getAllProduct()
      setProducts(data)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const data = await CategoryList()
      setCategorys(data)
    })()
  }, [])

  const handelDelete = (id: number) => {
    (async () => {
      if (confirm("Ban co muon xoa khong")) {
        await deleteProduct(id)
        setProducts(products.filter((item) => item.id !== id && id))
      }
    })()
  }

  const handleAddProduct = (data: Product) => {
    (async () => {
      const newProduct = await addProduct(data);
      setProducts([...products, newProduct]);
      navigate("/admin/list")
    })();
  };

  const handleEditProduct = (data: Product) => {
    (async () => {
      const product = await editProduct(data);
      setProducts(products.map((item) => (item.id === product.id ? product : item)));
      navigate("/admin/list")
    })();
  };
  const handleCategory = (data: Category) => {
    (async () => {
      const category = await CategoryAdd(data)
      setCategorys([...categorys, category])
      navigate("/admin/listCategory")
    })()
  }
  const handleEditCategory = (data: Category) => {
    (async () => {
      const cate = await editCategory(data);
      setCategorys(categorys.map((item) => (item.id === cate.id ? cate : item)));
      navigate("/admin/listCategory")
    })();
  };

  const handelDeleteCategory = (id: number) => {
    (async () => {
      if (confirm("Ban co muon xoa khong")) {
        await deleteCategory(id)
        setCategorys(categorys.filter((item) => item.id !== id && id))
      }
    })()
  }

  const AdminRoute = location.pathname.startsWith('/admin')
  return (
    <>
      {!AdminRoute && <Header />}
      <UserProvider>
        <CartProvider>
          <Routes>
            {/* <Routes */}
            <Route  >
              <Route path='/' element={<Home products={products} categories={categorys} />} />
              <Route path='products' element={<Shops products={products} />} />
              <Route path='detail/:id' element={<ProductDetail />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='search' element={<Search />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path='cart' element={<Cart />} />
              <Route path='checkout' element={<Checkout />} />
            </Route>
            <Route path='/admin' element={<PrivaterRouter> <LayoutAdmin /></PrivaterRouter>}>
              <Route path='list' element={<ProductList products={products} onDel={handelDelete} />} />
              <Route path='add' element={<ProductAdd onAdd={handleAddProduct} />} />
              <Route path='edit/:id' element={<EditProduct onEdit={handleEditProduct} />} />
              <Route path='listCategory' element={<ListCategory categorys={categorys} onDelete={handelDeleteCategory} />} />
              <Route path='category' element={<CategoryProduct onCategory={handleCategory} />} />
              <Route path='category/edit/:id' element={<CategoryEdit onUpdate={handleEditCategory} />} />
            </Route>

          </Routes>
        </CartProvider>
      </UserProvider>
      {!AdminRoute && <Footer />}
    </>
  )

}

export default App