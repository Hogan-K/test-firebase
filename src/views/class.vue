<template>
  <div>
    <h1>
      class
    </h1>
    <div>
      <h2>
        My car
      </h2>
    </div>
  </div>
</template>

<script setup>
class carFactory {
  // default
  constructor(height, width) {
    this[Symbol.for('height')] = height
    this[Symbol.for('width')] = width
    this[Symbol.for('name')] = null
  }

  //static 可直接調用，無須先定義實體出來
  static size() {
    return this[Symbol.for('height')] * this[Symbol.for('width')]
  }

  // Method
  setCarName(name) {
    this[Symbol.for('name')] = `我的車叫做${name}`
  }

  // Get
  get nickname() {
    return this[Symbol.for('name')]
  }
}


class paintFactory extends carFactory{
  changeColor(color) {
    return this[Symbol.for('color')] = `${color}漆`
  }

  setCarName(name) {
    super.setCarName(name)
  }

  get nickname() {
    if (super.nickname) {
      return super.nickname
    }

    // default
    const defaultName = this[Symbol.for('color')] + '的車'
    super.setCarName(defaultName)

    return super.nickname
  }
}

const myCar = new paintFactory(20, 10)
// myCar.changeColor('橘色')
// myCar.setCarName()
// console.log(myCar.nickname)
console.log(myCar)
</script>
