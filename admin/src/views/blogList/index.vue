<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="标题"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-circle-plus"
        @click="handleCreate"
      >
        添加
      </el-button>
      <!-- TODO: 导出excel -->
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="摘要" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.desc
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name.split(";").join(" | ") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ timestampToTime(row.created_on) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建作者" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.created_by }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showReviewer"
        label="Reviewer"
        width="110px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span style="color: red">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.modified_on == 0
              ? "文章首次发布"
              : timestampToTime(row.modified_on)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改作者" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.modified_by == "noname" ? "文章尚未修改" : row.modified_by
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="primary" size="mini" @click="toContent(row)">
            撰写文章
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left: 20px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="摘要" prop="desc">
          <el-input v-model="temp.desc" placeholder="请输入文章摘要" />
        </el-form-item>
        <el-form-item label="标签" prop="name">
          <el-input
            v-model="temp.name"
            placeholder="请输入文章标签(以英文符号;隔开)"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWork, addWork, updateWork, deleteWork } from "@/api/work";
import { addTag, updateTag } from "@/api/tag";
import { createBucket, changePolice } from "@/api/file";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];
// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});
export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: "+id",
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID 递增", key: "+id" },
        { label: "ID 递减", key: "-id" },
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      teacherOptions: undefined,
      temp: {
        title: "",
        desc: "",
        tag_id: 1,
        name: "",
        content: "",
        created_on: 0,
        created_by: "reoreo",
        modified_on: 0,
        modified_by: "noname",
        delete_on: 0,
        state: 1,
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "名称长度在3到100个字符",
            trigger: "change",
          },
        ],
        desc: [
          { required: true, message: "摘要不能为空", trigger: "blur" },
          {
            min: 20,
            max: 50,
            message: "名称长度在20到50个字符",
            trigger: "change",
          },
        ],
        name: [{ required: true, message: "标签不能为空", trigger: "blur" }],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //将时间戳转换成正常时间格式
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getList() {
      this.listLoading = true;
      getWork(this.listQuery).then((response) => {
        this.list = response.data;
        console.log(response);
        this.total = response.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    // resetTemp() {
    //   this.temp = {
    //     title: "",
    //     desc: "",
    //     tag_id: 1,
    //     name: "",
    //     content: "",
    //     created_by: "reoreo",
    //     modified_on: 0,
    //     modified_by: "noname",
    //     delete_on: 0,
    //     state: 1,
    //   };
    // },
    handleCreate() {
      // this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          addTag({ name: this.temp.name }).then((res) => {
            this.temp.created_on = parseInt(
              Date.now()
                .toString()
                .substring(0, Date.now().toString().length - 3)
            );
            this.temp.tag_id = res.data.id;
            addWork(this.temp).then((res) => {
              this.list.unshift(this.temp);
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000,
              });
              // 创建完后创建图片的存储库
              createBucket({ bucketName: "blog-" + res.data.id }).then(() => {
                changePolice({ bucketName: "blog-" + res.data.id });
              });
              this.temp.title = "";
              this.temp.desc = "";
              this.temp.name = "";
              this.getList()
            });
          });
        }
      });
    },
    handleUpdate(row) {
      // 复制数组，不影响原数组row，如果直接=赋值会导致row的数据改变
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      updateTag({ id: this.temp.tag_id, name: this.temp.name }).then(() => {
        this.$notify({
          title: "成功",
          message: "成功修改标签！",
          type: "success",
          duration: 2000,
        });
      });
      updateWork(this.temp).then(() => {
        this.$notify({
          title: "成功",
          message: "成功修改文章！",
          type: "success",
          duration: 2000,
        });
        this.getList();
      });
    },
    toContent(row) {
      this.$router.push({
        name: "AddBlogList",
        query: { id: row.id },
      });
    },
    handleDelete(row, index) {
      deleteWork(row).then(() => {
        this.$notify({
          title: "成功",
          message: "删除成功！",
          type: "success",
          duration: 2000,
        });
        this.list.splice(index, 1);
      });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["title", "desc", "content", "name"];
        const filterVal = [
          "title",
          "desc",
          "content",
          "name",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>