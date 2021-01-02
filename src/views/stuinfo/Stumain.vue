<template>
  <div id="users">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生信息用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 学生信息卡片区 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="queryMap" label-width="70px" size="small">
        <el-form-item label="用户名">
          <el-input
            v-model="queryMap.stuname"
            placeholder="请输入用户名查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="queryMap.stusex" label="1">男</el-radio>
          <el-radio v-model="queryMap.stusex" label="0">女</el-radio>
          <el-radio v-model="queryMap.stusex" label="-1">全部</el-radio>
        </el-form-item>
        <el-form-item label="学号">
          <el-input
            v-model="queryMap.stunum"
            clearable
            placeholder="请输入学号查询"
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-left: 50px">
          <el-button type="primary" @click="searchStu" icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            @click="addDialogVisible = true"
            type="success"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 表格区域 -->

      <el-table
        v-loading="loading"
        size="small"
        :data="stuList"
        style="width: 100%"
        height="420"
      >
        <el-table-column
          prop="stunum"
          label="学号"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="stuname"
          label="姓名"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="stuphone"
          label="联系方式"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="stubirth"
          label="生日"
          width="110"
        ></el-table-column>
        <el-table-column prop="stusex" label="性别" width="100">
        </el-table-column>
        <el-table-column
          prop="stuidcard"
          label="身份证号"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="stumajor"
          label="专业"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="stufaculty"
          label="院系"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="stuin"
          label="入学年份"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="stuadress"
          label="现居住地址"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit-outline"
              @click="editStu(scope.row.stunum)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="dellStu(scope.row.stunum)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryMap.pageNum"
        :page-sizes="[6, 10, 20, 30]"
        :page-size="queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 添加对话框 -->
      <el-dialog
        title="添加学生"
        :destroy-on-close="true"
        v-model="addDialogVisible"
        width="50%;"
      >
        <span>
          <el-form
            :model="addStuForm"
            :rules="addStuFormRules"
            ref="addStuFormRef"
          >
            <el-row>
              <el-col :span="7">
                <el-form-item prop="stunum" label="学号">
                  <el-input v-model="addStuForm.stunum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item prop="stuname" label="学生姓名">
                  <el-input v-model="addStuForm.stuname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="联系方式">
                  <el-input v-model="addStuForm.stuphone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item prop="stubirth">
                  <el-date-picker
                    type="date"
                    placeholder="选择出生日期"
                    value-format="yyyy年MM月dd日"
                    v-model="addStuForm.stubirth"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item prop="stubirth" label="性别">
                  <el-radio-group v-model="addStuForm.stusex">
                    <el-radio :label="1">帅哥</el-radio>
                    <el-radio :label="0">美女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-form-item>
                  <el-input
                    v-model="addStuForm.stuidcard"
                    placeholder="请输入身份证号码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item prop="stufaculty" label="院系">
                  <el-input
                    v-model="addStuForm.stufaculty"
                    placeholder="请输入院系"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item prop="stumajor" label="专业班级">
                  <el-input
                    v-model="addStuForm.stumajor"
                    placeholder="请输入专业班级"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item prop="stuin" label="入学日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择入学日期"
                    value-format="yyyy年MM月dd日"
                    v-model="addStuForm.stuin"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="家庭住址">
                  <el-input v-model="addStuForm.stuadress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addStuBtn"
              :loading="btnLoading"
              :disabled="btnDisabled"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>

      <!-- 修改对话框 -->
      <el-dialog
        title="修改学生"
        :destroy-on-close="true"
        v-model="editDialogVisible"
        width="50%;"
      >
        <span>
          <el-form
            :model="editStuForm"
            :rules="editStuFormRules"
            ref="editStuFormRef"
          >
            <el-row>
              <el-col :span="7">
                <el-form-item prop="stunum" label="学号">
                  <el-input
                    :disabled="true"
                    v-model="editStuForm.stunum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item prop="stuname" label="学生姓名">
                  <el-input v-model="editStuForm.stuname"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7" :offset="1">
                <el-form-item label="联系方式">
                  <el-input v-model="editStuForm.stuphone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item prop="stubirth">
                  <el-date-picker
                    type="date"
                    placeholder="选择出生日期"
                    value-format="yyyy年MM月dd日"
                    v-model="editStuForm.stubirth"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item prop="stubirth" label="性别">
                  <el-radio-group v-model="editStuForm.stusex">
                    <el-radio :label="1">帅哥</el-radio>
                    <el-radio :label="0">美女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-form-item>
                  <el-input
                    v-model="editStuForm.stuidcard"
                    placeholder="请输入身份证号码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item prop="stufaculty" label="院系">
                  <el-input
                    v-model="editStuForm.stufaculty"
                    placeholder="请输入院系"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item prop="stumajor" label="专业班级">
                  <el-input
                    v-model="editStuForm.stumajor"
                    placeholder="请输入专业班级"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item prop="stuin" label="入学日期">
                  <el-date-picker
                    type="date"
                    placeholder="选择入学日期"
                    value-format="yyyy年MM月dd日"
                    v-model="editStuForm.stuin"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="家庭住址">
                  <el-input v-model="editStuForm.stuadress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="updateStu"
              :loading="btnLoading"
              :disabled="btnDisabled"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      stuList: [],
      addDialogVisible: false, //添加对话框
      editDialogVisible: false, //修改对话框
      btnLoading: false,
      btnDisabled: false,
      total: 0, //用户总数量
      //查询对象
      queryMap: {
        pageNum: 1,
        pageSize: 6,
        stunum: "",
        stusex: "",
        stuname: "",
      },
      addStuForm: {
        //添加学生对话框数据
        stuname: "肖高峰",
        stunum: "2017082104",
        stuphone: "123456789",
        stubirth: "1998-09-23",
        stusex: 1,
        stuidcard: "12345678910111213",
        stumajor: "计算机科学与技术",
        stufaculty: "信息技术与管理学院",
        stuin: "2019-09-01",
        stuadress: "湖南省长沙市岳麓区湖南财政经济学院",
      },
      addStuFormRules: {
        //添加学生对话框验证规则
        stuname: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        stunum: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 12, max: 12, message: "长度在 12 个字符", trigger: "blur" },
        ],
        stubirth: [
          { required: true, message: "请填写出生日期", trigger: "blur" },
        ],
        stumajor: [
          { required: true, message: "请填写专业班级", trigger: "blur" },
        ],
        stufaculty: [
          { required: true, message: "请填写学院", trigger: "blur" },
        ],
        stuin: [{ required: true, message: "请填写入学日期", trigger: "blur" }],
      },
      editStuForm: {},
      editStuFormRules: {
        stuname: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        stunum: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 12, max: 12, message: "长度在 12 个字符", trigger: "blur" },
        ],
        stubirth: [
          { required: true, message: "请填写出生日期", trigger: "blur" },
        ],
        stumajor: [
          { required: true, message: "请填写专业班级", trigger: "blur" },
        ],
        stufaculty: [
          { required: true, message: "请填写学院", trigger: "blur" },
        ],
        stuin: [{ required: true, message: "请填写入学日期", trigger: "blur" }],
      },
    };
  },
  methods: {
    async getStuList() {
      this.loading = true;
      const { data: res } = await axios.get("Stu/", {
        params: this.queryMap,
      });
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("获取用户列表失败:");
      }
      setTimeout(() => {
        this.loading = false;
      }, 500);
      this.total = res.total;
      this.stuList = res.data;
    },
    async addStuBtn() {
      this.$refs.addStuFormRef.validate(async (valid) => {
        if (!valid) return;
        this.btnLoading = true;
        this.btnDisabled = true;
        const { data: res } = await axios.post("Stu/", this.addStuForm);
        if (res.code == 200) {
          this.$notify.success({
            title: "操作成功",
            message: "用户添加成功",
          });
          await this.getStuList();
        } else {
          this.btnLoading = false;
          this.btnDisabled = false;
          return this.$message.error("用户添加失败:" + res.msg);
        }
        this.addDialogVisible = false;
        this.btnLoading = false;
        this.btnDisabled = false;
      });
    },
    /**
     *  改变页码
     */
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getStuList();
    },
    /**
     * 翻页
     */
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getStuList();
    },
    /**
     * 搜索用户
     */
    searchStu() {
      this.queryMap.pageNum = 1; //防止用户在第其他页进行搜索
      this.getStuList();
    },
    /**
     * 删除用户
     */
    async dellStu(stunum) {
      const res = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (res == "confirm") {
        const { data: res } = await axios.delete("Stu/", {
          params: { stunum: stunum },
        });
        console.log(res);
        if (res.code == 200) {
          this.$notify.success({
            title: "操作成功",
            message: "用户删除成功",
          });
          await this.getStuList();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    /**
     * 修改用户
     */
    async editStu(stunum) {
      const { data: res } = await axios.get("editStu/", {
        params: { stunum: stunum },
      });
      if (res.code == 200) {
        this.editStuForm = res.data;
        this.editDialogVisible = true;
      } else {
        return this.$message.error("用户信息编辑失败:" + res.msg);
      }
    },
    async updateStu() {
      this.$refs.editStuFormRef.validate(async (valid) => {
        if (!valid) return;
        this.btnLoading = true;
        this.btnDisabled = true;
        const { data: res } = await axios.put("editStu/", this.editStuForm);
        if (res.code == 200) {
          this.$notify({
            title: "操作成功",
            message: "用户基本信息已更新",
            type: "success",
          });
          this.editStuForm = {};
          await this.getStuList();
        } else {
          this.$message.error("用户信息更新失败:" + res.msg);
        }
        this.editDialogVisible = false;
        this.btnLoading = false;
        this.btnDisabled = false;
      });
    },
  },
  created() {
    this.getStuList();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>