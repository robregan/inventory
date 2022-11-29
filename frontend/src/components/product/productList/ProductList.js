import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from '../../../redux/features/product/filterSlice'
import { SpinnerImg } from '../../loader/Loader'
import Search from '../../search/Search'
import './productList.scss'

const ProductList = ({ products, isLoading }) => {
  const filteredProducts = useSelector(selectFilteredProducts)
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      const shortenedText = text.substr(0, maxLength) + '...'
      return shortenedText
    }
    return text
  }

  useEffect(() => {
    dispatch(
      FILTER_PRODUCTS({
        products,
        search,
      })
    )
  }, [dispatch, products, search])

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className='table'>
          {!isLoading && products.length === 0 ? (
            <p>-- No Product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => {
                  const { _id, name, category, price, quantity } = product
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>${price}</td>
                      <td>{quantity}</td>
                      <td>${price * quantity}</td>
                      <td className='icons'>
                        <span>
                          <AiOutlineEye size={25} color={'purple'} />
                        </span>
                        <span>
                          <FaEdit size={20} color={'green'} />
                        </span>
                        <span>
                          <FaTrash size={20} color={'red'} />
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
