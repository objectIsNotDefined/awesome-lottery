import radom from 'radom'

const LS_PrizeConfig_Key = 'TagCanvas_PrizeConfig'
const LS_Pool_Key = 'TagCanvas_Pool'
const LS_Records_Key = 'TagCanvas_Records'

const TagcanvasStore = {
  namespaced: true,
  state: () => ({
    // 备选池
    pool: [],
    // 奖品配置
    prize_config: [],
    // 中奖记录
    prize_records: [],
    // 当前抽奖奖品
    current_prize_id: '',
    // 当前页面状态
    current_view: 1,      // 1->奖品banner页面 2->抽奖主页(default) 3->抽奖中 4->抽奖结果显示
  }),
  getters: {
    current_prize(state) {
      return state.prize_config.filter(prize => prize._id === state.current_prize_id)[0]
    },
    current_prize_records(state) {
      return state.prize_records.filter(item => item.prize_id === state.current_prize_id)
    }
  },
  mutations: {
    // 修改当前抽奖奖品
    changeCurrentPrizeIndex(state, data) {
      state.current_prize_id = data
    },
    // 更新当前页面状态
    setViewStatus(state, data) {
      state.current_view = data
    },
    // 创建奖品
    createPrize(state, data) {
      state.prize_config.push({
        _id: radom(16),
        name: data.name || '',
        img: data.img || '',
        count: data.count || 1
      })
      localStorage.setItem(LS_PrizeConfig_Key, JSON.stringify(state.prize_config))
    },
    // 删除奖品
    deletePrizeFromConfig(state, index) {
      state.prize_config.splice(index, 1)
      localStorage.setItem(LS_PrizeConfig_Key, JSON.stringify(state.prize_config))
    },
    // 添加人员
    pushUser2Pool(state, data) {
      state.pool.push({
        user_id: data.user_id || radom(16),
        user_name: data.user_name
      })
      localStorage.setItem(LS_Pool_Key, JSON.stringify(state.pool))
    },
    // 删除人员
    deletePoolUser(state, index) {
      state.pool.splice(index, 1)
      localStorage.setItem(LS_Pool_Key, JSON.stringify(state.pool))
    },
    // 清空人员
    emptyPool(state) {
      state.pool = []
      localStorage.setItem(LS_Pool_Key, JSON.stringify(state.pool))
    },
    // 添加中奖记录
    createRecordItem(state, data) {
      state.prize_records.push({
        prize_id: data.prize_id,
        prize_name: data.prize_name,
        user_name: data.user_name,
        user_id: data.user_id
      })
      localStorage.setItem(LS_Records_Key, JSON.stringify(state.prize_records))
    },
    deletePrizeRecord(state, index) {
      state.prize_records.splice(index, 1)
      localStorage.setItem(LS_Records_Key, JSON.stringify(state.prize_records))
    }
  },
  actions: {
    // 初始化状态
    initStatus({state}) {
      // 处理缓存数据
      let pool_cache = localStorage.getItem(LS_Pool_Key)
      let prizeConfig_cache = localStorage.getItem(LS_PrizeConfig_Key)
      let records_cache = localStorage.getItem(LS_Records_Key)
      try {
        if (pool_cache) {
          pool_cache = JSON.parse(pool_cache)
          state.pool = pool_cache
        }
        if (prizeConfig_cache) {
          prizeConfig_cache = JSON.parse(prizeConfig_cache)
          state.prize_config = prizeConfig_cache
        }
        if (records_cache) {
          records_cache = JSON.parse(records_cache)
          state.prize_records = records_cache
        }
      } catch (e) {console.log(e)}
      
    },
    // 抽奖
    getLuckyGuy({state, commit, getters}, data) {
      let count = data || getters.current_prize.count || 1
      while (count) {
        let luck_index = Math.floor(Math.random() * state.pool.length)
        let luck_guys = state.pool.splice(luck_index, 1)[0]
        commit('createRecordItem', {
          user_name: luck_guys.user_name,
          user_id: luck_guys.user_id,
          prize_name: getters.current_prize.name,
          prize_id: getters.current_prize._id
        })
        count--
      }
    }
  }
}

export default TagcanvasStore