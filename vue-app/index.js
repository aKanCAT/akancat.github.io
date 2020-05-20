const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const capi_url = 'https://tw.rter.info/capi.php';



const URL = 'http://tw.rter.info/json.php?t=currency&q=check&iso=JPY';

var obj = {
    app: null,
    foo: 'bar',
    url: URL,

    user: null,

    user_img: '',
    user_name: '',
    user_email: 'akan318@livemail.tw',
    user_password: '123456',
    user_token: null,
    user_birthday: null,

    providerData: [],


    fetchMsg: '',
    providerG: null,
    providerF: null,
    list: [{
        caption: '電線桿',
        name: 'Telephonepole',
        cost: 1000,
        count: 2
    }, {
        caption: '流動廁所',
        name: 'WCPortable',
        cost: 1000,
        count: 5
    }, {
        caption: '施工告示牌',
        name: 'SignConstruction',
        cost: 1000,
        count: 5
    }, {
        caption: '電線桿',
        name: 'Telephonepole',
        cost: 1000,
        count: 2
    }, {
        caption: '沙灘瞭望台',
        name: 'Monitoringchair',
        cost: 1000,
        count: 5
    }, {
        caption: '自動販賣機',
        name: 'Drinkmachine',
        cost: 2000,
        count: 6
    }, {
        caption: '甜點自動販賣機',
        name: 'Foodmachine',
        cost: 2000,
        count: 4
    }, {
        caption: '彈簧遊樂器材',
        name: 'Springrider',
        cost: 2000,
        count: 7
    }, {
        caption: '觀光望遠鏡',
        name: 'TelescopeSightseeing',
        cost: 2000,
        count: 5
    }, {
        caption: '公園時鐘',
        name: 'Parkclock',
        cost: 2400,
        count: 2
    }, {
        caption: '電話亭',
        name: 'Telephonebox',
        cost: 2400,
        count: 8
    }]
}

function jsonCallback(json) {
    console.log('jsonCallback');
    $.each(json, function(index, value) {
        alert(index + " " + value);
    });
}


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAwzKGftHCZ2chwI_n0BA7Cn2Kbd3xd504",
    authDomain: "acnh-connect-test.firebaseapp.com",
    databaseURL: "https://acnh-connect-test.firebaseio.com",
    projectId: "acnh-connect-test",
    storageBucket: "acnh-connect-test.appspot.com",
    messagingSenderId: "655249333290",
    appId: "1:655249333290:web:5d869851f66757f9c17753",
    measurementId: "G-K4KZR20V55"
};


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
        onAuthStateChanged(value) {
            console.log('[firebase] onAuthStateChanged');

            let old_user = this.user;
            this.user = value;

            if (value) {
                console.log('使用者已登入');
                console.log(value);
                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;

                this.user_token = value.refreshToken;
                this.user_img = value.photoURL;

                this.providerData = value.providerData;
                this.providerData.forEach(profile => {

                });

                // var isAnonymous = user.isAnonymous;
                // var uid = user.uid;
                // var providerData = user.providerData;
                // ...
            } else {
                console.log('使用者已登出');
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

            firebase.auth().createUserWithEmailAndPassword(vm.user_email, vm.user_password)
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

            let firebaseAuth = firebase.auth();

            console.log('[firebase] signInWithEmailAndPassword');

            let vm = this;
            // firebase.auth().signInWithEmailAndPassword(vm.user_email, vm.user_password)
            //     .catch(error => {
            //         vm.onLoginFail(0, error);
            //     });;

            var user = firebase.auth().currentUser;
            console.log(user);

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
        googleSignIn(isPopup = true) {

            let firebaseAuth = firebase.auth();

            firebaseAuth.languageCode = 'zh_TW';

            console.log('[firebase] 以 Google 登入 ' + isPopup ? '(popup)' : '(Redirect)');
            console.log(firebaseAuth.languageCode);

            let vm = this;

            if (isPopup) {
                firebaseAuth.signInWithPopup(vm.providerG)
                    .then(result => {
                        vm.onLogin(1, result);
                    })
                    .catch(error => {
                        vm.onLoginFail(1, error);
                    });
            } else {

            }
        },
        facebookSignIn(isPopup = true) {

            let firebaseAuth = firebase.auth();
            firebaseAuth.languageCode = 'zh_TW';

            console.log('[firebase] 以 Facebook 登入 ' + isPopup ? '(popup)' : '(Redirect)');
            console.log(firebaseAuth.languageCode);

            let vm = this;

            if (isPopup) {
                firebaseAuth.signInWithPopup(vm.providerF)
                    .then(result => {
                        vm.onLogin(2, result);
                    })
                    .catch(error => {
                        vm.onLoginFail(2, error);
                    });
            } else {
                firebaseAuth.signInWithRedirect(vm.providerF);
                firebaseAuth.getRedirectResult(vm.providerF)
                    .then(result => {
                        vm.onLogin(2, result);
                    })
                    .catch(error => {
                        vm.onLoginFail(2, error);
                    });
            }
        },
        onLogin(type, result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            this.user_name = result.user;
            this.user_token = result.credential.accessToken;

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
        },
        onLoginFail: function(type, error) {
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