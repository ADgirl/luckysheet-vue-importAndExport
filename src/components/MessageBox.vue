<template>
  <div
    :id="id"
    class="my-message-wrapper"
    :class="{
      shade: type === 'error' || type === 'confirm' || type === 'warning',
    }"
    v-if="show"
  >
    <div class="my-message-box">
      <div class="my-message-title">
        系统提示<i class="my-icon my-icon-close fr" @click="cancelCallback"></i>
      </div>
      <div class="my-message-body">
        <div class="message-content">
          <i
            class="my-icon my-icon-success success"
            v-if="type === 'success'"
          ></i>
          <i class="my-icon my-icon-error error" v-if="type === 'error'"></i>
          <i
            class="my-icon my-icon-warning warning"
            v-if="type === 'warning'"
          ></i>
          <div class="message-type" v-if="type === 'success'">
            {{ title ? title : "操作成功" }}
          </div>
          <div class="message-type" v-if="type === 'error'">
            {{ title ? title : "出错了" }}
          </div>
          <div class="message-type" v-if="type === 'info'">
            {{ title ? title : "提示" }}
          </div>
          <div class="message-type" v-if="type === 'confirm'">
            {{ title ? title : "确认" }}
          </div>
          <div class="message-type" v-if="type === 'warning'">
            {{ title ? title : "警告" }}
          </div>
          <p class="tips">{{ msg }}</p>
        </div>
      </div>
      <div class="my-message-footer">
        <el-button
          class="btn cancel"
          v-if="showCancelBtn"
          @click="cancelCallback"
          >{{ cancelBtnText }}</el-button
        >
        <el-button
          class="btn ok"
          v-if="showConfirmBtn"
          @click="successCallback"
          >{{ confirmBtnText }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //消息提示框
  name: "MessageBox",
  data() {
    return {
      title: "系统提示",
      msg: "",
      //success,error,confirm,info,warning
      type: "info",
      showConfirmBtn: false,
      showCancelBtn: false,
      confirmBtnText: "确定",
      cancelBtnText: "取消",
      show: false,
      id: "",
    };
  },
  watch: {
    show(val) {
      let $body = $("body");
      if (val) {
        if (!$body.hasClass("pop-mask")) {
          $body.addClass("pop-mask");
        }
      } else {
        $body.removeClass("pop-mask");
      }
    },
  },
  mounted() {},
  methods: {
    successCallback() {
      this.show = false;
    },
    cancelCallback() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
/* // @import "../assets/css/hn-base/components/message"; */
</style>
