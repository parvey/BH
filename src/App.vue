<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed:{
    ...mapState({
      isLoginOut:state=>state.isLoginOut,
      isCert:state=>state.isCert
    })
  },
  watch:{
    isLoginOut(){
      this.$message.warning({
        showClose:true,
        message:'登录已过期，请您重新登录。'
      });
    },
    isCert(){      
      this.$vux.confirm.show({
        'theme':'ios',
        'title':'您暂未实名认证哦',
        'confirmText':'去实名',
        'cancelText':'取消',
        onConfirm(){
          router.push({path:'/userCert'})
          //console.log('跳转实名认证接口')
        }
      })
    }
  },
  mounted(){    
    document.querySelector('html').style.fontSize = (document.documentElement.offsetWidth / 750 * 100 > 100 ? 100 : document.documentElement.offsetWidth / 750 * 100) + 'px';
      window.onresize = function temp(){
      document.querySelector('html').style.fontSize = (document.documentElement.offsetWidth / 750 * 100 > 100 ? 100 : document.documentElement.offsetWidth / 750 * 100) + 'px'
    };
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app{
  max-width:640px;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:0 auto;
  position:relative;
}
</style>
