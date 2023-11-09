import React from 'react'
import { useEffect,useState } from 'react';
import { makeRequest } from '../../../axios';



const AddProducts = (props) => {

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);
  
console.log(props)

useEffect(()=>{
    const fetchData  =  async () => {
      try {
        const response = await makeRequest.get("/products/getproducts/");
        setProducts(response.data);  
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };


  const handleSubmit = (e) => {
e.preventDefault();
setSuccessMessage(null);
    console.log(selectedProducts);
    // Send the selected task IDs and the customer ID to the server
    makeRequest.post(`/products/addproductcustomer/${props.id}`, {
      selectedProducts,
    })
    .then((response) => {
      console.log('products have been selected and submitted to the server.');
      setSuccessMessage("Products Added Successfully");
      // You can handle further actions or user feedback here
    })
    .catch((error) => {
      console.error('Error submitting selected Products:', error);
    });
  };

  



  return (
    <div className='relatedSection'><h5>Select Products</h5>
    <form onSubmit={handleSubmit}>
    <div className='relatedList'>
    { products.map((product, key) => {
return (
  <li key={product.id}>

   <input type="checkbox" onChange={() => handleCheckboxChange(product.id)}
checked={selectedProducts.includes(product.id)} name="product_productId" value={product.id} id={product.id} />
    <label for={product.id}>{product.description}</label>
    </li>
)
   
  
})}
</div>
<button type='submit' className='mt-3 btn btn-primary'> Add Products</button>
{successMessage && <p className='text-success'>{successMessage}</p>}
</form>
</div>
  )
}

export default AddProducts