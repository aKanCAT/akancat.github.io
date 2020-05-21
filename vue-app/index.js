const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const capi_url = 'https://tw.rter.info/capi.php';
const URL = 'http://tw.rter.info/json.php?t=currency&q=check&iso=JPY';



const FireBaseSignType = Object.freeze({
    "email": 0,
    "google": 1,
    "facebook": 2,
});

var obj = {
    app: null,
    foo: 'bar',
    url: URL,

    isLoaded: false,
    isEmailAuthEnabled: false,

    user: null,

    user_img: '',
    user_name: '',
    inputEmail: 'akan318@livemail.tw',
    inputPassword: '123456',

    user_token: null,
    user_birthday: null,

    providerData: [],

    fetchMsg: '',
    providerG: null,
    providerF: null,
}

function jsonCallback(json) {
    console.log('jsonCallback');
    $.each(json, function(index, value) {
        alert(index + " " + value);
    });
}

let vm = new Vue({
    el: '#app',
    data: obj,
    // 建立之前 //
    beforeCreate() {
        console.log('[Vue] beforeCreate');
    },
    // 建立完成後 //
    created() {
        console.log('[Vue] created');

        // Your web app's Firebase configuration
        let firebaseConfig = {
            apiKey: "AIzaSyAwzKGftHCZ2chwI_n0BA7Cn2Kbd3xd504",
            authDomain: "acnh-connect-test.firebaseapp.com",
            databaseURL: "https://acnh-connect-test.firebaseio.com",
            projectId: "acnh-connect-test",
            storageBucket: "acnh-connect-test.appspot.com",
            messagingSenderId: "655249333290",
            appId: "1:655249333290:web:5d869851f66757f9c17753",
            measurementId: "G-K4KZR20V55"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

        this.providerG = new firebase.auth.GoogleAuthProvider();
        this.providerF = new firebase.auth.FacebookAuthProvider();
        this.providerF.addScope('user_birthday');

        let vm = this;
        firebase.auth().onAuthStateChanged(user => vm.onAuthStateChanged(user));

        // this.app = new PIXI.Application({
        //     width: this.width,
        //     height: this.height,
        //     backgroundColor: 0x1099bb
        // });

        // el.addendChild(this.app);

        //let pixi_app = new PIXI.Application(414, 736, { backgroundColor: 0x1099bb });

        // const hostname = "http://www.google.com.tw";
        // fetch(`${hostname}`, {
        //         credentials: 'include'
        //         // headers: {
        //         //     'X-Access-Token': 'dontbeserious'
        //         // }
        //     })
        //     .then(function(response) {
        //         console.log(response);
        //     }).then(function(value) {
        //         console.log('value: ' + value);
        //     })

        // fetch(url, {
        //         headers: {
        //             'X-Access-Token': 'dontbeserious'
        //         }
        //     })
        //     .then(res => res.json())
        //     .then(log);



        // /** fetch api url by cors-anywhere */
        // //axios.get(`${cors}${obj.url}`)
        // axios.get(url)
        //     .then((response) => {
        //             console.log(response.status);
        //             console.log(response.data);
        //         },
        //         (error) => {
        //             console.log(error);
        //         }
        //     );
    },
    beforeMount() {
        console.log('[Vue] beforeMount');
    },
    mounted() {
        console.log('[Vue] mouted');
        //console.log(this.$el);
        // axios
        //     .get()
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) { // 请求失败处理
        //         console.log(error);
        //     });
    },
    watch: {

    },
    computed: {
        isSignIn() {
            return (this.user !== null);
        },

        currentUser: function() {
            console.log('currentUser');
            return firebase.auth().currentUser;
        },

        userName: function() {
            return (this.user) ? this.user.displayName : '';
        },
        userUID: function() {
            return (this.user) ? this.user.uid : '';
        },
        userToken: function() {
            return (this.user) ? this.user.uid : '';
        },
        userEmail: function() {
            return (this.user) ? this.user.email : '';
        }
    },
    methods: {
        // 由 firebase 回呼(非同步) //
        onAuthStateChanged(user) {
            console.log('[firebase] onAuthStateChanged');

            if (!this.isLoaded) this.isLoaded = true;

            let old_user = this.user;
            this.user = user;

            if (user) {
                console.log(user);

                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;

                this.user_token = user.refreshToken;
                this.user_img = user.photoURL;

                // this.providerData = user.providerData;
                // this.providerData.forEach(profile => {

                // });
            } else {
                console.log('使用者不存在 or 已登出');
            }
        },
        signOut() {
            console.log('[firebase] signOut');

            firebase.auth().signOut()
                .then(() => {
                    console.log('登出成功');
                    this.user_token = null;
                    this.user_img = null;
                })
                .catch(error => {
                    console.log('登出失敗');
                    console.log(error);
                });
        },
        createUser() {
            console.log('[firebase] createUserWithEmailAndPassword');

            let vm = this;
            let email = this.inputEmail;
            let pw = this.inputPassword;

            firebase.auth().createUserWithEmailAndPassword(email, pw)
                .catch(error => {
                    console.log('以 email 註冊失敗');
                    console.log(error);

                    // Handle Errors here.
                    var errorMessage = error.message;
                });;


            if (this.currentUser) {
                console.log(this.currentUser);
            }

        },
        emailSignIn() {
            console.log('[firebase] 以 email 登入');

            let vm = this;
            let email = this.inputEmail;
            let pw = this.inputPassword;
            let firebaseAuth = firebase.auth();

            firebaseAuth.signInWithEmailAndPassword(email, pw)
                .catch(error => {
                    vm.onLoginFail(0, error);
                });

            var user = firebaseAuth.currentUser;
            if (user) {
                //console.log(user);
            }

            // firebaseAuth.currentUser.linkWithPopup(provider).then(function(result) {
            //     // Accounts successfully linked.
            //     var credential = result.credential;
            //     var user = result.user;
            //     // ...
            //   }).catch(function(error) {
            //     // Handle Errors here.
            //     // ...
            //   });

        },
        signIn(signType = 0, popup = true) {

            //console.log('signIn(' + signType + ', ' + popup + ')');

            let provider = null;

            switch (signType) {
                case FireBaseSignType.email:
                    console.log('[firebase] 以 email 登入');
                    break;
                case FireBaseSignType.google:
                    provider = this.providerG;
                    console.log('[firebase] 以 Google 登入');
                    break;
                case FireBaseSignType.facebook:
                    provider = this.providerF;
                    console.log('[firebase] 以 Facebook 登入');
                    break;
            }

            if (provider) {
                let vm = this;

                function signInEx() {
                    let firebaseAuth = firebase.auth();
                    firebaseAuth.languageCode = 'zh_TW';
                    if (popup) {
                        return firebaseAuth.signInWithPopup(provider);
                    }
                    firebaseAuth.signInWithRedirect(provider);
                    return firebaseAuth.getRedirectResult();
                };

                signInEx().then(result => {
                    vm.onLogin(signType, result);
                }).catch(error => {
                    vm.onLoginFail(signType, error);
                });
            }
        },
        onLogin(type, result) {

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //this.user_name = result.user;
            //this.user_token = result.credential.accessToken;

            switch (type) {
                case 0:
                    console.log('以 Email 登入成功');
                    break;
                case 1:
                    console.log('以 Google 登入成功');
                    break;
                case 2:
                    console.log('以 Facebook 登入成功');
                    break;
            }

            console.log(result);
            //console.log(result.credential.accessToken);
        },
        onLoginFail(type, error) {
            //
            this.login_error = error;

            switch (type) {
                case 0:
                    console.log('以 Email 登入失敗');
                    break;
                case 1:
                    console.log('以 Google 登入失敗');
                    break;
                case 2:
                    console.log('以 Facebook 登入失敗');
                    break;
            }
            console.log(error);
        },
        getURL: function() {
            return URL + '&_=' + moment.utc().valueOf();
        },
        func1: function() {
            //this.url = URL + '_=' + moment.utc().valueOf();
            let vm = this;
            $.ajax({
                type: "get",
                url: 'json.php',
                success: function(res) {
                    console.log('success');
                    //console.log(res);
                    let json = JSON.parse(res);
                    vm.list = json.data;
                    console.log(json.data);
                },
                error: function(res) {
                    console.log('error');
                    console.log(res);
                }
            });
        },
        func2: function() {
            //this.url = URL + '_=' + moment.utc().valueOf();

            let url = "http://rate.bot.com.tw/xrt/fltxt/0/day";

            this.fetchMsg = '同步中';

            let vm = this;

            fetch(`${cors}${url}`, {})
                .then((response) => {
                    vm.fetchMsg = '同步成功';
                    console.log(response);
                })
                .then((jsonData) => {

                })
                .catch((err) => {
                    vm.fetchMsg = '同步失敗';
                    console.log(err);
                })

            // let json = JSON.parse(res);
            // vm.list = json.data;
            // console.log(json.data);
        },
        getName: function(name, index) {
            let result = 'imgs/Ftr' + name + '_Remake_' + (index - 1) + '_0.png';
            //console.log(result);
            return result;
        }
    }
});

// $watch 是一个实例方法
vm.$watch('foo', function(newValue, oldValue) {
    // 这个回调将在 `vm.a` 改变后调用
    console.log(newValue);
    console.log(oldValue);
})