<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间<span>2023-4-24</span></p>
          <p>上次登录地点<span>广东</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          />
        </el-table>
      </el-card>
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="16" style="padding-left: 10px"
      ><div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; width: 100%">
        <div ref="echarts_1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card ref="echarts_2" id="echarts_2" style="height: 260px"></el-card>
        <el-card></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        dayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 126,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 548,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 14286,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 542,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 454567,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data
      this.tableData = tableData
      const echarts_1 = echarts.init(this.$refs.echarts_1)
      const { orderData, userData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      var echarts1Option = {
        xAxis: {
          data: orderData.date,
        },
        yAxis: {},
        legend: {
          key: orderData.data,
        },
        series: [],
      }
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: 'line',
        })
      })
      echarts_1.setOption(echarts1Option)
      //柱状图
      const echarts_2 = echarts.init(document.getElementById('echarts_2'))
      var echarts2Option = {
        legend: {
          textStyle: {
            color: '#333',
          },
        },
        grid: {
          left: '20%',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category', 
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: userData.map((item) => item.new),
            type: 'bar',
          },
          {
            name: '活跃用户',
            data: userData.map((item) => item.active),
            type: 'bar',
          },
        ],
      }
      echarts_2.setOption(echarts2Option)
    })
  },
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
  .el-card {
    width: 32%;
    text-align: center;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>
