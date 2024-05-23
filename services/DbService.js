import { collection, addDoc, getDocs, query, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { where } from "firebase/firestore";

// Create new list item function
export const createNewBucketItem = async (item) => {
    try {
        const docRef = await addDoc(collection(db, "items"), item);
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}

// Get all list items function
export const getMyBucketList = async () => {
    var allItems = [];
    var q = query(collection(db, "items"), orderBy('priority', "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        allItems.push({ ...doc.data(), id: doc.id });
    });
    return allItems;
}

// Update item status function
export const markItemCompleted = async (itemId) => {
    try {
        const itemRef = doc(db, "items", itemId);
        await updateDoc(itemRef, {
            completed: true
        });
        return true;
    } catch (e) {
        console.error("Error updating document: ", e);
        return false;
    }
}

// Delete item function
export const deleteItem = async (itemId) => {
    try {
        const itemRef = doc(db, "items", itemId);
        await deleteDoc(itemRef);
        return true;
    } catch (e) {
        console.error("Error deleting document: ", e);
        return false;
    }
}
