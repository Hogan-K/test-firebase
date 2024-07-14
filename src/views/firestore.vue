<template>
  <div>
    <h1>
      Firestore
    </h1>
    <div>
      <button @click="addTable()">Add Table or Row</button>
      <br><br>
      <button @click="getTable()">Get Table</button>
      <br><br>
      <button @click="getRow()">Get Row</button>
      <br><br>
      <button @click="editRow()">Edit Row</button>
      <br><br>
      <button @click="deleteRow()">Delete Row</button>
    </div>
  </div>
</template>

<script setup>
// collection  Table
// getDocs     Read a Table
// getDoc      Read a Row
// addDoc      Create *不可客製化 id*
// updateDoc   Edit
// deleteDoc   Delete
// setDoc      Create、Edit(覆蓋整包舊資料) *可客製化 id*
// doc         獲取指定文檔
// arrayUnion  增加陣列欄位內容
// arrayRemove 移除陣列欄位內容
import {collection, getDocs, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import {db} from '/firebase.js'

const addTable = async () => {
  try {
    // const user = getAuth().currentUser
    const result = await addDoc(collection(db, "products"), {
      type: "test"
    });

    console.log('result :', result)
  } catch (error) {
    console.log('error :', error)
  }
}

// 取得整個 Table 資料
const getTable = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    querySnapshot.forEach((item) => {
      console.log(item._document.data.value.mapValue.fields);
      console.log('id :', item.id)
    });
  } catch (error) {
    console.log('error :', error)
  }
}

// 取得該 Table 的單一資料
const getRow = async () => {
  try {
    const docRef = doc(db, "favorites", "10zxQqf47ATUw2CHS5mY5G6hb8U2")
    const result = await getDoc(docRef)
    console.log('result :', result.data())
  } catch (error) {
    console.log('error :', error)
  }
}

// 編輯資料
const editRow = async () => {
  try {
    const docRef = doc(db, "favorites", "10zxQqf47ATUw2CHS5mY5G6hb8U2")
    await updateDoc(docRef, {
      // add products
      // products: arrayUnion({
      //   name: '鞋子',
      //   price: 3500,
      //   quantity: 1,
      //   description: '一雙鞋'
      // })

      // delete products
      products: arrayRemove({
        name: '鞋子',
        price: 3500,
        quantity: 1,
        description: '一雙鞋'
      })
    })
        .then(() => {
          console.log('Update success')
        })
        .catch((error) => {
          console.log('Update failed :', error)
        })
  } catch (error) {
    console.log('error :', error)
  }
}

// 刪除資料 Row
const deleteRow = async () => {
  try {
    const docRef = doc(db, "favorites", "10zxQqf47ATUw2CHS5mY5G6hb8U2")
    const result = await deleteDoc(docRef);
    console.log('result :', result)
  } catch (error) {
    console.log('error :', error)
  }
}
</script>
