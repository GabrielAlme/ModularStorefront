import useApi from '../hooks/useApi'

const ProductList = () => {
  const { loading, error, data } = useApi('/api/products')

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Couldn't load products: {error}</p>
  if (data.length === 0) return <p>No products yet.</p>

  return (
    <ul>
      {data.map(p => (
        <li key={p.product_id}>
          {/* price arrives as a string like "9.99" from Postgres, so convert before formatting */}
          {p.product_name} - ${Number(p.price).toFixed(2)} ({p.inventory_count} in stock)
        </li>
      ))}
    </ul>
  )
}

export default ProductList
