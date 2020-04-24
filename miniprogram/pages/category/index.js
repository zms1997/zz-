// pages/category/indexs.js

// 引入
import {request}  from"../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightContent:[],
    // 选中菜单
    currentIndex:0,
    // 右侧内容滚动条距离顶部的距离
    scrolltop:0
  },

  // 接口返回数据
  Category:[],

  // 获取分类数据
  async getCategory(){
    const res= await request({url:"/categories"});
    
      this.Category=res;

      //把接口数据存入到本地存储中
      wx.setStorageSync("category", {time:Date.now(),data:this.Category});
      
      // 构造左侧菜单数据
      let leftMenuList = this.Category.map(v=>v.cat_name);

      // 构造右侧商品数据
      let rightContent = this.Category[0].children;

      this.setData({ 
        leftMenuList,
        rightContent
      })
    
  },

  // 点击事件
  handleItemTap(e){
    // 获取被点击标题身上的索引
    const {index}=e.currentTarget.dataset;
  
    let rightContent = this.Category[index].children;
    // 给data中的currentindex赋值 根据不同索引来渲染右侧商品内容
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置scrolltop值
      scrolltop:0
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存功能
    // 判断本地存储中有没有旧数据
    // 如果没有旧数据 直接发送请求
    // 如果有旧数据 同时旧数据也没过期 就使用存储中的旧数据即可
    const Category = wx.getStorageSync("category")
    if (!Category){
      this.getCategory();
    }else{
      if(Date.now()-Category.time>1000*10){
        this.getCategory();
      }else{
        this.Category= Category.data;
        // 构造左侧菜单数据
        let leftMenuList = this.Category.map(v => v.cat_name);

        // 构造右侧商品数据
        let rightContent = this.Category[0].children;

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})