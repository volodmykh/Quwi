<template>
  <div class="modal">
    <div class="modal__container">
      <h3 class="modal__title">Edit name of the project</h3>
      <div class="modal__input">
        <div>
          <input
            type="text"
            :value="value"
            @input="$emit('input', $event.target.value)"
          />
        </div>
      </div>
      <div class="modal__footer">
        <div class="modal__buttons">
          <div
            class="buttons__btn buttons__btn--cancel"
            @click="$emit('close')"
          >
            Cancel
          </div>
          <div
            class="buttons__btn buttons__btn--create"
            @click="$emit('updateProject')"
          >
            Save
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  z-index: 9999;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  touch-action: none;
  &__title {
    margin-top: 0;
    font-weight: normal;
    font-size: 20px;
  }
  &__container {
    width: 500px;
    background-color: #fff;
    justify-content: flex-start;
    flex-direction: column;
    padding: 35px 50px;
  }
  &__input {
    width: 100%;
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    div {
      width: 100%;
      input {
        width: 100%;
        padding: 9px;
        box-shadow: none;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 2px;
      }
    }
  }
  &__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }

  &__buttons {
    display: flex;
    align-items: center;
  }
  .buttons {
    &__btn {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      text-decoration: none;
      height: 34px;
      padding: 0 15px;
      font-size: 11px;
      color: #fff;
      font-family: Arial;
      font-style: normal;
      font-weight: 700;
      line-height: 14px;
      background: #2567c0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      &:not(:last-child) {
        margin-right: 20px;
      }
      &--cancel {
        background-color: #fff;
        color: #555;
        border: 1px solid #bbb;
      }
    }
  }
}
</style>
