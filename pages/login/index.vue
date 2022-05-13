<template>
  <div class="login">
    <form class="login__form" @submit.prevent="login">
      <div class="form__home-link">
        <img width="40px" height="40px" src="/quwi-logo.png" alt="logo" />
        <div>QUWI</div>
      </div>
      <div class="form__control">
        <div v-if="email">Email</div>
        <input v-model="email" type="email" placeholder="Email" />
      </div>
      <div class="form__control">
        <div v-if="password">Password</div>
        <input v-model="password" type="password" placeholder="Password" />
      </div>
      <div class="form__auth">
        <button type="submit">Login</button>
        <span>Forgot password?</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const { email, password } = this
      const loginData = { email, password }
      try {
        await this.$auth.loginWith('local', {
          data: loginData,
        })
        this.$router.push('/projects')
      } catch (e) {
        this.$store.dispatch('alerts/addAlert', {
          text: e.response.data.first_errors.email,
          type: 'error',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  background-image: url('/gray_blur.png');
}
.login {
  margin: auto;
  &__form {
    width: 440px;
    text-align: center;
    margin: auto;
    padding: 25px 40px 35px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.11);
    box-shadow: 0 0 12px rgb(0 0 0 / 25%);
    border-radius: 15px;
  }
  .form {
    &__home-link {
      margin-bottom: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-right: 14px;
      }
      div {
        font-family: Arial, sans-serif;
        font-weight: 700;
        font-size: 24px;
        text-transform: uppercase;
      }
    }
    &__control {
      position: relative;
      &:not(:last-child) {
        margin-bottom: 12px;
      }
      // &:not(:first-child) {
      //   margin-bottom: 29px;
      // }
      div {
        margin: 0 10px;
        max-width: calc(100% - 20px);
        position: absolute;
        top: -0.55em;
        background: #fff;
        display: block;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #999;
      }
      input {
        width: 100%;
        border: 1px solid #dadada;
        border-radius: 5px;
        padding: 15px;
      }
    }
    &__auth {
      display: flex;
      flex-direction: column;
      button {
        background: #2668c1;
        height: 52px;
        text-transform: none;
        text-shadow: none;
        font-size: 18px;
        border-radius: 9px;
        font-weight: 400;
        margin-top: 17px;
        color: #fff;
        margin-bottom: 20px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
      span {
        color: #2975dc;
        font-size: 14px;
      }
    }
  }
}
</style>
