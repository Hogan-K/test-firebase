<template>
  <div>
    <h1>
      Where do you want to go ?
    </h1>
    <div>
      <router-link to="/class">
        <button style="border: 3px solid saddlebrown; border-radius: 10px; margin: 0 20px; padding: 10px; background: saddlebrown; color: white; font-size: 18px;">
          Go to Class
        </button>
      </router-link>

      <router-link to="/firestore">
        <button style="border: 3px solid saddlebrown; border-radius: 10px; margin: 0 20px; padding: 10px; background: saddlebrown; color: white; font-size: 18px;">
          Go to Firestore
        </button>
      </router-link>

      <router-link to="/storage">
        <button style="border: 3px solid saddlebrown; border-radius: 10px; margin: 0 20px; padding: 10px; background: saddlebrown; color: white; font-size: 18px;">
          Go to Storage
        </button>
      </router-link>

      <router-link to="/authentication">
        <button style="border: 3px solid saddlebrown; border-radius: 10px; margin: 0 20px; padding: 10px; background: saddlebrown; color: white; font-size: 18px;">
          Go to Authentication
        </button>
      </router-link>
    </div>
  </div>
</template>
