<template>
  <div>
    <h1>
      Storage
    </h1>

    <!-- upload file -->
    <div style="display: flex; align-content: center; justify-content: center">
      <input id="upload" style="display: none" type="file" @change="uploadFile">
      <label for="upload" class="btn" style="cursor: pointer">
        上傳檔案
        <span class="inner">
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
        </span>
      </label>
    </div>

    <!-- get file url -->
    <div style="display: flex; align-content: center; justify-content: space-around; margin-top: 50px">
      <div class="btn" style="cursor: pointer; height: 25px" @click="getFileUrl()">
        取得檔案 URL
        <span class="inner">
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
        </span>
      </div>
      <div v-if="imageUrl">
        <img :src="imageUrl">
      </div>
    </div>

    <!-- delete file -->
    <div style="display: flex; align-content: center; justify-content: center; margin-top: 50px">
      <div class="btn" style="cursor: pointer; height: 25px" @click="deleteFile()">
        刪除檔案
        <span class="inner">
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {uploadBytes, ref as storageRef, getDownloadURL, deleteObject} from "firebase/storage"
import {storage} from "/firebase.js"
import { ref } from "vue"

// upload file
const uploadFile = async (e) => {
  const file = e.target.files[0]
  const storageLocation = storageRef(storage, `test/${file.name}`)

  try {
    const snapshot = await uploadBytes(storageLocation, file)
    console.log('Uploaded a blob or file!')
    const imageUrl = await getDownloadURL(snapshot.ref)
    console.log(imageUrl)
  } catch (error) {
    console.log(error)
  }
}

// get file url
const imageUrl = ref('')
const getFileUrl = async () => {
  const storageLocation = storageRef(storage, 'test/測試圖.webp')

  try {
    const result = await getDownloadURL(storageLocation)
    console.log(result)
    imageUrl.value = result
  } catch (error) {
    console.log(error)
  }
}

// delete file
const deleteFile = async () => {
  const storageLocation = storageRef(storage, 'test/123')

  try {
    await deleteObject(storageLocation)
    console.log('刪除成功！')
  } catch (error) {
    console.log(error)
  }
}
</script>

<style>
.btn {
  position: relative;
  z-index: 1;
  min-width: 200px;
  background-color: transparent;
  color: #0fe0f5;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  transition: color 0.5s;
  padding: 12px 20px;
}

.btn:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border: 6px solid #0fe0f5;
  border-radius: 10px;
}

.btn:after {
  content: "";
  position: absolute;
  left: 9px;
  top: 9px;
  width: 100%;
  height: 100%;
  z-index: -2;
  border: 6px solid #222222;
  border-radius: 10px;
  transition: all 0.3s 0.2s;
}

.btn:hover {
  color: #222222;
}

.btn:hover:after {
  transition: all 0.3s;
  left: 0;
  top: 0;
}

.btn .inner {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.btn .inner .blob {
  position: absolute;
  top: 6px;
  width: 25%;
  height: 100%;
  background: #0fe0f5;
  border-radius: 100%;
  transform: translate3d(0, 150%, 0) scale(1.7);
  transition: transform 0.45s;
}

.btn .inner .blob:nth-child(1) {
  left: 0;
  transition-delay: 0s;
}

.btn .inner .blob:nth-child(2) {
  left: 30%;
  transition-delay: 0.08s;
}

.btn .inner .blob:nth-child(3) {
  left: 60%;
  transition-delay: 0.16s;
}

.btn .inner .blob:nth-child(4) {
  left: 90%;
  transition-delay: 0.24s;
}

.btn:hover .inner .blob {
  transform: translateZ(0) scale(1.7);
}
</style>
