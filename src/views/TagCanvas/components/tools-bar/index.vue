<template>
  <div class="tools-bar-warp">
    <div class="tools-bar-box">
      <Icon type="ios-expand" @click="requestFullScreen" class="handle-icon" />
      <Icon type="ios-contacts-outline" @click="showUserManagement" class="handle-icon" />
      <Icon type="ios-trophy-outline" @click="showGiftManagement" class="handle-icon" />
      <Icon type="ios-list-box-outline" @click="showRecordManagement" class="handle-icon" />
      <Icon type="ios-settings-outline" @click="showBasicManagement" class="handle-icon" />
    </div>
    <!-- 人员配置 -->
    <Drawer title="参与人员配置" width="400" v-model="show_user_management_box">
      <ul class="user-list">
        <li v-for="(user, index) in user_list" :key="user.user_id">
          {{user.user_name}}
          <Icon type="ios-trash" @click="deleteUser(index)" />
        </li>
      </ul>
      <Button type="primary" @click="showAddUserModal" class="mr10">添加人员</Button>
      <Button type="dashed" @click="radomGenerateUser" class="mr10">随机生成</Button>
      <Button type="error" @click="deleteAllUser" ghost>清空</Button>
    </Drawer>
    <!-- 奖品配置 -->
    <Drawer title="奖品配置" width="400" v-model="show_prize_management_box">
      <ul class="prize-list">
        <li v-for="(prize, index) in prize_config" :key="prize._id">
          {{`${prize.name} - (${prize.count}份)`}}
          <Icon type="ios-trash" @click="deletePrize(index)" />
        </li>
      </ul>
      <Button type="primary" @click="showAddPrizeModel" class="mr10">添加奖品</Button>
    </Drawer>
    <!-- 添加奖品 -->
    <Modal
      v-model="show_prize_add_modal"
      title="添加奖品">
      <Form ref="addPrizeForm" :model="add_prize_data" :rules="prizeValidate" :label-width="80" @submit.native.prevent>
        <FormItem prop="name" label="奖品名称">
          <Input v-model="add_prize_data.name" placeholder="请输入奖品名称" />
        </FormItem>
        <FormItem prop="img" label="奖品图片">
          <Input v-model="add_prize_data.img" placeholder="请输入奖品图片地址" />
        </FormItem>
        <FormItem prop="count" label="奖品数量">
          <InputNumber :max="100" :min="1" v-model="add_prize_data.count"></InputNumber>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" @click="show_prize_add_modal = false">取消</Button>
        <Button type="primary" @click="confirmAddPrize">确定</Button>
      </div>
    </Modal>
    <!-- 中奖列表 -->
    <Drawer title="中奖记录" width="400" v-model="show_record_management_box">
      <ul class="prize-records-list">
        <li v-for="(item, index) in prize_records" :key="index">
          <div>
            <p class="user-name">{{item.user_name}}</p>
            <p class="prize-name">{{item.prize_name}}</p>
          </div>
          <Icon type="ios-trash" @click="deletePrizeRecord(index)" />
        </li>
      </ul>
    </Drawer>
    <!-- 基本配置 -->
    <Drawer title="基本配置" width="400" v-model="show_basic_management_box">
      <Form ref="updateBasic" :model="edit_lottery_basic_info" :rules="loteryValidate" :label-width="80" @submit.native.prevent>
        <FormItem prop="name" label="抽奖主题">
          <Input v-model="edit_lottery_basic_info.title" placeholder="抽奖主题" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmitBasic">保存</Button>
          <Button @click="handleResetBasic" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Drawer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('tagCanvas')
import randomAll from 'random-all'
export default {
  name: 'ToolsBar',
  data() {
    return {
      show_user_management_box: false,
      show_prize_management_box: false,
      show_record_management_box: false,
      show_basic_management_box: false,
      show_prize_add_modal: false,
      add_prize_data: {
        name: '',
        img: '',
        count: 1
      },
      edit_lottery_basic_info: {
        title: ''
      },
      prizeValidate: {
        name: [
          { required: true, message: '奖品名称不能为空', trigger: 'blur' }
        ],
        count: [
          { required: true, type: 'number', message: '奖品数量不能为空', trigger: 'blur' }
        ]
      },
      loteryValidate: {
        title: [
          { required: true, message: '抽奖主题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      user_list: state => state.pool,
      prize_config: state => state.prize_config,
      prize_records: state => state.prize_records,
      lottery_basic_info: state => state.basic
    })
  },
  created() {

  },
  mounted() {

  },
  beforeDestory() {

  },
  methods: {
    ...mapMutations([ 'pushUser2Pool', 'deletePoolUser', 'emptyPool', 'createPrize', 'deletePrizeFromConfig', 'deletePrizeRecord', 'updateBasic' ]),
    requestFullScreen() {
      document.documentElement.requestFullscreen()
    },
    showUserManagement() {
      this.show_user_management_box = true
    },
    showAddUserModal() {
      let input_val = ''
      this.$Modal.info({
        title: '添加人员',
        closable: true,
        render: (h) => {
          return h('Input', {
            props: {
              value: input_val,
              type: 'textarea',
              autofocus: true,
              placeholder: '请输入人员姓名，并以逗号隔开',
              autosize: { minRows: 4, maxRows: 10 }
            },
            style: {
              marginTop: '14px'
            },
            on: {
              input: (val) => {
                input_val = val
              }
            }
          })
        },
        onOk: () => {
          let new_user_list = input_val.split(/[，,]/ig)
          new_user_list.forEach(name => {
            if (name.trim()) {
              this.pushUser2Pool({user_name: name.trim()})
            }
          })
        }
      })
    },
    radomGenerateUser() {
      new Array(10).join('-').split('').map(() => {
        let fn = `赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤`
        let ln = [`二狗`, `富贵`, `霸天`, `甲`, `乙`, `三疯`]
        this.pushUser2Pool({
          user_name: `${fn[randomAll.getUnique(0, fn.length -1)]}${ln[randomAll.getUnique(0, ln.length - 1)]}`
        })
      })
    },
    deleteUser(index) {
      this.deletePoolUser(index)
    },
    deleteAllUser() {
      this.emptyPool()
    },
    showGiftManagement() {
      this.show_prize_management_box = true
    },
    showAddPrizeModel() {
      this.$refs['addPrizeForm'].resetFields()
      this.show_prize_add_modal = true
      this.add_prize_data = {
        img: '',
        name: '',
        count: 1
      }
    },
    confirmAddPrize() {
      this.$refs['addPrizeForm'].validate((valid) => {
        if (valid) {
          this.createPrize({...this.add_prize_data})
          this.show_prize_add_modal = false
        }
      })
    },
    deletePrize(index) {
      this.deletePrizeFromConfig(index)
    },
    showRecordManagement() {
      this.show_record_management_box = true
    },
    showBasicManagement() {
      this.edit_lottery_basic_info = {
        ...this.lottery_basic_info
      }
      this.$refs['addPrizeForm'].resetFields()
      this.show_basic_management_box = true
    },
    handleSubmitBasic() {
      this.$refs['updateBasic'].validate((valid) => {
        if (valid) {
          this.updateBasic({...this.edit_lottery_basic_info})
          this.show_basic_management_box = false
        }
      })
      
    },
    handleResetBasic() {
      this.edit_lottery_basic_info = {
        ...this.lottery_basic_info
      }
      this.$refs['addPrizeForm'].resetFields()
    }
  }
}
</script>

<style src="./index.less" scoped lang="less"></style>