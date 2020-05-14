const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
const capi_url = 'https://tw.rter.info/capi.php';



const URL = 'http://tw.rter.info/json.php?t=currency&q=check&iso=JPY';

var obj = {
    app: null,
    foo: 'bar',
    url: URL,
    fetchMsg: '',
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
        fb_click1: function() {
            console.log('以 Google 登入 (Start)');

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(function(result) {
                    console.log('以 Google 登入 (end)');
                    console.log(result.credential.accessToken);
                    console.log(result.user);
                    // var token = result.credential.accessToken;
                    // var user = result.user;
                })
        },
        fb_click2: function() {
            console.log('以 Facebook 登入 (Start)');

            let provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(function(result) {
                    console.log('以 Facebook 登入 (end)');
                    console.log(result.credential.accessToken);
                    console.log(result.user);
                    // var token = result.credential.accessToken;
                    // var user = result.user;
                })
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