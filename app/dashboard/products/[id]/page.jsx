import { updateProduct } from "@/app/utils/action";
import { fetchProduct } from "@/app/utils/data";
import styles from "@app/ui/dashboard/products/singleProduct/singleProduct.module.css"
import Image from "next/image"
const SingProductPage = async ({params}) => {

    const{ id } = params;

    const product = await fetchProduct(id)

    console.log(product)

  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
                <Image src={product.img || "/noavatar.png"} alt="" fill />
            </div>
            Iphone
        </div>
        <div className={styles.formContainer}>
            <form action={updateProduct} className={styles.form}>
                <input type="hidden" name={id} value={product.id} />
                <label>Title</label>
                <input type="text" name="title" placeholder={product.title} />
                <label>Price</label>
                <input type="number" name="price" placeholder={product.price} />
                <label>Stock</label>
                <input type="number" name="stock" placeholder={product.stock} />
                <label>Color</label>
                <input type="text" name="color" placeholder={product.color} />
                <label>Size</label>
                <input type="text" name="size" placeholder={product.size} />
                <label>Cat</label>
                <select name="cat" id="cat">
                    <option value="general">Choose a category</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="kitchen">Phone</option>
                    <option value="kitchen">Computer</option>
                </select>
                <label>Description</label>
                <textarea name="desc" 
                            id="desc" 
                            cols="30" 
                            rows="10" 
                            placeholder={product.desc}>{product.desc}</textarea>
                <button>Update</button>
            </form>

        </div>  
    </div>
  )
}

export default SingProductPage