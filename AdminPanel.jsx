import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

 
  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Məhsullar alınarkən xəta baş verdi:', error);
      });
  }, []);

 
  const handleSubmit = (values) => {
    axios.post('http://localhost:5000/books', values)
      .then(response => {
        setProducts([...products, response.data]);  
      })
      .catch(error => {
        console.error('Məhsul əlavə edərkən xəta baş verdi:', error);
      });
  };

  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id)); 
      })
      .catch(error => {
        console.error('Məhsul silinərkən xəta baş verdi:', error);
      });
  };

  return (
    <div>
      <h1>Admin Panel</h1>

     
      <Formik
        initialValues={{ title: '', author: '', price: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Məhsulun adı:</label>
            <Field id="title" name="title" placeholder="Məhsulun adı" />
          </div>
          <div>
            <label htmlFor="author">Müəllif:</label>
            <Field id="author" name="author" placeholder="Müəllif" />
          </div>
          <div>
            <label htmlFor="price">Qiymət:</label>
            <Field id="price" name="price" placeholder="Qiymət" type="number" />
          </div>
          <button type="submit">Əlavə et</button>
        </Form>
      </Formik>

   
      <h2>Məhsullar</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong> - {product.author} - {product.price} AZN
            <button onClick={() => handleDelete(product.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
