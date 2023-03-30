import { db } from "../config";
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
    getDoc,
    setDoc,
    doc,
    onSnapshot,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

export const updateProduct = async (productId, data) =>{
    try {
        console.log("a")
        await updateDoc(doc(db, "products", productId), data)
    }catch(error){
        console.log("Error updating product", error);
    }
}

export const addProduct = async ({name, cost, color, image}) => {
    try {
        return await addDoc(collection(db, "products"), {
            name: name,
            cost: cost,
            color: color,
            image: image,
        });
    } catch (error) {
        console.log("Error creating product ", error);
    }
}

export const getAllProducts = async () => {
    const productQuery = query(
        collection(db, "products")
      );
      const results = await getDocs(productQuery);
    
      if (results.size > 0) {
        const products = results.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
    
        return products;
      }
    
      return null;
}

export const getProductById = async (productId) => {
    const productRef = doc(db, "products", productId);
    return getDoc(productRef);
}

export const addSize = async ({size, quantity, productId}) => {
    try {
        await addDoc(collection(db, "products", productId, "sizes"), {
            size: size,
            quantity: quantity,
        });
    } catch (error) {
        console.log("Error creating size ", error);
    }
}

export const getSizes = async (productId) => {
    const productRef = collection(db, "products", productId, "sizes");
    const qSnap = await getDocs(productRef);
    const sizesList = qSnap.docs.map((d) => ({id: d.id, ...d.data()}))
    return sizesList;
}

export const deleteProduct = async (productId) => {
    try {
        const sizes = await getSizes(productId)
        sizes.map((elem) => {
            deleteDoc(doc(db, "products", productId, "sizes", elem.id))
        })
        await deleteDoc(doc(db, "products", productId));

    } catch (error) {
        console.log("Error al borrar", error)
    }
}