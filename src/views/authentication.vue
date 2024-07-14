<template>
  <div>
    <h1>
      Authentication
    </h1>

    <div style="display: flex; justify-content: space-around">
      <div>
        <h1 style="text-align: center">
          {{ mode.toUpperCase() }}
        </h1>

        <label>
          account:
        </label>
        <input v-model="account">

        <br>

        <label>
          password:
        </label>
        <input v-model="password">
        <br>
        <br>
        <button style="display: flex;margin: 0 auto" @click="btnMode === 'signIn' ? signIn() : registerWithEmailAndPassword()">
          {{ mode }}
        </button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="signInWithGoogle()">Google Way 1</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="signInWithRedirectBtn()">Google Way 2</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="getRedirectResultBtn()">Get Redirect Result</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="verifyAuth()">Verify Auth</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="signOut()">Sign Out</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="signInAgain()">Sign In Again</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="updateAuth()">Update Auth</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="updateUserPassword()">Update Password</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="deleteUserAccount()">Delete User Auth</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="verifyEmail()">Verify Email</button>
        <br><br>
        <input v-model="emailAddress" type="text" style="display: flex;margin: 10px auto">
        <button style="display: flex;margin: 0 auto" @click="forgetPassword()">Forget Password</button>
        <br><br>
        <button style="display: flex;margin: 0 auto" @click="resetSignInPersistence()">重設維持登入方法</button>
      </div>
      <div>
        <select v-model="mode" name="select">
          <option value="sign in">sign in</option>
          <option value="register">register</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import '/firebase.js'
import {computed, onMounted, ref, watch} from "vue";

// Auth
// createUserWithEmailAndPassword   create user
// signInWithEmailAndPassword       sign in with email and password
// onAuthStateChanged               watch auth state
// EmailAuthProvider                email provider
// reauthenticateWithCredential     reauthenticate
// updateProfile                    update user info
// updatePassword                   update password
// deleteUser                       delete user *Need to sign in again*
// sendEmailVerification            send email verification
// sendPasswordResetEmail           send email to reset password
// setPersistence                   set persistence
// browserSessionPersistence        continuous sign in way
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updatePassword,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,

} from "firebase/auth";


const mode = ref('sign in')

const btnMode = computed(() => {
  if (mode.value === 'sign in') {
    return 'signIn'
  }

  return 'registerWithEmailAndPassword'
})

const account = ref('')
const password = ref('')

// register

// email
const registerWithEmailAndPassword = async () => {
  try {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, account.value, password.value)
    const user = userCredential.user
    console.log("Registered user:", user)
  } catch (error) {
    console.error("Registration failed:", error)
  }
}

// Google sign in
// way 1
const signInWithGoogle = async () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          const user = result.user
          console.log('Success :', token, user)
        })
        .catch((error) => {
          console.log('error :', error)
        })
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log('Failed :', errorCode, errorMessage, email, credential)
  }
}

// way 2
const signInWithRedirectBtn = () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  } catch (error) {
    console.log('error :', error)
  }
}

// get redirect result
const getRedirectResultBtn = () => {
  try {
    const auth = getAuth()
    getRedirectResult(auth)
        .then((result) => {
          console.log('result :', result)
          // const credential = result.credential
          // const token = credential.accessToken
          // const user = result.user
          // console.log('Success :', user, token)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = error.credential
          console.log('Failed :', errorCode, errorMessage, email, credential)
        })
  } catch (error) {
    console.log('error :', error)
  }
}

// sign in
const signIn = async () => {
  try {
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, account.value, password.value)
    const user = userCredential.user
    console.log("Logged in user:", user)
  } catch (error) {
    console.error("Login failed:", error)
  }
}

// verify auth
const verifyAuth = () => {
  try {
    const auth = getAuth()
    // way 1
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log("Authenticated user:", user)
    //   } else {
    //     console.log("Not authenticated")
    //   }
    // })

    // way 2
    const user = auth.currentUser
    if (user) {
      console.log("Authenticated user:", user)
    } else {
      console.log("Not authenticated")
    }

  } catch (error) {
    console.error("Authentication failed:", error)
  }
}

// sign out
const signOut = async () => {
  try {
    const auth = getAuth()
    auth.signOut()
    console.log("Signed out")
  } catch (error) {
    console.log('error :', error)
  }
}

// sign in again
const signInAgain = async () => {
  try {
    const auth = getAuth()
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, '123456')
    const result = await reauthenticateWithCredential(user, credential)
        .then(() => {
          console.log("Signed in again")
          return true
        })
        .catch((error) => {
          console.log('error :', error)
          return false
        })

    return result
  } catch (error) {
    console.error("Login failed:", error)
  }
}

// update auth
const updateAuth = async () => {
  try {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      updateProfile(user, {
        displayName: 'Hogan'
      })
    } else {
      console.log("Not authenticated")
    }
  } catch (error) {
    console.error("Authentication failed:", error)
  }
}

// update password
const updateUserPassword = async () => {
  try {
    const auth = getAuth()
    const user = auth.currentUser
    const newPassword = '111111'
    if (await signInAgain()) {
      const result = await updatePassword(user, newPassword)
          .then(() => {
            console.log("Password updated successfully")
            return true
          })
          .catch((error) => {
            console.log('Password updated error :', error)
            return false
          })

      if (result) {
        signOut()
      }
    }
  } catch (error) {
    console.error("Update failed:", error)
  }
}

// delete user
const deleteUserAccount = async () => {
  try {
    const auth = getAuth()
    const user = auth.currentUser

    if (await signInAgain()) {
      deleteUser(user)
          .then(() => {
            console.log("User deleted successfully")
          })
          .catch((error) => {
            console.log('error :', error)
          })
    } else {
      console.log("Please sign in again")
    }
  } catch (error) {
    console.error("Delete failed:", error)
  }
}

// verify email
const verifyEmail = async () => {
  try {
    const auth = getAuth()
    const user = auth.currentUser

    sendEmailVerification(user)
        .then(() => {
          alert("Email verification sent")
        })
        .catch((error) => {
          console.log('Email verification sent failed :', error)
        })
  } catch (error) {
    console.error("Email verification sent failed:", error)
  }
}

// forget password
const emailAddress = ref('')

const forgetPassword = async () => {
  try {
    const auth = getAuth()
    sendPasswordResetEmail(auth, emailAddress.value)
        .then(() => {
          alert("Password reset email sent")
        })
        .catch((error) => {
          console.log('Password reset email sent failed :', error)
        })
  } catch (error) {
    console.error("Password reset email sent failed:", error)
  }
}

// reset sign in persistence
const resetSignInPersistence = async () => {
  try {
    const auth = getAuth()
    const result = await setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return true
        })
        .catch((error) => {
          console.log('error :', error)
          return false
        })

    if (result) { signIn() }
  } catch (error) {
    console.error("Reset sign in persistence failed:", error)
  }
}
</script>
