<template>
  <div class="app">
    <div class="header">
      <ul>
        <li>1-test</li>
        <li>2-test</li>
        <li>3-test</li>
      </ul>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="beforeUpload"
        :on-change="handleUploadChange"
        :file-list="fileList"
        accept=".xlsx"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传xlsx文件，且不超过500kb
        </div>
      </el-upload>
      <el-button type="primary" size="small" @click="startCalcHandler()"
        >分析</el-button
      >
      <el-button round type="primary" size="small" @click="save()"
        >保存</el-button
      >
    </div>
    <div
      id="inputsheet"
      style="margin:0px;padding:0px;position:absolute;width:100%;left: 0px;top: 80px;bottom:0px;"
    />
  </div>
</template>

<script>
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import LuckyExcel from "luckyexcel";
import xhr from "../api/axiosConfig-excel";
import { exportExcel } from "./export";
import moduleJson from "./all.json";

export default {
  data() {
    return {
      studyType: 5,
      column: 0,
      fileList: [],
      // 抽屉里表格的 数据对象
      headerConfig: [
        {
          id: 0,
          order: 1,
          flag: false,
          infName: "行号",
          types: "下拉选择型",
          content: "1,2,3",
          edit: "edit",
        },
        {
          id: 1,
          order: 2,
          flag: false,
          infName: "值",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 2,
          order: 3,
          flag: false,
          infName: "日期",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 3,
          order: 4,
          flag: false,
          infName: "时间",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 4,
          order: 5,
          flag: false,
          infName: "机器编号",
          ct: {
            fa: "General",
            t: "g",
          },
          content: "",
          edit: "edit",
        },
        {
          id: 5,
          order: 6,
          flag: false,
          infName: "模穴编号",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 6,
          order: 7,
          flag: false,
          infName: "阶段",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 7,
          order: 8,
          flag: false,
          infName: "检具编号",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 8,
          order: 9,
          flag: false,
          infName: "检验员",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 9,
          order: 10,
          flag: false,
          infName: "零件编号",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 10,
          order: 11,
          flag: false,
          infName: "订单编号",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 11,
          order: 12,
          flag: false,
          infName: "材料批次编号",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 12,
          order: 13,
          flag: false,
          infName: "事件",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 13,
          order: 14,
          flag: false,
          infName: "过程参数",
          types: "文本",
          content: "",
          edit: "edit",
        },
        {
          id: 14,
          order: 15,
          flag: false,
          infName: "id",
          types: "文本",
          content: "",
          edit: "edit",
        },
      ],
      options: {
        container: "inputsheet", // luckysheet为容器id
        title: "xxx统计模板", // 设定表格名称
        lang: "zh", // 设定表格语言
        forceCalculation: true,
        hook: {
          sheetMousemove: function sheetMousemove(cell, position) {
            if (window.isDrag) {
              const r = position.r;
              const c = position.c;
              window.luckysheet.setluckysheet_select_save([
                {
                  row: [r, r],
                  column: [c, c],
                },
              ]);
              window.luckysheet.selectHightlightShow();
            }
          },
          setCellValue: () => {},
        },
      },
    };
  },
  created() {},
  mounted() {
    // 创建工作表
    window.luckysheet.create(this.options);
    // this.loadExcelModule();
    this.initDragAndDrop();
  },
  methods: {
    initDragAndDrop() {
      let that = this;
      $("li").draggable({
        appendTo: "body",
        cursorAt: { top: 15, left: 20 },
        zIndex: 99999,
        helper: function(e) {
          window.dragData = $(e.target).text();
          return $(`<div>${window.dragData}</div>`);
        },
        start: () => {
          window.isDrag = true;
        },
        // container: this.$container,
        drag: (event, ui) => {
          this.target = event.originalEvent.target;
        },
        stop: (event, ui) => {
          window.isDrag = false;
        },
      });
      $("#inputsheet").droppable({
        drop: async function(e, ui) {
          that.drop(e, ui);
        },
      });
    },
    drop(e, ui) {
      let data = ui.draggable.text();
      let selectCells = window.luckysheet.getluckysheet_select_save();
      let r = selectCells[0].row_focus;
      let c = selectCells[0].column_focus;
      window.luckysheet.setCellValue(r, c, data);
    },
    // 加载已保存的模板数据
    loadExcelModule() {
      window.luckysheet.destroy();
      this.excelModuleJson = moduleJson;
      window.luckysheet.create(moduleJson);
    },
    beforeUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file);
      // return;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleUploadChange(file, fileList) {
      this.fileList = fileList;
      console.log(file);
      LuckyExcel.transformExcelToLucky(file.raw, function(
        exportJson,
        luckysheetfile
      ) {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert(
            "Failed to read the content of the excel file, currently does not support xls files!"
          );
          return;
        }
        window.luckysheet.destroy();
        console.log(exportJson);
        window.luckysheet.create({
          container: "inputsheet", //luckysheet is the container id
          data: exportJson.sheets,
          lang: "zh", // 设定表格语言
          title: exportJson.info.name,
          userInfo: exportJson.info.creator,
        });
      });
    },
    data_ver() {
      window.luckysheet.setDataVerification(
        {
          type: "number_integer",
          type2: "gte",
          value1: "1",
          value2: "",
          checked: false,
          remote: false,
          prohibitInput: true,
          hintShow: true,
          hintText: "请输入整数哦",
        },
        {
          range: { row: [1, 100], column: [0, 0] },
        }
      );
      window.luckysheet.setDataVerification(
        {
          type: "number_decimal",
          type2: "gte",
          value1: "0.0",
          value2: "",
          checked: false,
          remote: false,
          prohibitInput: true,
          hintShow: true,
          hintText: "请输入小数哦",
        },
        {
          range: { row: [1, 1000], column: [1, 1] },
        }
      );
      window.luckysheet.setDataVerification(
        {
          type: "date",
          type2: "bw",
          value1: "2020-09-23",
          value2: "2020-10-10",
          checked: false,
          remote: false,
          prohibitInput: false,
          hintShow: false,
          hintText: "",
        },
        {
          range: { row: [1, 1000], column: [2, 3] },
        }
      );
      window.luckysheet.setDataVerification(
        {
          type: "text_content",
          type2: "include",
          value1: "Luckysheet",
          value2: "",
          checked: false,
          remote: false,
          prohibitInput: false,
          hintShow: true,
          hintText: "请输入文本",
        },
        {
          range: { row: [1, 1000], column: [6, 9, 10, 11, 12, 13] },
        }
      );
      window.luckysheet.setDataVerification(
        {
          type: "dropdown",
          type2: null,
          value1: "高,中,低",
          prohibitInput: true,
        },
        {
          range: { row: [1, 1000], column: [4, 5, 7, 8] },
        }
      );
    },
    // 保存或者下载模板
    async save() {
      let allSheetsData = window.luckysheet.getAllSheets();
      var excel_ = JSON.stringify(allSheetsData);
      console.log(allSheetsData);
      exportExcel(allSheetsData, this.excelModuleJson.title);
      return;
      const loading = this.$loading({
        lock: true,
        text: "保存中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      var celldata = window.luckysheet.transToCellData(
        window.luckysheet.getLuckysheetfile()[0].data
      );
      const addResp = await xhr.request({
        url: "",
        data: {
          projectId: this.projectId,
          variableId: this.variableId,
          subList,
        },
      });
      if (addResp.code !== 200) {
        this.$message.error("保存失败");
        loading.close();
        return;
      }
      this.$message.success("保存成功");
      this.getList();
      loading.close();
    },
    // 获取模板配置数据
    excelModuleTableData() {
      var celldata = window.luckysheet.transToCellData(
        window.luckysheet.getLuckysheetfile()[0].data
      );
      console.log(celldata);
    },
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 50px;
  right: 30px;
}
li {
  cursor: move;
}
</style>
