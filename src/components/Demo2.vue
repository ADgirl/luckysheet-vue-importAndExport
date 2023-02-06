<template>
  <div id="app">
    <div class="header">
      <el-button type="primary" @click="startCalcHandler()">分析</el-button>
      <el-button round type="primary" @click="save()">保存</el-button>
      <el-button v-show="false" circle @click="drawer = true">
        <svg-icon icon-class="list" />
      </el-button>
      <el-drawer title="附加信息" :visible.sync="drawer">
        <el-table
          :data="headerConfig"
          border
          style="width: 95%; margin-left: 20px"
        >
          <!-- 第一列 -->
          <el-table-column property="infName" label="附加信息名称">
            <template slot-scope="scope">
              <!-- oninput="value=value.replace(/[^\d]/g,'')" -->
              <el-input
                v-if="scope.row.flag"
                v-model="scope.row.infName"
                size="mini"
                placeholder="请输入"
              />
              <a v-else>{{ scope.row.infName }}</a>
            </template>
          </el-table-column>
          <!-- 第二列 -->
          <el-table-column property="types" label="类型">
            <template slot-scope="scope">
              <el-select
                v-if="scope.row.flag"
                v-model="scope.row.types"
                clearable
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in options111"
                  :key="item.value"
                  :value="item.label"
                  :label="item.label"
                />
              </el-select>
              <a v-else>{{ scope.row.types }}</a>
            </template>
          </el-table-column>
          <!-- 第三列 -->
          <el-table-column property="content" label="枚举内容(以逗号分隔)">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.flag"
                v-model="scope.row.content"
                size="mini"
                placeholder="请输入"
              />
              <a v-else>{{ scope.row.content }}</a>
            </template>
          </el-table-column>
          <!-- 第四列 -->
          <el-table-column property="edit" label="操作">
            <template v-slot="{ row }">
              <el-button
                v-if="row.flag === true"
                type="text"
                size="small"
                class="editBtn"
                @click="saveHandle(row)"
              >
                保存
              </el-button>
              <el-button
                v-if="row.flag === false"
                type="text"
                size="small"
                class="editBtn"
                @click="editHandle(row)"
              >
                编辑
              </el-button>
              <el-popconfirm title="确认删除？" @onConfirm="delHandle(row)">
                <el-button type="text" size="small">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          icon="el-icon-plus"
          style="width: 95%; margin: 20px"
          @click="addDrawerRow"
          >增加附加信息
        </el-button>
        <span class="drawer-footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="drawer = false">确 定</el-button>
        </span>
      </el-drawer>
    </div>
    <div
      id="inputsheet"
      style="
        margin: 0px;
        padding: 10px;
        position: relative;
        width: 100%;
        height: 100%;
      "
    />
  </div>
</template>

<script>
// import api from "@/api/dataInput";
import xhr from "../api/axiosConfig-excel";

