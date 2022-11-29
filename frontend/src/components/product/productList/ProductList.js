import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { SpinnerImg } from '../../loader/Loader'
import './productList.scss'

const ProductList = ({ products, isLoading }) => {
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      const shortenedText = text.substr(0, maxLength) + '...'
      return shortenedText
    }
    return text
  }

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <h3>Search Products</h3>
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
                {products.map((product, index) => {
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
