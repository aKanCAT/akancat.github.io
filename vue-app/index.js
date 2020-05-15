const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const capi_url = 'https://tw.rter.info/capi.php';



const URL = 'http://tw.rter.info/json.php?t=currency&q=check&iso=JPY';

var obj = {
    app: null,
    foo: 'bar',
    url: URL,

    token: '',
    user: '',

    email: '',
    password: '',

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

    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        this.providerG = new firebase.auth.GoogleAuthProvider();

        this.providerF = new firebase.auth.FacebookAuthProvider();
        this.providerF.addScope('user_birthday');

        // console.log(firebase);
        // console.log(firebase.auth);

        // firebase.analytics();

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
        console.log('beforeMount');
    },
    mounted() {
        console.log('mouted');
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
    computed: {


    },
    methods: {
        signOut: function() {
            firebase.auth().signOut()
                .then(function() {
                    console.log('登出成功');
                    // Sign-out successful.
                    this.token = '';
                    this.user = '';
                })
                .catch(function(error) {
                    // An error happened.
                    console.log('登出失敗');
                    console.log(error);
                });
        },
        emailSignup: function() {
            console.log('emailSignup');
            let email = this.email;
            let password = this.password;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .catch(function(error) {
                    console.log('以 email 註冊失敗');
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                });;
        },
        emailLogin: function() {
            console.log('emailLogin');
            let email = this.email;
            let password = this.password;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                    console.log('以 email 登入失敗');
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                });;
        },
        googleSingUp: function() {
            console.log('以 Google 登入 (Start)');

            firebase.auth().signInWithPopup(this.providerG)
                .then(function(result) {
                    console.log('以 Google 登入 (end)');
                    this.token = result.credential.accessToken;
                    this.user = result.user;
                    console.log(user);
                })
        },
        facebookSingUp1: function() {
            console.log('以 Facebook 登入 (Redirect)');

            //let firebaseAuth = firebase.auth();
            //firebaseAuth.languageCode = 'zh_TW';

            firebase.auth().signInWithRedirect(this.providerF);
            firebase.auth().getRedirectResult()
                .then(function(result) {
                    console.log('以 Facebook 登入 (Redirect end)');

                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    this.token = result.credential.accessToken;
                    this.user = result.user;

                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    console.log(errorCode);

                    var errorMessage = error.message;
                    console.log(errorMessage);

                    // The email of the user's account used.
                    var email = error.email;
                    console.log(email);

                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    console.log(credential);

                    // ...
                    console.log('以 Facebook 登入 (失敗)');
                });

        },
        facebookSingUp: function() {
            console.log('以 Facebook 登入 (Popup)');

            //let firebaseAuth = firebase.auth();
            // firebaseAuth.languageCode = 'zh_TW';

            firebase.auth().signInWithPopup(this.providerF)
                .then(function(result) {
                    console.log('以 Facebook 登入成功');

                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    this.token = result.credential.accessToken;
                    this.user = result.user;

                }).catch(function(error) {
                    console.log('以 Facebook 登入失敗');

                    // Handle Errors here.
                    var errorCode = error.code;
                    console.log(errorCode);

                    var errorMessage = error.message;
                    console.log(errorMessage);

                    // The email of the user's account used.
                    var email = error.email;
                    console.log(email);

                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    console.log(credential);
                });
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