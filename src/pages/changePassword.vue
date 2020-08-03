<template>
    <div class='page'>
        <div class="login-box">
            <el-form :model="form"  ref="form" label-position="left" label-width="0px"
                     class="demo-ruleForm login-container" >
                <div class="title">请修改初始密码！</div>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码" maxlength="20"
                              id="loginPassword"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">
                        修改密码
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { requestLogin } from '@/api/user'

    export default {
        name: "changePassword",
        data() {
            return {
                logining: false,
                form: {
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit(ev) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.logining = true
                        const params = { password: this.form.password }
                        console.info(params)
                        requestLogin(params).then(data => {
                            this.logining = false
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            })
                            this.$router.push('/index')
                        }).catch(err => {
                            this.logining = false
                            console.log(err)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
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

</style>