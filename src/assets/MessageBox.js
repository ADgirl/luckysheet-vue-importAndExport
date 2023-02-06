import Vue from 'vue';
import MessageBox from '../components/MessageBox'

export function MsgBox (title, msg, options = {}) {
  let msgBoxConstructor = Vue.extend(MessageBox);
  let instance = new msgBoxConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
  options.title = title;
  options.msg = msg;
  // 将单个 msgBox instance 的配置合并到默认值中
  Object.assign(instance.$data, options);
  if (!instance.$data.id) {
    instance.$data.id = new Date().getTime();
  }
  let type = options.type;
  if (type === 'success' || type === 'info') {
    setTimeout(() => {
      instance.show = false;
    }, 2000)
  }

  return new Promise((resolve, reject) => {
    instance.show = true;
    instance.successCallback = () => {
      resolve();
      instance.show = false;
    }
    instance.cancelCallback = () => {
      reject();
      instance.show = false;
    }
  })
}