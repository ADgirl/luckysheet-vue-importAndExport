<template>
  <div class="hello">
    <div style="position: absolute;top:0;">
      <input style="font-size:16px;" type="file" @change="uploadExcel" />

      <span>Or Load remote xlsx file: </span>

      <select v-model="selected" @change="selectExcel">
        <option disabled value="">Choose</option>
        <option
          v-for="option in options"
          :key="option.text"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>

      <a href="javascript:void(0)" @click="downloadExcel"
        >Download source xlsx file</a
      >
    </div>

    <div
      id="luckysheet"
      style="margin:0px;padding:0px;position:absolute;width:100%;left: 0px;top: 30px;bottom:0px;"
    ></div>

    <div
      v-show="isMaskShow"
      style="position: absolute;z-index: 1000000;left: 0px;top: 0px;bottom: 0px;right: 0px; background: rgba(255, 255, 255, 0.8); text-align: center;font-size: 40px;align-items:center;justify-content: center;display:flex;"
    >
      Downloading
    </div>
  </div>
</template>

<script>
import LuckyExcel from "luckyexcel";
//导入库export.js 这个文件是es6的，不能在普通的HTML文件直接引入js文件（虽然都是js文件，但是有区别，具体请百度es6与es5）！需要把es6转es5才可以直接引入使用！
import { testaaa, exportExcel } from "./export";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      selected: "",
      options: [
        {
          text: "Money Manager.xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/money-manager-2.xlsx",
        },
        {
          text: "Activity costs tracker.xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/Activity%20costs%20tracker.xlsx",
        },
        {
          text: "House cleaning checklist.xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/House%20cleaning%20checklist.xlsx",
        },
        {
          text: "Student assignment planner.xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/Student%20assignment%20planner.xlsx",
        },
        {
          text: "Credit card tracker.xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/Credit%20card%20tracker.xlsx",
        },
        {
          text: "Blue timesheet.xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/Blue%20timesheet.xlsx",
        },
        {
          text: "Student calendar (Mon).xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/Student%20calendar%20%28Mon%29.xlsx",
        },
        {
          text: "Blue mileage and expense report.xlsx",
          value:
            "https://minio.cnbabylon.com/public/luckysheet/Blue%20mileage%20and%20expense%20report.xlsx",
        },
      ],
      isMaskShow: false,
    };
  },
  mounted() {
    // In some cases, you need to use $nextTick
    // this.$nextTick(() => {
    // $(function() {
    window.luckysheet.create({
      container: "luckysheet",
    });
    // });

    // });
  },
  methods: {
    uploadExcel(evt) {
      const files = evt.target.files;
      if (files == null || files.length == 0) {
        alert("No files wait for import");
        return;
      }

      let name = files[0].name;
      let suffixArr = name.split("."),
        suffix = suffixArr[suffixArr.length - 1];
      if (suffix != "xlsx") {
        alert("Currently only supports the import of xlsx files");
        return;
      }
      LuckyExcel.transformExcelToLucky(files[0], function(
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

        window.luckysheet.create({
          container: "luckysheet", //luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          lang: "zh", // 设定表格语言
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
        });
      });
    },
    selectExcel(evt) {
      const value = this.selected;
      const name = evt.target.options[evt.target.selectedIndex].innerText;

      if (value == "") {
        return;
      }
      this.isMaskShow = true;

      LuckyExcel.transformExcelToLuckyByUrl(
        value,
        name,
        (exportJson, luckysheetfile) => {
          if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            alert(
              "Failed to read the content of the excel file, currently does not support xls files!"
            );
            return;
          }

          this.isMaskShow = false;
          window.luckysheet.destroy();

          window.luckysheet.create({
            container: "luckysheet", //luckysheet is the container id
            showinfobar: false,
            data: exportJson.sheets,
            lang: "zh", // 设定表格语言
            title: exportJson.info.name,
            userInfo: exportJson.info.name.creator,
          });
        }
      );
    },
    downloadExcel() {
      // const value = this.selected;;
      //
      // if(value.length==0){
      //     alert("Please select a demo file");
      //     return;
      // }
      //
      // var elemIF = document.getElementById("Lucky-download-frame");
      // if(elemIF==null){
      //     elemIF = document.createElement("iframe");
      //     elemIF.style.display = "none";
      //     elemIF.id = "Lucky-download-frame";
      //     document.body.appendChild(elemIF);
      // }
      // elemIF.src = value;
      console.log(window.luckysheet.getAllSheets());
      exportExcel(window.luckysheet.getAllSheets(), "下载");
      // testaaa();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