export default {
  data() {
    return {
      studyType: 5,
      column: 0,
      drawer: false,
      // 抽屉了表格的类型的 数据对象
      options111: [
        {
          value: "选项1",
          label: "文本",
        },
        {
          value: "选项2",
          label: "数值型",
        },
        {
          value: "选项3",
          label: "下拉选择型",
        },
      ],
      // 控制input/select框与 普通文本谁显示
      // flag: false,
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
      // 抽屉的状态
      table: false,
      options: {
        container: "inputsheet", // luckysheet为容器id
        title: "附加信息", // 设定表格名称
        lang: "zh", // 设定表格语言
        showtoolbar: false, // 隐藏工具栏
        showinfobar: false, // 隐藏顶部信息栏
        sheetFormulaBar: false, // 是否显示公示栏
        defaultFontSize: 10, // 默认字体大小
        showsheetbar: false,
        data: [
          {
            name: "sheet1", // 工作表名称
            color: "red", // 工作表名称颜色
            index: 9, // 工作表索引
            status: 1, // 激活状态
            order: 0, // 工作表的下标
            hide: 1, // 是否隐藏
            column: 0, // 列数
            defaultRowHeight: 39, // 自定义行高
            defaultColWidth: 140, // 自定义列宽
            allowEdit: true, // 是否允许前端编辑
            celldata: [
              // 初始化使用的单元格数据
            ],

            config: {
              merge: {}, // 合并单元格(没有反应)
              columnlen: {}, // 表格列宽
              rowhidden: {}, // 隐藏行
              colhidden: {
                14: 0,
                0: 0,
              }, // 隐藏列
              authority: {
                // 当前工作表的权限配置
                sheet: 1, // 如果为1或true，则该工作表受到保护；如果为0或false，则该工作表不受保护。
                hintText: "这部分不可以进行修改", // 弹窗提示的文字
                allowRangeList: [
                  {
                    // 区域保护
                    sqref: "$A$2:$N$1000", // 区域范围
                  },
                ],
              },
            },
            scrollLeft: 0, // 左右滚动条位置
            scrollTop: 0, // 上下滚动条位置

            dataVerification: {
              "3_2": {
                type: "dropdown",
                type2: null,
                value1: "1,2,3",
                value2: "",
                checked: false,
                remote: false,
                prohibitInput: false,
                hintShow: false,
                hintText: "",
              },
            }, // 数据验证
          },
        ],
      },
      col: 0,
      input: "",
      items: [
        {
          value: "选项1",
          label: "文本",
        },
        {
          value: "选项2",
          label: "数值型",
        },
        {
          value: "选项3",
          label: "下拉框型",
        },
      ],
      value: "",
      data: "",

      list: [],
      cellrow: 0,
      // loading
      fullscreenLoading: false,
    };
  },
  computed: {
    orgId() {
      // return this.$store.getters.user.organizationId;
      return "1";
    },
    projectId() {
      // return this.$store.getters.user.currentProjectId;
      return "2";
    },
    variableId() {
      // return this.$store.state.plan.thirdMenuItem.id;
      return "3";
    },
  },
  watch: {
    variableId: function() {
      this.init();
      this.getList();
    },
  },
  created() {
    this.init();
    this.getList();
  },
  mounted() {
    // 创建工作表
    window.luckysheet.create(this.options);
    this.data_ver();
  },
  methods: {
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
    startCalcHandler() {
      xhr
        .calc({
          variableId: this.variableId,
          studyType: 2,
        })
        .then((resp) => {
          if (resp.code !== 200) {
            this.$message.error("计算失败");
            return;
          }
          this.$confirm("计算成功,是否查看分析结果?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.$store.commit("plan/isJump_OBJ", 1);
            this.$router.push({
              path: `/processAnalysis/index/${this.variableId}/${this.studyType}`,
            });
          });
        });
    },
    init() {
      // 表头数据
      this.headerConfig.forEach((x) => {
        this.options.data[0].celldata.push({
          r: 0,
          c: x.order - 1,
          v: {
            ct: { fa: "General", t: "g" },
            m: "value1",
            v: x.infName,
          },
        });
        this.column++;
      });
    },
    changeCol(row) {
      window.luckysheet.setCellValue(0, row.order - 1, row.infName);
      this.setColType(row);
    },
    addCol(row) {
      // 新增一列
      window.luckysheet.insertColumn(row.order - 1, { number: 1 });
      this.column++;
      // 加上表头
      window.luckysheet.setCellValue(0, row.order - 1, row.infName);
      this.setColType(row);
    },
    setColType(row) {
      if (row.types === "下拉选择型") {
        window.luckysheet.setDataVerification(
          {
            type: "dropdown",
            type2: null,
            value1: row.content,
            value2: "",
            checked: false,
            remote: false,
            prohibitInput: false,
            hintShow: false,
            hintText: "",
          },
          {
            column: [0, 1],
          }
        );
      } else if (row.types === "数值型") {
        window.luckysheet.setDataVerification({
          type: "number",
          type2: "gte",
          value1: "1",
          value2: "",
          checked: false,
          remote: false,
          prohibitInput: true,
          hintShow: false,
          hintText: "",
        });
      } else {
        window.luckysheet.setDataVerification({
          type: "text_content",
          type2: "include",
          value1: "Luckysheet",
          value2: "",
          checked: false,
          remote: false,
          prohibitInput: false,
          hintShow: true,
          hintText: "include Luckysheet",
        });
      }
    },
    resetOrder(order) {
      this.headerConfig
        .filter((x) => x.order > order)
        .forEach((x) => {
          x.order--;
        });
      // TODO 同步grid信息到数据库
    },
    delRow(row) {
      const index = row.order - 1;
      this.headerConfig.splice(index, 1);
      window.luckysheet.deleteColumn(index, index);
      window.luckysheet.hideColumn(this.column - 1, 999);
      this.column--;
      this.resetOrder(row.order);
    },
    addDrawerRow() {
      const tempRow = {
        order: this.headerConfig.length + 1,
        flag: true,
        infName: "",
        types: "",
        content: "",
        edit: "save",
      };
      this.headerConfig.push(tempRow);
    },
    editHandle(row) {
      const index = row.order - 1;
      this.headerConfig[index].flag = !this.headerConfig[index].flag;
      this.headerConfig[index].edit = "save";
    },
    saveHandle(row) {
      const index = row.order - 1;
      this.headerConfig[index].flag = !this.headerConfig[index].flag;
      this.headerConfig[index].edit = "edit";
      // TODO 更新数据库中的列信息
      this.submitRowData(row);
    },
    submitRowData(row) {
      const index = row.order - 1;
      if (this.column < row.order) {
        this.addCol(row);
      } else {
        this.changeCol(row);
      }
      this.headerConfig[index].infName = row.infName;
      this.headerConfig[index].types = row.types;
      this.headerConfig[index].content = row.content;
    },
    delHandle(row) {
      // TODO 删除数据库中的列信息
      this.delRow(row);
    },
    // 获取初始过程研究数据
    async getList() {
      if (this.variableId === null || this.variableId === "") {
        return;
      }
      const { code, data } = await xhr.showData(this.variableId);
      if (code !== 200) {
        this.$message.error("获取数据失败!");
        return;
      }

      this.list = data;
      window.luckysheet.destroy();
      var i = 1;
      this.list.forEach((x) => {
        const data = x;
        this.options.data[0].data[i] = new Array(15);
        this.options.data[0].data[i] = [];
        this.options.data[0].data[i][0] = {
          v: data.idx,
        };
        this.options.data[0].data[i][1] = {
          v: data.value,
        };
        this.options.data[0].data[i][2] = {
          v: data.inputDate,
        };
        this.options.data[0].data[i][3] = {
          v: data.inputTime,
        };
        this.options.data[0].data[i][4] = {
          v: data.machineNumber,
        };
        this.options.data[0].data[i][5] = {
          v: data.cavityNumber,
        };
        this.options.data[0].data[i][6] = {
          v: data.stage,
        };
        this.options.data[0].data[i][7] = {
          v: data.gaugeNumber,
        };
        this.options.data[0].data[i][8] = {
          v: data.inspector,
        };
        this.options.data[0].data[i][9] = {
          v: data.componentNumber,
        };
        this.options.data[0].data[i][10] = {
          v: data.orderNumber,
        };
        this.options.data[0].data[i][11] = {
          v: data.batchNumber,
        };
        this.options.data[0].data[i][12] = {
          v: data.event,
        };
        this.options.data[0].data[i][13] = {
          v: data.processParameter,
        };
        this.options.data[0].data[i][14] = {
          v: data.id,
        };

        i++;
      });
      if (this.list.length < 84) {
        this.options.data[0].data.splice(84);
      } else if (this.options.data[0].data.length - this.list.length > 3) {
        this.options.data[0].data.splice(this.list.length + 1);
      }

      for (var j = i; j < this.options.data[0].data.length; j++) {
        this.options.data[0].data[j] = [];
      }
      window.luckysheet.create(this.options);
    },
    // 数据保存
    async save() {
      const loading = this.$loading({
        lock: true,
        text: "保存中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      var celldata = window.luckysheet.transToCellData(
        window.luckysheet.getLuckysheetfile()[0].data
      );
      let count = 1;
      let idxIncrease = 1;
      const list = [];
      while (count <= celldata[celldata.length - 1].r) {
        const data = {};
        const res = celldata.filter((x) => x.r === count);
        if (res) {
          data["idx"] = idxIncrease;
          res.forEach((x) => {
            switch (x.c) {
              case 1:
                data["value"] = x.v.v;
                return;
              case 2:
                data["inputDate"] = x.v.v;
                return;
              case 3:
                data["inputTime"] = x.v.v;
                return;
              case 4:
                data["machineNumber"] = x.v.v;
                return;
              case 5:
                data["cavityNumber"] = x.v.v;
                return;
              case 6:
                data["stage"] = x.v.v;
                return;
              case 7:
                data["gaugeNumber"] = x.v.v;
                return;
              case 8:
                data["inspector"] = x.v.v;
                return;
              case 9:
                data["componentNumber"] = x.v.v;
                return;
              case 10:
                data["orderNumber"] = x.v.v;
                return;
              case 11:
                data["batchNumber"] = x.v.v;
                return;
              case 12:
                data["event"] = x.v.v;
                return;
              case 13:
                data["processParameter"] = x.v.v;
                return;
              case 14:
                if (x.v.v && x.v.v !== "" && x.v.v !== null) {
                  data.id = x.v.v;
                }
                return;
              default:
                return;
            }
          });
          list.push(data);
        } else {
          continue;
        }
        count++;
        idxIncrease++;
      }

      const subList = [];
      list.forEach((item, index) => {
        subList.push({
          idx: item.idx,
          value: item.value,
          inputDate: item.inputDate,
          inputTime: item.inputTime,
          machineNumber: item.machineNumber,
          cavityNumber: item.cavityNumber,
          stage: item.stage,
          gaugeNumber: item.gaugeNumber,
          inspector: item.inspector,
          componentNumber: item.componentNumber,
          orderNumber: item.orderNumber,
          batchNumber: item.batchNumber,
          event: item.event,
          processParameter: item.processParameter,
        });
      });
      let flag = 0;
      subList.forEach((x) => {
        if (x.value === undefined) {
          flag = 1;
        }
      });

      if (flag === 1) {
        this.$message.info("值为必填项，请检查表格数据");
        loading.close();
        return;
      }
      const addResp = await xhr.new_add(
        this.projectId,
        this.variableId,
        subList
      );
      if (addResp.code !== 200) {
        this.$message.error("保存失败");
        loading.close();
        return;
      }
      this.$message.success("保存成功");
      this.getList();
      loading.close();
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
}

::v-deep .btn123 {
  border-radius: 10px;
  border-style: dashed;
  width: 100%;
  margin-top: 15px;
}

.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background-color: white;
}
</style>
