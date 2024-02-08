import { addProduct } from '@/app/utils/action'
import styles from '@app/ui/dashboard/products/addProduct/addProduct.module.css'

const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" placeholder='title' name='title' required />
        <select name="cat" id="cat">
        <option value="general">Choose a category</option>
          <option value="kitchen">Kitchen</option>
          <option value="kitchen">Phone</option>
          <option value="kitchen">Computer</option>
        </select>
        <input type="number" placeholder='Price' name='price' />
        <input type="number" placeholder='Stock' name='stock' />
        <input type="text" placeholder='Color' name='color' />
        <input type="number" placeholder='Size' name='size' />
        <textarea name="desc" 
                    id="desc" 
                    cols="30" 
                    rows="10" 
                    placeholder='description'></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddProductPage