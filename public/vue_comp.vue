<template>
    <div class="login">
        <div v-if="loggingIn" class="container-loading">
            <img src="/loading.gif" alt="Loading Icon">
        </div>
        <p v-if="loginError">{{ loginError }}</p>
        <p v-if="loginSuccessful">Login Successful</p>
        <form @submit.prevent="loginSubmit">
            <input type="email" placeholder="E-Mail" v-model="email">
            <input type="password" placeholder="Password" v-model="password">
            <button type="submit">Login</button>
        </form>
        <section class="login-content" style="
    margin: 20px 20px;
    height: 50%;
    width: 50%;
    background-color: blueviolet;
">
            <div class="logo">
                <h1>Carson Kitchen</h1>
            </div>
            <div class="login-box">
                <form class="login-form" action="/api/auth" method="post">
                    <h3 class="login-head">
                        <i class="fa fa-lg fa-fw fa-user"></i>SIGN IN
                    </h3>
                    <div class="form-group">
                        <label class="control-label">EMAIL</label>
                        <input class="form-control" type="email"
                               placeholder="Email" autofocus="" name="email">
                    </div>
                    <div class="form-group">
                        <label class="control-label">PASSWORD</label>
                        <input class="form-control" type="password" placeholder="Password" name="password">
                    </div>
                    <div class="form-group">
                        <div class="utility">
                            <div class="animated-checkbox">
                                <label><input type="checkbox">
                                    <span class="label-text">Stay Signed in</span>
                                </label>
                            </div>
                            <p class="semibold-text mb-2">
                                <a href="#" data-toggle="flip">Forgot Password ?</a></p>
                        </div>
                    </div>
                    <div class="form-group btn-container">
                        <button class="btn btn-primary btn-block">
                            <i class="fa fa-sign-in fa-lg fa-fw"></i>SIGN IN
                        </button>
                    </div>
                </form>
                <form class="forget-form" action="/api/forgetPwd" method="post">
                    <h3 class="login-head">
                        <i class="fa fa-lg fa-fw fa-lock"></i>Forgot Password ?</h3>
                    <div class="form-group"><label class="control-label">EMAIL</label>
                        <input class="form-control" type="text" placeholder="Email">
                    </div>
                    <div class="form-group btn-container">
                        <button class="btn btn-primary btn-block">
                            <i class="fa fa-unlock fa-lg fa-fw"></i>RESET</button>
                    </div>
                    <div class="form-group mt-3">
                <p class="semibold-text mb-0"><a href="/api/auth" data-toggle="flip">
                <i class="fa fa-angle-left fa-fw"></i> Back to Login</a></p></div></form></div></section>

    </div>
</template>

<style scoped lang="scss">
    .login {
        border: 1px solid black;
        border-radius: 5px;
        padding: 1.5rem;
        width: 300px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        .container-loading {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0,0,0,.3);
            img {
                width: 2rem;
                height: 2rem;
            }
        }
        form {
            display: flex;
            flex-flow: column;
            *:not(:last-child) {
                margin-bottom: 1rem;
            }
            input {
                padding: .5rem;
            }
            button {
                padding: .5rem;
                background-color: lightgray;
                border: 1px solid gray;
                border-radius: 3px;
                cursor: pointer;
                &:hover {
                    background-color: lightslategray;
                }
            }
        }
    }
</style>
