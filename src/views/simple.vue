<template>
  <div>
    <div style="width:70%;margin:30px auto 0 auto">
      <div style="text-align: center">
        <strong style="font-size: 40px;letter-spacing: 10px;">轻轻松松<span style="color: #3a8ee6;font-size: 60px">下</span>,简简单单<span
          style="color: #61b3ec;font-size: 50px">用</span></strong>
        <div style="text-align: center;font-size: 16px;color: #a7adad;margin-top:25px"><strong>在错综复杂的web环境下,致力于轻轻松松下载minimalist软件,软件持续更新中...欢迎大家留言推荐</strong>
        </div>
      </div>
    <div style="margin-top:30px">

    </div>
    <!--    文件操作弹窗-->
    <el-dialog
      title="文件管理"
      :visible.sync="fileManage"
      width="36%"
      center>
      <div style="flex: none">
        <div style="height: 100%;display: table;margin:0 auto">
          <div
            style="align-items: center;display: table-cell;vertical-align: middle;height: auto;flex:none;text-align: center">
            <img :src="downFile.icon" style="width:106px;border-radius: 1em;"/>
            <div>
              <span
                style="font-size:16px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100%;display: inline-block;margin-top:8px;font-weight: bold">{{ downFile.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="fileManage = false">取 消</el-button>
        <el-button type="primary" @click="fileManage = false;goHome()" :disabled="downFile.path==='null'"
                   title="部分软件没有找到官网">官网下载</el-button>
        <el-button type="success" @click="fileManage = false;fileDown(downFile)" :disabled="downFile.filepath==='null'"
                   title="软件官网下载更快">直接下载</el-button>
       </span>
    </el-dialog>
    <!--    文件操作弹窗-->
  </div>
</div>
</template>

<script>


export default {
  name: "simple"
}
</script>

<style scoped>
.file:hover {
  box-shadow: 0 0 10px grey;
}
</style>
