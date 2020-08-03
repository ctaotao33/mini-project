<template>
    <div class='page'>
        <div class="login-box">
            <el-form :model="ruleForm"  ref="ruleForm" label-position="left" label-width="0px"
                     class="demo-ruleForm login-container" >
                <h2 class="title">系统登录</h2>
                <el-form-item prop="account">
                    <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号" maxlength="20"
                              id="loginEmail"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码" maxlength="20"
                              id="loginPassword"></el-input>
                </el-form-item>
                <div class="captcha">
                    <el-form-item prop="captcha">
                        <el-input type="text" v-model="ruleForm.captcha" auto-complete="off" placeholder="验证码" maxlength="4">
                        </el-input>
                    </el-form-item>
                    <!--<img src="../assets/img/captcha1.jpeg" @click="changeImg" >-->
                    <img :src=img @click="changeImg" >
                </div>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { requestLogin } from '@/api/user'

    export default {
        name: 'app-login',
        data () {
            return {
                logining: false,
                fromUrl: '/changePassword',
                ruleForm: {
                    account: '',
                    password: '',
                    captcha: '',
                },
                captchaList: [
                    {
                        id: 1,
                        data: '18fc'
                    },
                    {
                        id: 2,
                        data: 'xe6l'
                    },
                    {
                        id: 3,
                        data: 'geos'
                    },
                    {
                        id: 4,
                        data: '7yv4'
                    },
                    {
                        id: 5,
                        data: 'cg11'
                    },
                    {
                        id: 6,
                        data: 'wr85'
                    },
                    {
                        id: 7,
                        data: '9ouc'
                    }
                ],
                // rules: {
                //     account: [
                //         { required: true, message: '请输入账号', trigger: 'blur' }
                //     ],
                //     checkPass: [
                //         { required: true, message: '请输入密码', trigger: 'blur' }
                //     ]
                // },
                checked: false,
                imgId: '',
                img:''
            }
        },
        created() {
            this.initData()
        },
        methods: {
            initData() {
                this.changeImg()
            },
            changeImg() {
                this.imgId = Math.floor(Math.random() * 7) + 1
                this.img = require('../assets/img/captcha' + this.imgId + '.jpeg')
            },
            handleSubmit (ev) {
                for( let item of this.captchaList) {
                    if(item.id === this.imgId) {
                       if(item.data == this.ruleForm.captcha) {
                           this.$refs.ruleForm.validate((valid) => {
                               if (valid) {
                                   this.logining = true
                                   const loginParams = { username: this.ruleForm.account, password: this.ruleForm.password }
                                   console.info(loginParams)
                                   requestLogin(loginParams).then(data => {
                                       this.logining = false
                                       this.$message({
                                           message: '登录成功！',
                                           type: 'success'
                                       })
                                       if(this.ruleForm.password === '123456') {
                                           this.$router.push('/changePassword')
                                       } else {
                                           this.$router.push('/index')
                                       }
                                   }).catch(err => {
                                       this.logining = false
                                       console.log(err)
                                   })
                               } else {
                                   console.log('error submit!!')
                                   return false
                               }
                           })
                           // this.$message({
                           //     message: '登录成功！',
                           //     type: 'success'
                           // })
                       } else {
                           this.$message({
                               message: '验证码错误！',
                               type: 'error'
                           })
                       }
                    }
                }

            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (from.fullPath !== '/changePassword' && !from.meta.errorPage) {
                    vm.fromUrl = from.fullPath
                }
            })
        }
    }

</script>

<style scoped>

    .title {
        text-align: center;
        margin-bottom: 15px;
    }

    .page {
        background-color: #eff3f4;
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
    }

    .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        display: block;
        width: 100%;
        max-width: 400px;
        background-color: #FFF;
        margin: 0;
        padding: 2.25em;
        box-sizing: border-box;
        border: solid 1px #DDD;
        border-radius: .5em;
    }

    .captcha {
        display: flex;
    }

    .captcha img {
        margin-left: 20px;
        width: 110px;
        height: 40px;
    }
</style>
