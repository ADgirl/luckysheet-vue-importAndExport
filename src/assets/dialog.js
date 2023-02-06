/**
 * 对话框相关方法
 * @author tangmingfang
 */
import {MsgBox} from "./MessageBox";

export const dialog = {
  /**
   * 错误提示
   * @param msg 提示信息
   * @author 唐明芳
   */
  error: function (msg) {
    MsgBox('出错了', msg, {type: 'error'});
  },
  /**
   *操作成功提示
   * @param msg 提示信息
   * @author 唐明芳
   */
  success: function (msg) {

    MsgBox('操作成功', msg, {type: 'success'});
  },
  /**
   *警告提示
   * @param msg 提示信息
   * @author 唐明芳
   */
  warning: function (msg) {

    MsgBox('警告', msg, {type: 'warning'});
  },
  /**
   *提示
   * @param msg 提示信息
   * @author 唐明芳
   */
  info: function (msg) {

    MsgBox('提示', msg, {type: 'info'});
  },
  /**
   * 确认提示框
   * @param vm vue实例
   * @param msg 提示信息
   * @param confirmCallback 确认回调
   * @param cancelCallback 取消回调
   * @author 唐明芳
   */
  confirm: function (msg, confirmCallback, cancelCallback) {
   return MsgBox('确认', msg, {
      confirmBtnText: '确定',
      cancelBtnText: '取消',
      type: 'confirm',
      showConfirmBtn: true,
      showCancelBtn: true
    }).then(() => {
      if (confirmCallback) {
        confirmCallback();
      }
    }).catch(() => {
      if (cancelCallback) {
        cancelCallback()
      }
    });
  }
};
